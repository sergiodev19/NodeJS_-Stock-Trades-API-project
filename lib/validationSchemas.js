const { checkSchema } = require('express-validator');
const { tradeTypes } = require('./constants');
const { tradeSchemaObject } = require('../models/trades');

const location = ['body'];

const tradeValidationSchema = {
  type: {
    in: location,
    isIn: {
      options: [tradeTypes],
      errorMessage: 'Wrong type of trade',
    },
  },
  user_id: {
    in: location,
    isInt: {
      errorMessage: 'User ID must be an integer',
    },
  },
  symbol: {
    in: location,
    isString: {
      errorMessage: 'Symbol must be a string',
    },
  },
  shares: {
    in: location,
    isInt: {
      options: { min: tradeSchemaObject.shares.min, max: tradeSchemaObject.shares.max },
      errorMessage: `Shares must be an integer between ${tradeSchemaObject.shares.min} and ${tradeSchemaObject.shares.max}`,
    },
  },
  price: {
    in: location,
    isInt: {
      errorMessage: 'Price must be an integer',
    },
  },
  timestamp: {
    in: location,
    isInt: {
      errorMessage: 'Timestamp must be an integer',
    },
  },
};

module.exports = {
  tradeValidationSchema
};