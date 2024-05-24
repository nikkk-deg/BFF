"use strict";
const http = require('http');
const server = http.createServer().listen(3000);
server.on('request', (req, res) => {
    if (req.url === '/') {
        return res.end('server is running');
    }
});
