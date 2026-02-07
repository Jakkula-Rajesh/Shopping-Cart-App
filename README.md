# Shopping Cart E-Commerce Application

A full-stack e-commerce application built with **Node.js + Express + MongoDB** for the backend and **React + Vite + Tailwind CSS** for the frontend. Features single-device session management, shopping cart functionality, and order placement.

## 🎯 Features

✅ **User Authentication**
- User registration and login
- Single-device session management (only one token per user)
- Prevents login on multiple devices simultaneously
- Secure password hashing with bcryptjs

✅ **Shopping Experience**
- Browse all available items
- Add items to cart
- View cart items
- Order history tracking

✅ **Order Management**
- Convert cart to orders
- Order history display
- Order status tracking

✅ **Modern UI**
- Responsive design with Tailwind CSS
- Gradient backgrounds and smooth transitions
- Lucide React icons
- Toast notifications for user actions

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone/Navigate to Project Folder

```bash
cd shopping-cart-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create/configure .env file
# Edit .env and update MONGODB_URI if needed
```

**Backend .env Configuration:**
```
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on your machine
mongod
```

**Option B: MongoDB Atlas (Cloud)**
Update the `backend/.env` file with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping-cart
```

## 🎮 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will be running on: `http://localhost:5000`

### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will be running on: `http://localhost:3000`

## 📊 Project Structure

```
shopping-cart-app/
├── backend/
│   ├── models/
│   │   ├── User.js       (User schema with token field)
│   │   ├── Item.js       (Product items)
│   │   ├── Cart.js       (Shopping cart)
│   │   └── Order.js      (Orders)
│   ├── middleware/
│   │   └── auth.js       (JWT verification)
│   ├── routes/
│   │   ├── userRoutes.js    (Auth endpoints)
│   │   ├── itemRoutes.js    (Item endpoints)
│   │   ├── cartRoutes.js    (Cart endpoints)
│   │   └── orderRoutes.js   (Order endpoints)
│   ├── server.js         (Express app setup)
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx     (Login & signup form)
│   │   │   └── ItemList.jsx  (Main shopping interface)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - List all users
- `POST /api/users/login` - Login (returns JWT token)
- `POST /api/users/logout` - Logout (clears token)

### Items
- `POST /api/items` - Create item (admin)
- `GET /api/items` - List all items

### Carts (Protected - requires token)
- `POST /api/carts` - Add item to cart
- `GET /api/carts` - List all carts
- `GET /api/carts/user/cart` - Get current user's cart

### Orders (Protected - requires token)
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - List all orders
- `GET /api/orders/user/orders` - Get current user's orders

## 🔐 Single Device Session Management

The app enforces single-device login:

1. When user logs in, a JWT token is generated and stored in the user's database record
2. If the user tries to login again on another device, the system detects an existing token and blocks the login with the message: **"You cannot login on another device."**
3. When user logs out, the token is cleared from the database, allowing them to login again

## 📝 Seed Data (Adding Sample Items)

To add sample items to the database, send a POST request to `/api/items`:

```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999,
    "description": "High performance laptop",
    "image": "https://via.placeholder.com/200?text=Laptop"
  }'
```

Or use this example in Postman/Insomnia with different items.

## 🎨 Frontend Screens

### 1. **Login Screen**
- Username and password input
- Login and Create Account buttons
- Gradient background design
- Error handling for invalid credentials

### 2. **Item List Screen**
- Grid layout of all available items with images
- Add to Cart button for each item
- Navbar with user controls

### 3. **Navbar Controls**
- **Checkout**: Place order from cart
- **Cart**: View items in cart
- **Order History**: View all placed orders
- **Logout**: Sign out (clears token)

### 4. **Modals**
- Cart items display (shows item IDs and quantities)
- Order history display (shows order IDs and totals)

## 🧪 Testing Workflow

1. **Create Account**
   - Navigate to Frontend
   - Click "Create Account"
   - Enter username and password

2. **Login**
   - Enter credentials and click "Login"
   - You should be redirected to Items list

3. **Add Items to Cart**
   - Click "Add to Cart" on any item

4. **View Cart**
   - Click "Cart" button to see added items

5. **Checkout**
   - Click "Checkout" to convert cart to order
   - View success message

6. **View Orders**
   - Click "Order History" to see placed orders

7. **Logout**
   - Click "Logout" button
   - You'll be redirected to login screen

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB connection string in `.env`
- Verify firewall settings if using MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### CORS Issues
- Backend already has CORS configured
- Ensure frontend proxy is set correctly in `vite.config.js`

### Token Errors
- Clear browser localStorage and try logging in again
- Ensure .env JWT_SECRET is set

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin support
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `vite` - Build tool
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `axios` - HTTP client

## 🎓 Learning Resources

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [JWT Best Practices](https://auth0.com/blog/json-web-token-jwt-best-current-practices/)

## 📝 License

This project is open source and available for educational purposes.

## 💡 Future Enhancements

- Product inventory management
- Multiple items quantity management
- Payment gateway integration
- User profile management
- Admin dashboard
- Product reviews and ratings
- Wishlist functionality
- Search and filter options
- Email notifications

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
