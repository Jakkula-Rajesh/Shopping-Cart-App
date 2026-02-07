const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const checkDb = require('../middleware/checkDb');

// POST /orders - Create order from cart (protected)
router.post('/', checkDb, auth, async (req, res) => {
  try {
    const { cartId } = req.body;
    const userId = req.user._id;

    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    // Find cart
    const cart = await Cart.findById(cartId).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Verify cart belongs to user
    if (cart.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Cart does not belong to this user' });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.itemId.price * item.quantity;
    });

    // Create order
    const order = new Order({
      userId,
      cartId,
      items: cart.items,
      totalPrice
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.status = 'inactive';
    await cart.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// GET /orders - List all orders
router.get('/', checkDb, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.itemId').populate('userId', '-password');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// GET /orders/user - Get user's orders (protected)
router.get('/user/orders', checkDb, auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.itemId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router;
