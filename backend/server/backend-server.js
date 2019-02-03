const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const path = require('path');
const constants = require('../utils/constants');
const Router = require('../routers/backend-router');
const logger = require('../utils/logger');

class Server {
  constructor() {
    this.server = express();
  }

  init() {
    const router = new Router();
    router.init();
    this.server.use(cors());
    this.server.use(json());
    const url = `${constants.baseUrl}/${constants.version}`;
    this.server.use(url, router.get());
    this.server.use(express.static('../../frontend/build'));
    this.server.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend', 'build'), 'index.html');
      res.end();
    });
  }

  get() {
    return this.server;
  }

  start(port) {
    this.server.listen(port, () => {
      logger.info(`Server is listening on port ${port}. base url: ${constants.baseUrl}`);
    }).on('error', (err) => {
      logger.error(`Server could NOT start on port ${port}. error: ${err.message}`);
      throw err;
    });
  }
}

module.exports = Server;
