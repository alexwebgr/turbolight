#!/bin/bash

# Create a temporary test directory
mkdir -p /tmp/turbolight_test
cd /tmp/turbolight_test

# Initialize a new npm project
npm init -y

# Link to the local turbolight package
npm link /var/www/turbolight

# Create a test HTML file
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TurboLight Local Test</title>
  <style>
    /* Include basic styles from turbolight.css */
    .turbo-light-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .turbo-light-active {
      display: flex;
    }
    /* Add more styles as needed */
  </style>
</head>
<body>
  <h1>TurboLight Local Test</h1>

  <div>
    <a href="https://source.unsplash.com/random/1200x800?nature" data-turbolight="test-gallery" data-title="Test Image 1">
      Test Image 1
    </a>
    <br>
    <a href="https://source.unsplash.com/random/1200x800?city" data-turbolight="test-gallery" data-title="Test Image 2">
      Test Image 2
    </a>
  </div>

  <script type="module">
    import TurboLight from 'turbolight';

    document.addEventListener('DOMContentLoaded', () => {
      console.log('Initializing TurboLight...');
      const lightbox = new TurboLight();
      console.log('TurboLight initialized:', lightbox);
    });
  </script>
</body>
</html>
EOL

# Create a simple server to serve the test page
cat > server.js << 'EOL'
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3456;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
EOL

# Make the script executable
chmod +x server.js

echo "Test environment set up at /tmp/turbolight_test"
echo "Run 'node server.js' to start the test server"
echo "Then open http://localhost:3456 in your browser"
