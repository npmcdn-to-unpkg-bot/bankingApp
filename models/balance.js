'use strict';

const mongoose = require('mongoose');

let balanceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type:{type: Number},
  amount:{type: Number}
})



const Balance = mongoose.model('Balance', balanceSchema)

module.exports = Balance
