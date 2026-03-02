const http = require('http');
const fs = require('fs');
const path = require('path');

const log = (msg) => {
  fs.appendFileSync('c:/Users/user/OneDrive/Desktop/Nova_kino site/static_server.log', `${new Date().toISOString()} - ${msg}\n`);
};

const distPath = 'c:/Users/user/OneDrive/Desktop/Nova_kino site/frontend/dist';

http.createServer((req, res) => {
  let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distPath, 'index.html');
  }

  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
}).listen(5174, '0.0.0.0', () => {
  log('Native HTTP server running on port 5174');
});
