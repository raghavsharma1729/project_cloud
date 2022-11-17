import { ErrorList } from '../../../error.js';

export class AppError extends Error {
  errorCode;
  errors;

  constructor(errorCode, errors) {
    super(errorCode);
    this.errorCode = errorCode;
    this.name = AppError.name;
    this.errors = errors;
  }

  getErrors() {
    const error = ErrorList[this.errorCode];
    return {
      errors: this.errors,
      statusCode: error.statusCode,
      message: error.message
    };
  }
}
