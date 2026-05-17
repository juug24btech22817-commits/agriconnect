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

        const now = new Date();
        const createdTime = new Date(order.createdAt);
        const diffMs = now - createdTime;
        const diffMins = Math.floor(diffMs / 60000);

        let currentStatus = order.deliveryStatus || 'Order Placed';
        let isDelivered = order.isDelivered || false;
        let status = order.status || 'pending';

        if (order.status !== 'cancelled' && !order.isDelivered) {
            if (diffMins >= 7) {
                currentStatus = 'Delivered';
                isDelivered = true;
                status = 'delivered';
                
                order.deliveryStatus = 'Delivered';
                order.isDelivered = true;
                order.status = 'delivered';
                order.deliveredAt = now;
                await order.save();
            } else if (diffMins >= 5) {
                currentStatus = 'Out for Delivery';
                if (order.deliveryStatus !== 'Out for Delivery') {
                    order.deliveryStatus = 'Out for Delivery';
                    await order.save();
                }
            } else if (diffMins >= 3) {
                currentStatus = 'In Transit';
                if (order.deliveryStatus !== 'In Transit') {
                    order.deliveryStatus = 'In Transit';
                    await order.save();
                }
            } else if (diffMins >= 1) {
                currentStatus = 'Picked Up';
                if (order.deliveryStatus !== 'Picked Up') {
                    order.deliveryStatus = 'Picked Up';
                    await order.save();
                }
            } else {
                currentStatus = 'Order Placed';
            }
        }

        const history = [
            { status: 'Order Placed', time: createdTime }
        ];

        if (diffMins >= 1) {
            const pickedUpTime = new Date(createdTime.getTime() + 1 * 60000);
            history.push({ status: 'Picked Up', time: pickedUpTime < now ? pickedUpTime : now });
        }
        if (diffMins >= 3) {
            const inTransitTime = new Date(createdTime.getTime() + 3 * 60000);
            history.push({ status: 'In Transit', time: inTransitTime < now ? inTransitTime : now });
        }
        if (diffMins >= 5) {
            const outForDeliveryTime = new Date(createdTime.getTime() + 5 * 60000);
            history.push({ status: 'Out for Delivery', time: outForDeliveryTime < now ? outForDeliveryTime : now });
        }
        if (diffMins >= 7 || isDelivered) {
            history.push({ status: 'Delivered', time: order.deliveredAt || now });
        }

        res.status(200).json({
            trackingId,
            status: currentStatus,
            estimatedDelivery: order.estimatedDelivery,
            isDelivered,
            orderStatus: status,
            history
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
