const Server = require('./server/backend-server');
const { port, gracefulShutdownSec , unhandledExceptionCode, unhandledRejectionCode, killSignal} = require('./utils/constants');


const server = new Server();
server.init();
server.start(port);

process.on('uncaughtException', error => {
  logger.fatal({err: error}, 'Error has occurred (uncaughtException). App will exit now');
  gracefulShutdown(unhandledExceptionCode);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({promise}, 'Error has occurred (unhandledRejection). App will exit now');
  gracefulShutdown(unhandledRejectionCode);
});

['SIGHUP', 'SIGTERM','SIGINT'].forEach(signal => {
  process.on(signal, () => {
    logger.fatal(`Received signal ${signal}. App will exit now`);
    gracefulShutdown(killSignal);
  });
});

function gracefulShutdown(code) {
  logger.info(`App is about to exit with code ${code}. Starting shutdown.`);
  logger.info(`App will exit in ${gracefulShutdownSec} seconds (graceful shutdown`);
  setTimeout(() => {
    logger.info('Bye bye');
    process.exit(code);
  }, gracefulShutdownSec * 1000);
}

