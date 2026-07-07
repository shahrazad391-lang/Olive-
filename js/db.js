const DB = 'zarrai_db';
const VER = 1;

let db = null;

function open() {
  return new Promise((res, rej) => {
    if (db) return res(db);
    const r = indexedDB.open(DB, VER);
    r.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('history')) {
        d.createObjectStore('history', { keyPath: 'id' }).createIndex('date', 'date');
      }
    };
    r.onsuccess = (e) => { db = e.target.result; res(db); };
    r.onerror = (e) => rej(e.target.error);
  });
}

export async function saveHistory(entry) {
  const d = await open();
  return new Promise((res, rej) => {
    const r = d.transaction('history', 'readwrite').objectStore('history').put(entry);
    r.onsuccess = () => res(); r.onerror = () => rej(r.error);
  });
}

export async function getHistory() {
  const d = await open();
  return new Promise((res, rej) => {
    const r = d.transaction('history', 'readonly').objectStore('history').getAll();
    r.onsuccess = () => res(r.result.sort((a, b) => new Date(b.date) - new Date(a.date)));
    r.onerror = () => rej(r.error);
  });
}

export function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}