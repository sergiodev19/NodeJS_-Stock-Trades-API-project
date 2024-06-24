const { NotFoundError } = require('../lib/errors');
const { createTrade, getTrades, getTradeById } = require('../models/trades');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { __v, _id, ...trade } = (await createTrade(req.body)).toObject();
      res.status(201).json(trade);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const { type, user_id } = req.query;
      const filter = {};

      if (type) Object.assign(filter, { type });
      if (user_id) Object.assign(filter, { user_id });

      const trades = await getTrades(filter);
      res.status(200).json(trades);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const trade = await getTradeById(req.params.id);

      if (!trade) {
        throw new NotFoundError('ID not found');
      }

      res.status(200).json(trade);
    } catch (error) {
      next(error);
    }
  }
}