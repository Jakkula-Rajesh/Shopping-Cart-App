# API Documentation & Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication
Protected endpoints require the JWT token in the `Authorization` header:
```
Authorization: <jwt_token_from_login>
```

---

## 1. USER ENDPOINTS

### Create User (Sign Up)
**POST** `/users`

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

---

### Get All Users
**GET** `/users`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "token": null,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### Login
**POST** `/users/login`

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "username": "testuser"
}
```

**Error (403) - Already logged in on another device:**
```json
{
  "message": "You cannot login on another device."
}
```

**Error (400) - Invalid credentials:**
```json
{
  "message": "Invalid username or password"
}
```

---

### Logout
**POST** `/users/logout`

**Headers:**
```
Authorization: <jwt_token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 2. ITEM ENDPOINTS

### Create Item
**POST** `/items`

**Request Body:**
```json
{
  "name": "Laptop Pro",
  "price": 1299.99,
  "description": "High-performance laptop",
  "image": "https://via.placeholder.com/200?text=Laptop"
}
```

**Response (201):**
```json
{
  "message": "Item created successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Laptop Pro",
    "price": 1299.99,
    "description": "High-performance laptop",
    "image": "https://via.placeholder.com/200?text=Laptop",
    "status": "available",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Get All Items
**GET** `/items`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Laptop Pro",
    "price": 1299.99,
    "description": "High-performance laptop",
    "image": "https://via.placeholder.com/200?text=Laptop",
    "status": "available",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Mouse",
    "price": 29.99,
    "description": "Wireless mouse",
    "image": "https://via.placeholder.com/200?text=Mouse",
    "status": "available",
    "createdAt": "2024-01-15T10:31:00.000Z"
  }
]
```

---

## 3. CART ENDPOINTS

### Add Item to Cart
**POST** `/carts`

**Headers:**
```
Authorization: <jwt_token>
```

**Request Body:**
```json
{
  "itemId": "507f1f77bcf86cd799439012"
}
```

**Response (201):**
```json
{
  "message": "Item added to cart",
  "cart": {
    "_id": "607f1f77bcf86cd799439020",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "607f1f77bcf86cd799439021",
        "itemId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Laptop Pro",
          "price": 1299.99
        },
        "quantity": 1
      }
    ],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Get All Carts
**GET** `/carts`

**Response (200):**
```json
[
  {
    "_id": "607f1f77bcf86cd799439020",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "testuser"
    },
    "items": [
      {
        "_id": "607f1f77bcf86cd799439021",
        "itemId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Laptop Pro",
          "price": 1299.99
        },
        "quantity": 1
      }
    ],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### Get User's Cart
**GET** `/carts/user/cart`

**Headers:**
```
Authorization: <jwt_token>
```

**Response (200):**
```json
{
  "_id": "607f1f77bcf86cd799439020",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "_id": "607f1f77bcf86cd799439021",
      "itemId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Laptop Pro",
        "price": 1299.99
      },
      "quantity": 1
    }
  ],
  "status": "active",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 4. ORDER ENDPOINTS

### Create Order (Checkout)
**POST** `/orders`

**Headers:**
```
Authorization: <jwt_token>
```

**Request Body:**
```json
{
  "cartId": "607f1f77bcf86cd799439020"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "707f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "cartId": "607f1f77bcf86cd799439020",
    "items": [
      {
        "_id": "707f1f77bcf86cd799439031",
        "itemId": "507f1f77bcf86cd799439012",
        "quantity": 1
      }
    ],
    "totalPrice": 1299.99,
    "status": "completed",
    "createdAt": "2024-01-15T10:32:00.000Z"
  }
}
```

---

### Get All Orders
**GET** `/orders`

**Response (200):**
```json
[
  {
    "_id": "707f1f77bcf86cd799439030",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "testuser"
    },
    "cartId": "607f1f77bcf86cd799439020",
    "items": [
      {
        "itemId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Laptop Pro",
          "price": 1299.99
        },
        "quantity": 1
      }
    ],
    "totalPrice": 1299.99,
    "status": "completed",
    "createdAt": "2024-01-15T10:32:00.000Z"
  }
]
```

---

### Get User's Orders
**GET** `/orders/user/orders`

**Headers:**
```
Authorization: <jwt_token>
```

**Response (200):**
```json
[
  {
    "_id": "707f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "cartId": "607f1f77bcf86cd799439020",
    "items": [
      {
        "itemId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Laptop Pro",
          "price": 1299.99
        },
        "quantity": 1
      }
    ],
    "totalPrice": 1299.99,
    "status": "completed",
    "createdAt": "2024-01-15T10:32:00.000Z"
  }
]
```

---

## Testing with cURL

### Create a user
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Create an item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Laptop",
    "price":999.99,
    "description":"High performance"
  }'
```

### Get all items
```bash
curl http://localhost:5000/api/items
```

### Add to cart (replace TOKEN with actual JWT)
```bash
curl -X POST http://localhost:5000/api/carts \
  -H "Content-Type: application/json" \
  -H "Authorization: TOKEN" \
  -d '{"itemId":"ITEM_ID"}'
```

### Create an order (replace TOKEN and CART_ID with actual values)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: TOKEN" \
  -d '{"cartId":"CART_ID"}'
```

---

## Testing with Postman

1. **Import into Postman** or manually create requests with the endpoints above
2. **Set up environment variables** for `TOKEN` and `BASE_URL`
3. **Test each endpoint** in sequence following the workflow

---

## Common Error Codes

| Code | Description |
|------|------------|
| 400 | Bad Request - Missing required fields |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Already logged in on another device |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## Workflow Example

1. **Sign Up**: POST `/users`
2. **Login**: POST `/users/login` → Get token
3. **Get Items**: GET `/items`
4. **Add to Cart**: POST `/carts` with token
5. **Checkout**: POST `/orders` with token and cartId
6. **View Orders**: GET `/orders/user/orders` with token
7. **Logout**: POST `/users/logout` with token
