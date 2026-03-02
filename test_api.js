const http = require('http');

const post = (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const body = JSON.stringify(data);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(resData));
        } else {
          reject(new Error(`Status ${res.statusCode}: ${resData}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

const test = async () => {
  try {
    const loginRes = await post('http://localhost:5000/api/users/login', {
      username: 'admin',
      password: 'admin123'
    });
    console.log('Login OK');

    await post('http://localhost:5000/api/movies', {
      title: 'Test', description: 'Test', poster: 'https://test',
      videoUrl: 'https://test', year: 2024, genres: ['Test']
    }, { Authorization: `Bearer ${loginRes.token}` });
    console.log('Add movie OK');
  } catch (err) {
    console.error('Test FAILED:', err.message);
  }
};

test();
