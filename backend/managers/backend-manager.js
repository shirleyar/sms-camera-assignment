const assert = require('assert');
const validator = require('validator');
const _ = require('lodash');
const logger = require('../utils/logger');
const smsSender = require('../utils/smsSender');
const constants = require('../utils/constants');

class Manager {
  async sendSms(number, reqId) {
    const message = constants.sentUrl;
    try {
      assert(await smsSender.validateNumber(number, reqId), 'phone number is invalid');
      assert(_.isString(reqId) && validator.isUUID(reqId), `Invalid request id: ${reqId}`);
      await smsSender.send(number, message, reqId);
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        logger.error({ request_id: reqId }, error.message);
      } else {
        logger.error({ request_id: reqId }, `Failed sending sms to number ${number}. reason: ${error.message}`);
      }
      return Promise.reject(error);
    }
  }
}

module.exports = new Manager();
