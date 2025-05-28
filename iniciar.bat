@echo off
rem Arquivo: iniciar.bat
rem Uso: apenas digite "iniciar" na raiz do projeto para rodar o backend

rem Move para a pasta do backend
cd /d "%~dp0precisoja-back"

rem Chama o script existente para startar o backend
call start_backend.bat

rem Retorna ao diretório inicial (opcional)
cd /d "%~dp0"
