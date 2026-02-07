# Shopping Cart App - Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

### Installation Steps

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure Backend:**
   - Navigate to `backend/.env`
   - Update `MONGODB_URI` if not using local MongoDB
   - Update `JWT_SECRET` with a secure key

3. **Start Backend (Terminal 1):**
   ```bash
   npm run backend:dev
   ```
   Backend will run on: `http://localhost:5000`

4. **Start Frontend (Terminal 2):**
   ```bash
   npm run frontend
   ```
   Frontend will run on: `http://localhost:3000`

## Key Features

✅ Single-device login enforcement
✅ Secure JWT authentication
✅ Shopping cart management
✅ Order placement and history
✅ Modern, responsive UI with Tailwind CSS

## First Time Setup

1. Create a user account
2. Add items via POST /api/items (use Postman/curl)
3. Login with created credentials
4. Browse items and add to cart
5. Checkout to place orders

## Important Notes

- Only one device can be logged in per user at a time
- Cart is associated with a user, not a session
- Orders are created from carts
- Logout clears the session token from database

## API Testing

Use Postman or curl to test these endpoints:

```bash
# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Create an item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Product","price":99.99}'

# Get all items
curl http://localhost:5000/api/items
```

## Troubleshooting

- **MongoDB not connecting**: Ensure mongod is running
- **Port errors**: Check if ports 3000 or 5000 are already in use
- **CORS errors**: Restart both frontend and backend
- **Login issues**: Clear browser localStorage and try again

For more details, see `README.md`
