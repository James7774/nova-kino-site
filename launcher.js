const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const frontendDir = path.join(__dirname, 'frontend');
const backendDir = path.join(__dirname, 'backend');

const logFile = path.join(__dirname, 'server.log');
const out = fs.openSync(logFile, 'a');
const err = fs.openSync(logFile, 'a');

console.log('Starting backend...');
const backend = spawn('node', ['index.js'], {
  cwd: backendDir,
  detached: true,
  stdio: [ 'ignore', out, err ],
  shell: true
});
backend.unref();

console.log('Starting frontend...');
const frontend = spawn('node', [path.join(frontendDir, 'node_modules/vite/bin/vite.js'), '--host', '0.0.0.0', '--port', '5173'], {
  cwd: frontendDir,
  detached: true,
  stdio: [ 'ignore', out, err ],
  shell: true
});
frontend.unref();

console.log('Servers started in background. Check server.log for details.');
process.exit(0);
