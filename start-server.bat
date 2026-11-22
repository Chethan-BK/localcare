@echo off
title Justdial LocalCare - Fullstack Enterprise Platform
cls
echo =====================================================================
echo    JUSTDIAL LOCALCARE - INDIA'S NO. 1 LOCAL DISCOVERY PLATFORM
echo    Full-Stack Architecture: Express/HTTP REST API + Real Database
echo =====================================================================
echo.
echo [1/3] Checking Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [2/3] Launching Justdial LocalCare Web Application...
start http://localhost:3000

echo [3/3] Starting Backend Server on port 3000...
echo Server running at http://localhost:3000
echo Press Ctrl+C to stop the server anytime.
echo.
node server.js
pause
