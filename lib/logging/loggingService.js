import { createLogger, format, transports } from 'winston';

/** Class representing a logger */
export class LoggingService {
  // The logger that will be utilized for logging
  logger = null;

  constructor() {
    // An instance for winston
    this.logger = createLogger({
      level: process.env.LOGGING_LEVEL ? process.env.LOGGING_LEVEL : 'info',
      format: format.combine(format.splat(), format.simple()),
      transports: [new transports.Console()]
    });
  }

  /**
   * This method will log a message depending upon the level specified
   * @param {string} level - The level of the log
   * @param {string} message - The message to be logged
   * @param {...string} optionalParams - Objects with which to replace substitution strings within message.
   */
  log = (level, message, ...optionalParams) => {
    this.logger[level](message, optionalParams);
  };

  /**
   * This method will log a message with 'error' level
   * @param {string} message - The message to be logged
   * @param {object}optionalParams - Objects with which to replace substitution strings within message.
   */
  error = (message, ...optionalParams) => {
    this.logger.error(message, ...optionalParams);
  };

  /**
   * This method will log a message with 'info' level
   * @param {string} message - The message to be logged
   * @param {object}optionalParams - Objects with which to replace substitution strings within message.
   */
  info = (message, ...optionalParams) => {
    this.logger.info(message, ...optionalParams);
  };

  /**
   * This method will log a message with 'warn' level
   * @param {string} message - The message to be logged
   * @param {object}optionalParams - Objects with which to replace substitution strings within message.
   */
  warn = (message, ...optionalParams) => {
    this.logger.warn(message, ...optionalParams);
  };

  /**
   * This method will log a message with 'debug' level
   * @param {string} message - The message to be logged
   * @param {object}optionalParams - Objects with which to replace substitution strings within message.
   */
  debug = (message, ...optionalParams) => {
    this.logger.debug(message, ...optionalParams);
  };
}

export default new LoggingService();
