const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/', protect, authorize('admin'), getOrders); // Admin can see all orders
router.get('/myorders', protect, getMyOrders); // User can see their own orders
router.get('/:id', protect, getOrderById);
router.put('/:id/deliver', protect, authorize('admin', 'farmer'), updateOrderToDelivered);

module.exports = router;
