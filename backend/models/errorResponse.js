const assert = require('assert');
const httpStatusCodes = require('http-status-codes');
const _ = require('lodash');
const {generalInternalError,badRequestErrorDesc, generalErrorDesc, badRequestErrorMsg, generalErrorMsg } = require('../utils/constants');

class ErrorResponse {
  constructor(error, reqId) {
    this.requestId = reqId;
    this.code = ErrorResponse.calculateCode(error);
    this.message = ErrorResponse.calculateErrorMsg(error);
    this.description = ErrorResponse.calculateErrorDesc(error);
  }

  static calculateCode(error) {
    let code;
    if (error instanceof assert.AssertionError) {
      code = `${httpStatusCodes.BAD_REQUEST}0`;
    } else {
      const errorCode = _.get(error, 'messages[0].status', generalInternalError);
      code = `${httpStatusCodes.INTERNAL_SERVER_ERROR}${errorCode}`;
    }
    return code;
  }

  static calculateErrorDesc(error) {
    return error instanceof assert.AssertionError
      ? `${badRequestErrorDesc} | ${error.message}`
      : `${generalErrorDesc}`;
  }

  static calculateErrorMsg(error) {
    return error instanceof assert.AssertionError
      ? `${badRequestErrorMsg}`
      : `${generalErrorMsg}`;
  }
}

module.exports = ErrorResponse;
