@echo off
title SkillBarter Campus - Full-Stack Time-Banking Platform
color 0B
echo =========================================================================
echo       SkillBarter Campus - Student Skill Barter & Time-Bank Platform
echo =========================================================================
echo.
echo Starting local web server on port 3000...
echo.

start "" http://localhost:3000

if exist "%SystemRoot%\py.exe" (
    py server.py
) else (
    python server.py
)

pause
