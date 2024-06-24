class BaseError extends Error {
  constructor(name, statusCode, message) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
      super('ValidationError', 400, message);
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
      super('NotFoundError', 404, message);
  }
}

class APIError extends BaseError {
  constructor(message) {
      super('APIError', 405, message);
  }
}

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  return res.status(statusCode || 500).send(message);
};

module.exports = {
  ValidationError,
  NotFoundError,
  APIError,
  errorHandler
};