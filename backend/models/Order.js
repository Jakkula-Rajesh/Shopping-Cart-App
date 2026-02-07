const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  cartId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cart',
    required: true
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  status: { 
    type: String, 
    default: 'completed' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', orderSchema);
