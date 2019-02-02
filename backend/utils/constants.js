module.exports = {
  // general constants
  appName: 'sms-camera-assignment',
  logLevel: process.env.LOG_LEVEL || 'info',
  baseUrl: process.env.BASE_URL || '/smsServer/api',
  version: process.env.VERSION || 'v1',
  port: parseInt(process.env.PORT, this.decimalRadix) || 3001,
  smsKey: process.env.SMS_KEY || '562a5035', // todo: handle secrets
  smsSecret: process.env.SMS_SECRET || '9Z5y44FVvgbCYSCC', // todo: handle secrets
  requestIdHdr: 'x-request-id',
  decimalRadix: 10,
  sentUrl: 'hello from node', // todo: add link to be sent to user
  nexmoSuccess: '0',
  sentSuccessfullyCode: 0,
  sentSuccessfullyMsg: 'success',
  generalInternalError: 0,
  generalErrorMsg: 'Internal server error',
  generalErrorDesc: 'Check logs and error code ',
  badRequestErrorMsg: 'Bad request',
  badRequestErrorDesc: 'One or more invalid parameters',
  // graceful shutdown constants
  unhandledRejectionCode: -1,
  unhandledExceptionCode: -2,
  killSignal: 128,
};
