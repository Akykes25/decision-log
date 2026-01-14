@echo off
echo Iniciando Decision Log...
echo.
echo Para usar esta aplicacion, necesitamos un servidor local porque usamos Modulos Modernos de JavaScript.
echo (Los navegadores bloquean "file://" por seguridad)
echo.

WHERE python >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  echo Error: Python no esta instalado o no esta en el PATH.
  echo Por favor instala Python o usa "npx serve" si tienes Node.js
  pause
  exit /b
)

echo Iniciando servidor en http://localhost:8000 ...
echo Puedes cerrar esta ventana cuando termines.
echo.
start http://localhost:8000
python -m http.server 8000
pause
