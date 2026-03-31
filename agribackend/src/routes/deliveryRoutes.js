const express = require('express');
const router = express.Router();
const {
    createShipment,
    getTrackingUpdate,
    deliveryWebhook
} = require('../controllers/deliveryController');

// Shipment creation
router.post('/ship', createShipment);

// Tracking update
router.get('/track/:trackingId', getTrackingUpdate);

// Webhook
router.post('/webhook', deliveryWebhook);

module.exports = router;
