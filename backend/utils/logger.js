const bunyan = require('bunyan');
const {appName, logLevel} = require('./constants');

const logger = bunyan.createLogger(
  {
    name: appName,
    src: true,
    level: logLevel,
    serializers: {
      error: bunyan.stdSerializers.err,
      response: bunyan.stdSerializers.res,
    },
  },
);

logger.fields = {time: 0, level: 1, msg: 2};

module.exports = logger;
