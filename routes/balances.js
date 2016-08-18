
var express = require('express');
var router = express.Router();

let Balance = require('../models/balance');

//GET Balances
router.get('/', (req, res) => {
  Balance.find({}, (err, balances) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(balances);
    }
  })
})

router.post('/', (req, res) => {
  Balance.create(req.body, (err, balance) => {
    if(err) {
      res.status(400).send(err);
    } else {

      res.send(balance);
    }
  })
})

router.delete('/:id', (req, res) => {
  Balance.findByIdAndRemove( req.params.id, (err) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  })
})

module.exports = router;
