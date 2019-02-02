const express = require('express');
const Controller = require('../controllers/backend-controller');

class Router {
  constructor() {
    this.router = express.Router();
  }

  init() {
    const controller = new Controller();
    this.router.post('/send', controller.sendSms);
    this.router.get('*', (req, res) => {
      res.sendFile('../../frontend/build/index.html');
    });
  }

  get() {
    return this.router;
  }
}

module.exports = Router;
