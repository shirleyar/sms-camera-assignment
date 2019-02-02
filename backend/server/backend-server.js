const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
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
  }

  get() {
    return this.server;
  }

  start(port) {
    this.server.listen( process.env.PORT || 5000, () => {
      logger.info(`Server is listening on port ${port}. base url: ${constants.baseUrl}`);
    }).on('error', (err) => {
      logger.error(`Server could NOT start on port ${port}`);
      throw err;
    });
  }
}

module.exports = Server;
