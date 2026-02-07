// Seed data helper - run this once to populate initial items
// Usage: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const sampleItems = [
  {
    name: 'Laptop Pro',
    price: 1299.99,
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    image: 'https://via.placeholder.com/200?text=Laptop+Pro'
  },
  {
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Ergonomic wireless mouse with long battery life',
    image: 'https://via.placeholder.com/200?text=Wireless+Mouse'
  },
  {
    name: 'USB-C Hub',
    price: 49.99,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    image: 'https://via.placeholder.com/200?text=USB-C+Hub'
  },
  {
    name: 'Mechanical Keyboard',
    price: 159.99,
    description: 'RGB mechanical keyboard with customizable switches',
    image: 'https://via.placeholder.com/200?text=Mechanical+Keyboard'
  },
  {
    name: '4K Monitor',
    price: 399.99,
    description: '32-inch 4K UHD monitor with HDR support',
    image: 'https://via.placeholder.com/200?text=4K+Monitor'
  },
  {
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Noise-cancelling wireless headphones with 30-hour battery',
    image: 'https://via.placeholder.com/200?text=Wireless+Headphones'
  },
  {
    name: 'Portable SSD',
    price: 129.99,
    description: '1TB portable external SSD with fast data transfer',
    image: 'https://via.placeholder.com/200?text=Portable+SSD'
  },
  {
    name: 'Webcam 4K',
    price: 79.99,
    description: '4K resolution webcam with auto-focus and built-in microphone',
    image: 'https://via.placeholder.com/200?text=Webcam+4K'
  },
  {
    name: 'USB-C Cable (2m)',
    price: 19.99,
    description: 'High-quality USB-C cable with fast charging support',
    image: 'https://via.placeholder.com/200?text=USB-C+Cable'
  },
  {
    name: 'Phone Stand',
    price: 24.99,
    description: 'Adjustable phone stand compatible with all devices',
    image: 'https://via.placeholder.com/200?text=Phone+Stand'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-cart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert sample items
    const inserted = await Item.insertMany(sampleItems);
    console.log(`Successfully inserted ${inserted.length} items`);

    console.log('Sample items:');
    inserted.forEach(item => {
      console.log(`- ${item.name}: $${item.price}`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
