const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const checkDb = require('../middleware/checkDb');

// POST /items - Create a new item
router.post('/', checkDb, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const item = new Item({ name, price, description, image });
    await item.save();

    res.status(201).json({ message: 'Item created successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// GET /items - List all items
router.get('/', checkDb, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
});

module.exports = router;
