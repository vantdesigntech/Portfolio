@echo off
title PORTFOLIO NUEVO - LE:MA 3D Hero Stack
cd /d "%~dp0"
echo Iniciando PORTFOLIO NUEVO (Build de Produccion 60fps) en http://127.0.0.1:5190 ...
node ".\node_modules\vite\bin\vite.js" preview --host 127.0.0.1 --port 5190 --open
pause
