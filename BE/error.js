import Http from './common/enums/http.js';
import { ERROR_CODE } from './common/enums/errorCode.js';

const ErrorList = {
  [ERROR_CODE.INVALID_REQUEST]: {
    statusCode: Http.StatusCode.BAD_REQUEST,
    message: 'Invalid request'
  },
  [ERROR_CODE.INCORRECT_FIELD]: {
    statusCode: Http.StatusCode.BAD_REQUEST,
    message: 'Incorrect field value, data type or length'
  },
  [ERROR_CODE.UNAUTHORIZED]: {
    statusCode: Http.StatusCode.UNAUTHORIZED,
    message: 'Unauthorized access'
  },
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    statusCode: Http.StatusCode.INTERNAL_SERVER_ERROR,
    message: 'Internal server error'
  },
  [ERROR_CODE.NOT_FOUND]: {
    statusCode: Http.StatusCode.NOT_FOUND,
    message: 'Not found'
  },
  [ERROR_CODE.FORBIDDEN]: {
    statusCode: Http.StatusCode.FORBIDDEN,
    message: 'Forbidden'
  },
  [ERROR_CODE.CONFLICT]: {
    statusCode: Http.StatusCode.CONFLICT,
    message: 'Conflict with the current state of the resource'
  },
  [ERROR_CODE.INVALID_EVENT]: {
    statusCode: Http.StatusCode.BAD_REQUEST,
    message: 'Invalid event'
  }
};

export { ErrorList };
