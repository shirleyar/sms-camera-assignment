const Nexmo = require('nexmo');
const {smsKey, smsSecret, nexmoSuccess, decimalRadix} = require('./constants');
const logger = require('./logger');

const from = 'HomeAssignment';

class SmsSender {
  constructor() {
    this.nexmo = new Nexmo({
      apiKey: smsKey,
      apiSecret: smsSecret,
    }, {
      debug: true,
      logger,
    });
  }

  send(toNumber, message, reqId) {
    return new Promise((resolve, reject) => {
      this.nexmo.message.sendSms(from, toNumber, message, (error, response) => {
        if (error) {
          logger.error({ request_id: reqId, error }, `Failed sending the sms to number ${toNumber}`);
          reject(error);
        }
        if (response.messages[0].status === nexmoSuccess) {
          logger.debug({ request_id: reqId }, `sent sms to number ${toNumber} successfully`);
          resolve();
        } else {
          logger.error({ request_id: reqId, error: response }, `sms to number ${toNumber} failed: ${response.messages[0]['error-text']}`);
          reject(new Error(response.messages[0]['error-text']));
        }
      });
    });
  }


  validateNumber(number, reqId) {
    return new Promise((resolve, reject) => {
      this.nexmo.numberInsight.get({ level: 'basic', number }, (error, result) => {
        if (error) {
          logger.error({ request_id: reqId, error }, `Failed validating the number ${number}`);
          reject(error);
        }
        const isValid = result.status === parseInt(nexmoSuccess, decimalRadix);
        logger.debug({ request_id: reqId }, `validation result for number ${number}: ${isValid}`);
        resolve(isValid);
      });
    });
  }
}

module.exports = new SmsSender();
