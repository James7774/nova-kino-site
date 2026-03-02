@echo off
start /B node backend/index.js
cd frontend
node node_modules/vite/bin/vite.js --port 8080 --host 127.0.0.1
