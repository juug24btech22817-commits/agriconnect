const Order = require('../models/Order');
const axios = require('axios');

// @desc    Create a shipment with a delivery partner
// @route   POST /api/delivery/create
// @access  Private/Admin
const createShipment = async (req, res) => {
    try {
        const { orderId, partner } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Mocking API call to Shiprocket/Shadowfax
        // In a real scenario, you'd use axios.post(partner_api_url, shipment_data, config)
        
        const mockTrackingId = `TRK-${Math.floor(Math.random() * 1000000)}`;
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

        order.deliveryPartner = partner || 'Shiprocket';
        order.trackingId = mockTrackingId;
        order.deliveryStatus = 'Processed';
        order.estimatedDelivery = estimatedDelivery;
        order.status = 'shipped';

        const updatedOrder = await order.save();

        res.status(200).json({
            message: 'Shipment created successfully',
            trackingId: mockTrackingId,
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get tracking update from delivery partner
// @route   GET /api/delivery/track/:trackingId
// @access  Public
const getTrackingUpdate = async (req, res) => {
    try {
        const { trackingId } = req.params;
        const order = await Order.findOne({ trackingId });

        if (!order) {
            return res.status(404).json({ message: 'Tracking ID not found' });
        }

        // Mocking real-time tracking levels
        const statuses = [
            'Order Placed',
            'Picked Up',
            'In Transit',
            'Out for Delivery',
            'Delivered'
        ];
        
        // Return current status or mock a progression
        res.status(200).json({
            trackingId,
            status: order.deliveryStatus,
            estimatedDelivery: order.estimatedDelivery,
            history: [
                { status: 'Order Placed', time: order.createdAt },
                { status: order.deliveryStatus, time: new Date() }
            ]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Webhook for delivery status updates
// @route   POST /api/delivery/webhook
// @access  Public
const deliveryWebhook = async (req, res) => {
    try {
        const { tracking_id, status, timestamp } = req.body;
        
        const order = await Order.findOne({ trackingId: tracking_id });

        if (order) {
            order.deliveryStatus = status;
            if (status === 'Delivered') {
                order.isDelivered = true;
                order.deliveredAt = timestamp || new Date();
                order.status = 'delivered';
            }
            await order.save();
        }

        res.status(200).send('Webhook received');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createShipment,
    getTrackingUpdate,
    deliveryWebhook
};
