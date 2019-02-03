const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const path = require('path');
const {baseUrl, version} = require('../utils/constants');
const Router = require('../routers/backend-router');
const logger = require('../utils/logger');

class Server {
  constructor() {
    this.server = express();
  }

  init() {
    const backendRouter = new Router();
    backendRouter.init();
    this.server.use(cors());
    this.server.use(json());
    const url = `${baseUrl}/${version}`;
    this.server.use(url, backendRouter.get());
    this.serveFrontEnd();
  }

  get() {
    return this.server;
  }

  serveFrontEnd() {
    this.server.use(express.static(path.join('../frontend/', 'build')));
    this.server.get('/*', (req, res) => {
      logger.debug(`received GET request to ${req.originalUrl} from ${req.ip}`);
      res.sendFile(path.resolve('../frontend/build/index.html'));
    });
  }

  start(port) {
    this.server.listen(port, () => {
      logger.info(`Server is listening on port ${port}. base url: ${baseUrl}`);
    }).on('error', (err) => {
      logger.error(`Server could NOT start on port ${port}. error: ${err.message}`);
      throw err;
    });
  }
}

module.exports = Server;
