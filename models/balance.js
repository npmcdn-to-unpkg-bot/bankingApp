'use strict';
const moment = require('moment');
const mongoose = require('mongoose');


let balanceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type:{type: String, required: true},
  amount:{type: Number, required: true},
  newTime:{type: Date, default: Date.now}
})

const Balance = mongoose.model('Balance', balanceSchema)

module.exports = Balance
