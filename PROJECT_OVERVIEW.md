# 🛒 Shopping Cart E-Commerce Application - Project Overview

## 📊 Project Summary

A complete full-stack e-commerce application with:
- **Backend**: Node.js + Express + MongoDB with JWT authentication
- **Frontend**: React + Vite with Tailwind CSS and modern UI components
- **Feature**: Single-device session management (only one user login per device)

---

## 📁 Project Structure

```
shopping-cart-app/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (includes token field for session)
│   │   ├── Item.js          # Product items
│   │   ├── Cart.js          # Shopping carts
│   │   └── Order.js         # Orders/Transactions
│   │
│   ├── middleware/
│   │   └── auth.js          # JWT authentication & token validation
│   │
│   ├── routes/
│   │   ├── userRoutes.js    # User endpoints (/users)
│   │   ├── itemRoutes.js    # Item endpoints (/items)
│   │   ├── cartRoutes.js    # Cart endpoints (/carts)
│   │   └── orderRoutes.js   # Order endpoints (/orders)
│   │
│   ├── server.js            # Express app initialization
│   ├── seed.js              # Database seeding script
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment variables
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx    # Sign up & Login screen
│   │   │   └── ItemList.jsx # Shopping interface
│   │   │
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React DOM entry point
│   │   └── index.css        # Global styles + Tailwind
│   │
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── postcss.config.js    # PostCSS configuration
│   └── package.json         # Dependencies
│
├── README.md                # Full documentation
├── SETUP.md                 # Setup instructions
├── API_DOCS.md              # API endpoint reference
├── QUICKSTART.bat           # Quick start script (Windows)
├── QUICKSTART.sh            # Quick start script (Mac/Linux)
├── package.json             # Root project config
└── .gitignore
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Configure Backend
```bash
cd backend
# Edit .env file:
# - MONGODB_URI=mongodb://localhost:27017/shopping-cart
# - JWT_SECRET=your_secret_key
# - PORT=5000
```

### 3. Start Backend (Terminal 1)
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### 4. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### 5. Seed Sample Data (Optional)
```bash
cd backend
npm run seed
# Adds 10 sample products to database
```

---

## 🔑 Key Features

### ✅ Single-Device Session Management
- Only one active token per user in the database
- Prevents simultaneous login on multiple devices
- Error message: "You cannot login on another device."
- Token cleared on logout to allow re-login

### ✅ User Authentication
- Secure password hashing with bcryptjs
- JWT tokens for stateless authentication
- Protected endpoints require valid token
- Token stored in database for verification

### ✅ Shopping Features
- Browse all items in grid view
- Add items to personal cart
- View cart contents
- Convert cart to order
- View order history

### ✅ Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Gradient backgrounds and smooth animations
- Clean modal dialogs for cart/orders
- Toast notifications for user feedback
- Professional color scheme (blue/purple)

### ✅ Database Relations
```
User
├── token (current session)
├── carts (1:1)
└── orders (1:many)

Cart
├── user (many:1)
└── items (many:many via cart_items)

Order
├── user (many:1)
├── cart (many:1)
└── items (many:many)

Item
├── carts (many:many)
└── orders (many:many)
```

---

## 📋 API Endpoints

### Users
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/users` | ❌ | Create new user (signup) |
| GET | `/api/users` | ❌ | List all users |
| POST | `/api/users/login` | ❌ | Login & get JWT token |
| POST | `/api/users/logout` | ✅ | Logout & clear token |

### Items
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/items` | ❌ | Create item |
| GET | `/api/items` | ❌ | List all items |

### Carts
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/carts` | ✅ | Add item to cart |
| GET | `/api/carts` | ❌ | List all carts |
| GET | `/api/carts/user/cart` | ✅ | Get user's cart |

