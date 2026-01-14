@echo off
echo ==========================================
echo    Configurando y Actualizando Decision Log
echo ==========================================
echo.

WHERE git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  echo Error: GIT no esta instalado o no esta en el PATH.
  echo Por favor instala Git desde https://git-scm.com/
  pause
  exit /b
)

:: 0. Limpiar bloqueos anteriores
IF EXIST ".git\index.lock" del ".git\index.lock"

:: 1. Inicializar si no existe
IF NOT EXIST ".git" (
  echo Inicializando repositorio nuevo...
  git init
  git branch -M main
  echo Conectando con GitHub...
  git remote add origin https://github.com/Akykes25/decision-log.git
) ELSE (
  echo Repositorio detectado. Verificando conexion...
  git remote set-url origin https://github.com/Akykes25/decision-log.git 2>nul
  IF %ERRORLEVEL% NEQ 0 (
    git remote add origin https://github.com/Akykes25/decision-log.git
  )
)

:: 1.5 Configurar identidad
git config user.name >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  git config user.name "Portfolio User"
  git config user.email "portfolio@local.dev"
)

echo.
echo 2. Preparando archivos...
git add .
echo.

echo 3. Guardando cambios locales...
git commit -m "Deploy: Subida automatica correcciones"
echo.

echo 4. Subiendo a GitHub (Forzando actualizacion)...
:: Usamos --force para sobrescribir cualquier conflicto en el servidor
git push -u origin main --force
echo.

IF %ERRORLEVEL% EQU 0 (
  echo ==========================================
  echo    EXITO! Todo listo.
  echo    Recarga tu pagina de GitHub en 1 minuto.
  echo ==========================================
) ELSE (
  echo ==========================================
  echo    ERROR: Algo fallo al subir.
  echo    Asegurate de completar el login en el navegador si te lo pide.
  echo ==========================================
)

pause
