const { validationResult } = require("express-validator");
const { ValidationError } = require("../lib/errors");

const validationMiddleware = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new ValidationError(result.array()[0].msg);
  }

  next();
};

module.exports = {
  validationMiddleware
}