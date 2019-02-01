const assert = require('assert');
const httpStatusCodes = require('http-status-codes');
const _ = require('lodash');
const constants = require('../utils/constants');

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
      const errorCode = _.get(error, 'messages[0].status', constants.generalInternalError);
      code = `${httpStatusCodes.INTERNAL_SERVER_ERROR}${errorCode}`;
    }
    return code;
  }

  static calculateErrorDesc(error) {
    return error instanceof assert.AssertionError
      ? `${constants.badRequestErrorDesc} | ${error.message}`
      : `${constants.generalErrorDesc}`;
  }

  static calculateErrorMsg(error) {
    return error instanceof assert.AssertionError
      ? `${constants.badRequestErrorMsg}`
      : `${constants.generalErrorMsg}`;
  }
}

module.exports = ErrorResponse;
