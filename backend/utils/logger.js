const bunyan = require('bunyan');
const constants = require('./constants');

const logger = bunyan.createLogger(
  {
    name: constants.appName,
    src: true,
    level: constants.logLevel,
    serializers: {
      error: bunyan.stdSerializers.err,
      response: bunyan.stdSerializers.res,
    },
  },
);

logger.fields = { time: 0, level: 1, msg: 2 };

module.exports = logger;
