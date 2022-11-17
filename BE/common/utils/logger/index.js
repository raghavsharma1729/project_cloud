import { createLogger } from 'winston';
import loggerConfig from './config.js';

const logger = createLogger(loggerConfig);

export default logger;
