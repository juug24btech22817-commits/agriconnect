const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    totalAmount,
    deliveryPartner,
  } = req.body;

  const rawItems = orderItems || items;

  if (!rawItems || rawItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    let populatedItems = [];
    let calculatedItemsPrice = 0;

    for (const item of rawItems) {
      if (item.name && item.price && item.image && item.farmer) {
        populatedItems.push(item);
        calculatedItemsPrice += Number(item.price) * Number(item.quantity);
      } else if (item.product) {
        const dbProduct = await Product.findById(item.product);
        if (!dbProduct) {
          return res.status(404).json({ message: `Product not found: ${item.product}` });
        }
        populatedItems.push({
          product: dbProduct._id,
          name: dbProduct.name,
          quantity: item.quantity,
          image: dbProduct.image,
          price: dbProduct.price,
          farmer: dbProduct.farmer,
        });
        calculatedItemsPrice += Number(dbProduct.price) * Number(item.quantity);
      } else {
        return res.status(400).json({ message: 'Invalid item format' });
      }
    }

    let normalizedAddress = {
      address: 'Default User Address',
      city: 'Kolar',
      postalCode: '563101',
      country: 'India',
    };

    if (typeof shippingAddress === 'string') {
      normalizedAddress.address = shippingAddress;
    } else if (shippingAddress && typeof shippingAddress === 'object') {
      normalizedAddress = {
        address: shippingAddress.address || normalizedAddress.address,
        city: shippingAddress.city || normalizedAddress.city,
        postalCode: shippingAddress.postalCode || normalizedAddress.postalCode,
        country: shippingAddress.country || normalizedAddress.country,
      };
    }

    const finalPaymentMethod = paymentMethod || 'COD';
    const finalShippingPrice = typeof shippingPrice !== 'undefined' ? Number(shippingPrice) : 40;
    const finalTotalPrice = Number(totalPrice || totalAmount || (calculatedItemsPrice + finalShippingPrice));

    const mockTrackingId = `TRK-${Math.floor(Math.random() * 1000000)}`;
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    const order = new Order({
      items: populatedItems,
      buyer: req.user._id,
      shippingAddress: normalizedAddress,
      paymentMethod: finalPaymentMethod,
      itemsPrice: calculatedItemsPrice,
      shippingPrice: finalShippingPrice,
      totalPrice: finalTotalPrice,
      status: 'pending',
      deliveryPartner: deliveryPartner || 'Shiprocket',
      trackingId: mockTrackingId,
      deliveryStatus: 'Order Placed',
      estimatedDelivery: estimatedDelivery,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email')
      .lean();

    if (order) {
      // Check if user is the buyer or the farmer for one of the items
      if (order.buyer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
          // This check is simplified; in a real app, we'd check if the farmer owner of items is req.user
          // For now, only buyer and admin can see the full order by ID
          return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin or Farmer
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('buyer', 'id name').lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
