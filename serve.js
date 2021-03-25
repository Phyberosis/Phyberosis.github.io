const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 12345;

const server = http.createServer((req, res) => {
  console.log(req.url);
  let ext, path = '.';
  if (req.url == '/') {
    ext = 'html'
    path += '/index.html'
  } else if (req.url.includes('.js')) {
    ext = 'javascript'
    path += req.url
  } else {
    ext = ''
    path += req.url
    //console.log('hey Tony, something tried to load a file thats not html or js, look in localServer.js');
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/' + ext);

  // console.log(path);
  fs.readFile(path, function (err, html) {
    if (err) {
      console.error(err);
      res.write('/index.html')
      res.end();
    } else {
      res.write(html);
      res.end(); 
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});