### Orders
| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/orders` | ✅ | Create order from cart |
| GET | `/api/orders` | ❌ | List all orders |
| GET | `/api/orders/user/orders` | ✅ | Get user's orders |

---

## 🎨 Frontend Screens

### 1. Login Screen
- Username & password input fields
- Create Account button (signup)
- Login button
- Gradient background design
- Error handling and validation

### 2. Shopping Dashboard
- **Navbar** with:
  - Welcome message (username)
  - Checkout button (green)
  - Cart button (blue)
  - Order History button (indigo)
  - Logout button (red)

- **Items Grid**:
  - Responsive grid (1-4 columns)
  - Item image, name, description, price
  - "Add to Cart" button per item
  - Hover animations

### 3. Cart Modal
- Shows all items in cart
- Item IDs and quantities
- Close button

### 4. Order History Modal
- Shows all placed orders
- Order IDs and total prices
- Close button

---

## 🔐 Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Token Verification**: Middleware checks token in database
4. **Single Device**: Only one token per user at a time
5. **Protected Routes**: Sensitive operations require authentication
6. **CORS**: Configured for frontend-backend communication

---

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  token: String (current session JWT),
  createdAt: Date
}
```

### Items Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String (URL),
  status: String,
  createdAt: Date
}
```

### Carts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    itemId: ObjectId (ref: Item),
    quantity: Number
  }],
  status: String,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  cartId: ObjectId (ref: Cart),
  items: [{
    itemId: ObjectId (ref: Item),
    quantity: Number
  }],
  totalPrice: Number,
  status: String,
  createdAt: Date
}
```

---

## 🧪 Testing Workflow

1. **Create Account**
   - Navigate to http://localhost:3000
   - Enter username & password
   - Click "Create Account"

2. **Login**
   - Enter credentials
   - Click "Login"
   - Redirected to shopping dashboard

3. **Browse Items**
   - See all available products
   - Click "Add to Cart" on any item

4. **View Cart**
   - Click "Cart" button
   - See items added
   - Close modal

5. **Add More Items**
   - Add multiple items to cart
   - Each click increases quantity or adds new item

6. **Checkout**
   - Click "Checkout" button
   - Cart converts to order
   - See "Order successful" message
   - Cart is cleared

7. **View Orders**
   - Click "Order History"
   - See all placed orders with IDs and totals

8. **Logout**
   - Click "Logout" button
   - Redirected to login screen
   - Can login again (same or different user)

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, CORS
- **Environment**: dotenv

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: Built-in alerts/toast

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Complete project documentation |
| SETUP.md | Detailed setup & configuration |
| API_DOCS.md | API reference with examples |
| QUICKSTART.bat | Windows quick start script |
| QUICKSTART.sh | Mac/Linux quick start script |
| PROJECT_OVERVIEW.md | This file |

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Use MongoDB Atlas if local setup fails

### Port Already in Use
- Backend (5000): Close port or change in `.env`
- Frontend (3000): Change in `vite.config.js`

### CORS Error
- Verify backend CORS is enabled
- Check proxy settings in `vite.config.js`
- Restart both frontend and backend

### Token/Auth Issues
- Clear browser localStorage (F12 → Application → Clear All)
- Logout and login again
- Check JWT_SECRET matches in .env

### Items Not Loading
- Seed database: `npm run seed`
- Manually add items via POST `/api/items`

---

## 🚀 Deployment

### Backend (Heroku)
```bash
# Create Heroku app
heroku create app-name

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

### Frontend (Vercel)
```bash
# Connect repository to Vercel
# Update API endpoints to backend URL
# Deploy
```

### Environment Variables Needed
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping-cart
JWT_SECRET=your-secure-secret-key-here
PORT=5000
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 📈 Future Enhancements

- [ ] Product search and filtering
- [ ] Product categories and tags
- [ ] Inventory management
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] User profile management
- [ ] Multiple address support

---

## 📝 License

MIT License - Feel free to use for educational and commercial purposes

---

## 👨‍💻 Developer Notes

### Code Quality
- Clean, readable code with comments
- Proper error handling throughout
- Consistent naming conventions
- DRY (Don't Repeat Yourself) principles

### Performance
- Optimized database queries
- Populated references to reduce requests
- Efficient React rendering
- CSS optimization with Tailwind

### Security Best Practices
- Password hashing before storage
- JWT token verification on every protected request
- Single-device session enforcement
- CORS configured for frontend only

---

## 📞 Support

For issues or questions, refer to:
- Project documentation (README.md)
- API documentation (API_DOCS.md)
- Code comments
- Test the API with cURL or Postman examples in API_DOCS.md

---

**Happy Coding! 🚀**
