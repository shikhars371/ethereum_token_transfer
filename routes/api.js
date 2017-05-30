var express = require('express');
var router = express.Router();

var getbalance = require('../api/getbalance');

router.post('/getbalance',getbalance.balance);

var unlockaccount = require('../api/unlockaccount');

router.post('/unlockaccount',unlockaccount.unlock);

var Transfer = require('../api/transfer_token');

router.post('/transfer_token',Transfer.transfer);



module.exports = router;
