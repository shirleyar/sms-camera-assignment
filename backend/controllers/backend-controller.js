const assert = require('assert');
const httpStatusCodes = require('http-status-codes');
const manager = require('../managers/backend-manager');
const logger = require('../utils/logger');
const {requestIdHdr, sentSuccessfullyCode, sentSuccessfullyMsg} = require('../utils/constants');
const Response = require('../models/response');
const ErrorResponse = require('../models/errorResponse');

class Controller {
  async sendSms(req, res) {
    logger.info(`received POST request to ${req.originalUrl} from ${req.ip}`);
    const {toNumber} = req.body;
    const reqId = req.headers[requestIdHdr];
    return manager.sendSms(toNumber, reqId)
      .then(() => {
        logger.info({request_id: reqId}, `Sent sms successfully to number: ${toNumber}`);
        const response = new Response(
          toNumber,
          sentSuccessfullyCode,
          sentSuccessfullyMsg,
        );
        logger.debug({request_id: reqId}, `Returned response ${httpStatusCodes.CREATED} body: ${JSON.stringify(response)}`);
        res.status(httpStatusCodes.CREATED).json(response);
      }).catch((error) => {
        logger.info({request_id: reqId}, `Sms to number failed. reason: ${error.message}`);
        const response = new ErrorResponse(error, reqId);
        const statusCode = error instanceof assert.AssertionError
          ? httpStatusCodes.BAD_REQUEST
          : httpStatusCodes.INTERNAL_SERVER_ERROR;
        logger.debug({request_id: reqId}, `Returned response ${statusCode} body: ${JSON.stringify(response)}`);
        res.status(statusCode).json(response);
      });
  }
}

module.exports = Controller;
