const express = require('express');
const server = express();
const projectRouter = require('./data/projectRouter.js');

server.use(express.json());
server.use('/api/project', projectRouter);

server.get('/', (request, response) => {
    response.send(`
        <h2>Lambda Node Api Sprint Challenge</h2>
    `);
});

module.exports = server;