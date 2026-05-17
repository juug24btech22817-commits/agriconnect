const express = require('express');
const router = express.Router();
const {
    createShipment,
    getTrackingUpdate,
    deliveryWebhook
} = require('../controllers/deliveryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Shipment creation - only authorized farmers/admins
router.post('/ship', protect, authorize('admin', 'farmer'), createShipment);

// Tracking update
router.get('/track/:trackingId', getTrackingUpdate);

// Webhook
router.post('/webhook', deliveryWebhook);

module.exports = router;
