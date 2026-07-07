@echo off
title Zarrai - Plant AI App
cd /d "%~dp0"

echo.
echo  ========================================
echo    Zarrai - زراعي
echo    AbdAllah Alzoubi ^& Hassn Alzoubi
echo  ========================================
echo.

if "%GEMINI_API_KEY%"=="" (
  echo  [WARNING] GEMINI_API_KEY not set in environment!
  echo  AI will use local fallback until you set it:
  echo    setx GEMINI_API_KEY "your_key_here"
  echo  Then open a NEW terminal and run START.bat again.
  echo.
) else (
  echo  [OK] GEMINI_API_KEY loaded from environment
  echo.
)

echo  Starting secure server at http://127.0.0.1:8790
start "" "http://127.0.0.1:8790"
python server\app.py
pause