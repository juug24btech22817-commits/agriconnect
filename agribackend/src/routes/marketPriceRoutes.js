const express = require('express');
const { getMarketPrices } = require('../controllers/marketPriceController');

const router = express.Router();

router.get('/', getMarketPrices);

module.exports = router;
