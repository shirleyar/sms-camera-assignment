const assert = require('assert');
const {isUUID} = require('validator');
const _ = require('lodash');
const logger = require('../utils/logger');
const smsSender = require('../utils/smsSender');
const {sentUrl} = require('../utils/constants');

class Manager {
  async sendSms(number, reqId) {
    try {
      assert(await smsSender.validateNumber(number, reqId), 'phone number is invalid');
      assert(_.isString(reqId) && isUUID(reqId), `Invalid request id: ${reqId}`);
      await smsSender.send(number, sentUrl, reqId);
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        logger.error({request_id: reqId}, error.message);
      } else {
        logger.error({request_id: reqId}, `Failed sending sms to number ${number}. reason: ${error.message}`);
      }
      return Promise.reject(error);
    }
  }
}

module.exports = new Manager();
