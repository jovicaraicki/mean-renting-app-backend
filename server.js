const http = require('http');
const app = require('./app');

// const port = process.env.port || 5000;
//AWS
const port = process.env.port || 8081;

// const requestHandler = (request, response) => {
//   response.end('Hello Node!!!');
// }

// const server = http.createServer(requestHandler);

const server = http.createServer(app);

server.listen(port);
