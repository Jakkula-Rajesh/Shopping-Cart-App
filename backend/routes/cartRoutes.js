const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const checkDb = require('../middleware/checkDb');

// POST /carts - Add item to cart (protected)
router.post('/', checkDb, auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user._id;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({ userId, items: [{ itemId }] });
    } else {
      // Add item to existing cart
      const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ itemId });
      }
    }

    await cart.save();
    await cart.populate('items.itemId');

    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

// GET /carts - List all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('items.itemId').populate('userId', '-password');
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching carts', error: err.message });
  }
});

// GET /carts/user - Get user's cart (protected)
router.get('/user/cart', checkDb, auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});

module.exports = router;
