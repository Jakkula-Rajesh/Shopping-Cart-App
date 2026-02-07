const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  image: { 
    type: String, 
    default: 'https://via.placeholder.com/200?text=Item' 
  },
  status: { 
    type: String, 
    default: 'available' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', itemSchema);
