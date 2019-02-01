require('dotenv').config();
const Server = require('./server/backend-server');
const { port } = require('./utils/constants');

const server = new Server();
server.init();
server.start(port);

// todo: add graceful shutdown
