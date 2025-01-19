const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.js': 'text/javascript'
};

const server = http.createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'public', filePath);
    
    const ext = path.extname(filePath);
    const contentType = contentTypes[ext] || 'text/plain';
    
    const content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(500);
      res.end('500 Internal Server Error');
      console.error(err);
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});