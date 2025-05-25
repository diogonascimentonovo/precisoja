@echo off
echo ========= INICIANDO BACKEND =========
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
start cmd /k "uvicorn main:app --reload"

echo ========= INICIANDO FRONTEND =========
cd frontend
call npm install
call npm run dev

pause
