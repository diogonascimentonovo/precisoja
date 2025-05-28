@echo off
setlocal
cd /d "%~dp0"

echo === INICIANDO BACKEND ===

rem Ativa ou cria venv local
if exist "%~dp0venv\Scripts\activate.bat" (
    call "%~dp0venv\Scripts\activate.bat"
) else (
    python -m venv "%~dp0venv"
    call "%~dp0venv\Scripts\activate.bat"
)

rem Instala dependencias
pip install -r "%~dp0requirements.txt" || exit /b 1

rem Inicia Uvicorn
uvicorn app.main:app --reload || exit /b 1

endlocal