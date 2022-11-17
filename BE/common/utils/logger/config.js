import { format, transports } from 'winston';

const loggerConfig = {
  level: 'info',
  handleExceptions: true,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
  exitOnError: false
};

export default loggerConfig;
