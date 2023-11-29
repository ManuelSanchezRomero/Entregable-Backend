import winston from 'winston';

const logLevels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
  ],
});

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  logger.clear();
  logger.add(new winston.transports.File({ filename: 'errors.log', level: 'error' }));
}

export default logger;
