'use strict';

const mongoose = require('mongoose');

let balanceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  credit:{type: Number, required: true},
  debit:{type: Number, required: true},
  total: {type: Number, required: true}
})



const Balance = mongoose.model('Balance', balanceSchema)

module.exports = Balance
