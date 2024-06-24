const { Schema, model } = require('mongoose');
const { tradeTypes } = require('../lib/constants');

const tradeSchemaObject = {
  id: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: tradeTypes
  },
  user_id: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  shares: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  price: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
};

const tradeSchema = new Schema(tradeSchemaObject);

const Trade = model('Trade', tradeSchema);

const selectionFields = '-_id ' + Object.keys(tradeSchemaObject).join(' ');

const createTrade = async (tradeData) => {
  const lastTrade = await Trade.findOne().sort({ id: -1 });
  const newId = lastTrade ? lastTrade.id + 1 : 1;

  const newTrade = new Trade({ id: newId, ...tradeData });
  return newTrade.save();
};

const getTrades = (filters = {}) => {
  return Trade.find(filters).select(selectionFields).sort({ id: 1 });
};

const getTradeById = (id) => {
  return Trade.findOne({ id }).select(selectionFields);
};

const deleteMany = () => {
  return Trade.deleteMany();
}

module.exports = {
  createTrade,
  getTrades,
  getTradeById,
  deleteMany,
  tradeSchemaObject
};
