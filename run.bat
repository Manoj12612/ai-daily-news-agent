@echo off
echo Starting Ollama...
start "" "C:\Users\manoj\AppData\Local\Programs\Ollama\ollama.exe" serve

echo Waiting for Ollama to load...
timeout /t 5 /nobreak

echo Running News Agent...
cd E:\News-Agent\news-agent
node index.js

echo Done!