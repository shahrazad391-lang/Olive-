"""
Zarrai Secure API Proxy (stdlib only — no pip install needed)
GEMINI_API_KEY read ONLY from environment variable — never exposed to client.
"""
import os
import re
import json
import logging
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib import request as urlrequest
from urllib import parse as urlparse
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parent.parent
PORT = int(os.environ.get('PORT', 8790))
GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.0-flash')

logging.basicConfig(level=logging.INFO)
log = logging.getLogger('zarrai')


def get_api_key():
    return os.environ.get('GEMINI_API_KEY', '').strip() or None


def strip_data_url(data_url):
    if not data_url:
        return None, None
    m = re.match(r'data:([^;]+);base64,(.+)', data_url, re.DOTALL)
    if m:
        return m.group(1), m.group(2)
    return 'image/jpeg', data_url


def http_json(method, url, data=None, headers=None, timeout=60):
    body = json.dumps(data).encode() if data is not None else None
    hdrs = {'Content-Type': 'application/json', **(headers or {})}
    req = urlrequest.Request(url, data=body, headers=hdrs, method=method)
    with urlrequest.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def call_gemini(parts):
    api_key = get_api_key()
    if not api_key:
        return None, 'GEMINI_API_KEY not configured on server'

    url = f'https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent'
    payload = {
        'contents': [{'parts': parts}],
        'generationConfig': {
            'temperature': 0.2,
            'maxOutputTokens': 4096,
            'responseMimeType': 'application/json',
        },
    }
    try:
        data = http_json('POST', url, payload, headers={'x-goog-api-key': api_key})
        text = data['candidates'][0]['content']['parts'][0]['text']
        return json.loads(text), None
    except HTTPError as e:
        log.error('Gemini HTTP %s', e.code)
        return None, f'Gemini API error ({e.code})'
    except (KeyError, IndexError, json.JSONDecodeError) as e:
        log.error('Gemini parse error: %s', e)
        return None, 'Invalid AI response'
    except URLError as e:
        log.error('Network error: %s', e)
        return None, 'AI service unreachable'


def image_part(data_url):
    mime, b64 = strip_data_url(data_url)
    return {'inline_data': {'mime_type': mime, 'data': b64}}


WEATHER_CODES = {
    0: {'ar': 'صافٍ', 'en': 'Clear sky', 'icon': '☀️'},
    1: {'ar': 'صافٍ غالباً', 'en': 'Mainly clear', 'icon': '🌤️'},
    2: {'ar': 'غائم جزئياً', 'en': 'Partly cloudy', 'icon': '⛅'},
    3: {'ar': 'غائم', 'en': 'Overcast', 'icon': '☁️'},
    45: {'ar': 'ضباب', 'en': 'Foggy', 'icon': '🌫️'},
    61: {'ar': 'مطر خفيف', 'en': 'Light rain', 'icon': '🌧️'},
    63: {'ar': 'مطر', 'en': 'Rain', 'icon': '🌧️'},
    65: {'ar': 'مطر غزير', 'en': 'Heavy rain', 'icon': '🌧️'},
    80: {'ar': 'زخات مطر', 'en': 'Rain showers', 'icon': '🌦️'},
    95: {'ar': 'عاصفة رعدية', 'en': 'Thunderstorm', 'icon': '⛈️'},
}


def weather_desc(code):
    return WEATHER_CODES.get(code, {'ar': 'غير معروف', 'en': 'Unknown', 'icon': '🌡️'})


def fetch_weather(params):
    lat = params.get('lat', [None])[0]
    lon = params.get('lon', [None])[0]
    city = params.get('city', ['Damascus'])[0]
    country = 'Syria'

    if lat is None or lon is None:
        geo = http_json('GET',
            'https://geocoding-api.open-meteo.com/v1/search?' +
            urlparse.urlencode({'name': city, 'count': 1, 'language': 'en'}), timeout=10)
        if not geo.get('results'):
            return None, 'city not found'
        loc = geo['results'][0]
        lat, lon = loc['latitude'], loc['longitude']
        city = loc.get('name', city)
        country = loc.get('country', 'Syria')

    wx = http_json('GET',
        'https://api.open-meteo.com/v1/forecast?' + urlparse.urlencode({
            'latitude': lat, 'longitude': lon,
            'current': 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
            'daily': 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
            'timezone': 'auto', 'forecast_days': 3,
        }), timeout=10)

    current = wx.get('current', {})
    daily = wx.get('daily', {})
    return {
        'city': city, 'country': country, 'lat': float(lat), 'lon': float(lon),
        'current': {
            'temp': current.get('temperature_2m'),
            'humidity': current.get('relative_humidity_2m'),
            'precipitation': current.get('precipitation'),
            'wind': current.get('wind_speed_10m'),
            'code': current.get('weather_code'),
            'description': weather_desc(current.get('weather_code')),
        },
        'forecast': [{
            'date': daily['time'][i],
            'max': daily['temperature_2m_max'][i],
            'min': daily['temperature_2m_min'][i],
            'rain': daily['precipitation_sum'][i],
            'code': daily['weather_code'][i],
            'description': weather_desc(daily['weather_code'][i]),
        } for i in range(min(3, len(daily.get('time', []))))],
        'source': 'open-meteo',
    }, None


class ZarraiHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        if '/api/' in (args[0] if args else ''):
            log.info(fmt, *args)

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.send_header('Access-Control-Allow-Origin', f'http://127.0.0.1:{PORT}')
        self.end_headers()
        self.wfile.write(body)

    def read_body(self):
        length = int(self.headers.get('Content-Length', 0))
        return json.loads(self.rfile.read(length).decode()) if length else {}

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', f'http://127.0.0.1:{PORT}')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/health'):
            self.send_json({'ok': True, 'gemini': get_api_key() is not None, 'model': GEMINI_MODEL})
            return
        if self.path.startswith('/api/weather'):
            params = urlparse.parse_qs(urlparse.urlparse(self.path).query)
            try:
                result, err = fetch_weather(params)
                if err:
                    self.send_json({'error': err}, 404 if err == 'city not found' else 503)
                else:
                    self.send_json(result)
            except (HTTPError, URLError, json.JSONDecodeError) as e:
                log.error('Weather error: %s', e)
                self.send_json({'error': 'weather service unreachable'}, 503)
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/identify':
            body = self.read_body()
            image = body.get('image')
            locale = body.get('locale', 'ar')
            if not image:
                self.send_json({'error': 'image required'}, 400)
                return
            lang = 'Arabic' if locale == 'ar' else 'English'
            prompt = f"""Expert botanist for Middle Eastern/Syrian plants. Analyze photo. JSON only:
{{"scientific":"","nameAr":"","nameEn":"","family":{{"ar":"","en":""}},"origin":{{"ar":"","en":""}},
"climate":{{"ar":"","en":""}},"watering":{{"ar":"","en":""}},"sunlight":{{"ar":"","en":""}},
"soil":{{"ar":"","en":""}},"uses":{{"ar":"","en":""}},"season":{{"ar":"","en":""}},
"syria":{{"ar":"","en":""}},"confidence":0-100,
"alternatives":[{{"nameAr":"","nameEn":"","confidence":0-80}}]}}
Language emphasis: {lang}."""
            result, err = call_gemini([{'text': prompt}, image_part(image)])
            if err:
                self.send_json({'error': err, 'fallback': True}, 503)
            else:
                self.send_json({'result': result, 'source': 'gemini'})
            return

        if self.path == '/api/diagnose':
            body = self.read_body()
            images = body.get('images', {})
            complaint = (body.get('complaint') or '').strip()
            locale = body.get('locale', 'ar')
            plant_name = body.get('plantName', '')
            if not complaint:
                self.send_json({'error': 'complaint required'}, 400)
                return
            if not any(images.values()):
                self.send_json({'error': 'at least one image required'}, 400)
                return
            lang = 'Arabic' if locale == 'ar' else 'English'
            prompt = f"""Plant pathologist for Syrian agriculture.
Plant: {plant_name or 'unknown'}. Complaint: {complaint}
JSON only: {{"disease":{{"ar":"","en":""}},"severity":"low|medium|high|critical","confidence":0-100,
"cause":{{"ar":"","en":""}},"symptoms":{{"ar":[],"en":[]}},
"visualFindings":{{"ar":[],"en":[]}},
"solution":{{"organic":{{"ar":"","en":""}},"chemical":{{"ar":"","en":""}}}},
"prevention":{{"ar":"","en":""}},
"alternatives":[{{"name":{{"ar":"","en":""}},"confidence":0-60}}]}}
Language: {lang}. Practical Syrian advice."""
            parts = [{'text': prompt}]
            for key, label in [('leaves', 'Leaves'), ('branches', 'Branches'), ('location', 'Location')]:
                if images.get(key):
                    parts.append({'text': f'[{label}]'})
                    parts.append(image_part(images[key]))
            result, err = call_gemini(parts)
            if err:
                self.send_json({'error': err, 'fallback': True}, 503)
            else:
                self.send_json({'result': result, 'source': 'gemini'})
            return

        self.send_json({'error': 'not found'}, 404)


if __name__ == '__main__':
    os.chdir(ROOT)
    if not get_api_key():
        log.warning('GEMINI_API_KEY not set — AI uses local fallback')
    else:
        log.info('Gemini proxy ready (key from environment only)')
    server = HTTPServer(('127.0.0.1', PORT), ZarraiHandler)
    log.info('Zarrai running at http://127.0.0.1:%s', PORT)
    server.serve_forever()