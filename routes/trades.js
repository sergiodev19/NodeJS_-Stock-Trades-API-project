const express = require('express');
const { query, param, checkSchema } = require('express-validator');
const tradesController = require('../controllers/trades');
const { APIError } = require('../lib/errors');
const { tradeValidationSchema } = require('../lib/validationSchemas');
const { validationMiddleware } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  checkSchema(tradeValidationSchema),
  validationMiddleware,
  tradesController.create
);

router.get(
  '/',
  [
    query('type').optional().trim().isString().withMessage('Wrong type of trade'),
    query('user_id').optional().trim().isInt().withMessage('User ID must be an integer')
  ],
  validationMiddleware,
  tradesController.getAll
);

router.get(
  '/:id',
  param('id').trim().isInt().withMessage('ID must be an integer'),
  validationMiddleware,
  tradesController.getById
);

router.put('/:id', () => {
  throw new APIError('API does not allow modifying trades for any id value');
});

router.patch('/:id', () => {
  throw new APIError('API does not allow modifying trades for any id value');
});

router.delete('/:id', () => {
  throw new APIError('API does not allow deleting trades for any id value');
});

module.exports = router;
