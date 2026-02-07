# 🔧 Environment Configuration Guide

## Backend Environment Setup

### 📝 Backend .env File Location
```
backend/.env
```

### 📋 Backend .env Configuration

Create a `.env` file in the backend folder with the following content:

```env
# MongoDB Connection String
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/shopping-cart

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/shopping-cart

# JWT Secret Key (generate a random secure string)
# Example: openssl rand -hex 32
JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production

# Server Port
PORT=5000

# Optional: Node Environment
NODE_ENV=development
```

### 🔑 Generating a Secure JWT Secret

**On Windows (PowerShell):**
```powershell
[System.Guid]::NewGuid().ToString() -replace '-', ''
```

**On Mac/Linux:**
```bash
openssl rand -hex 32
```

---

## 🗄️ MongoDB Setup Options

### Option A: Local MongoDB Installation

1. **Download & Install**
   - Windows: https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow official documentation

2. **Start MongoDB Service**
   - Windows: Services → MongoDB Server
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify Connection**
   ```bash
   mongosh
   # or older versions:
   mongo
   ```

4. **Connection String**
   ```
   MONGODB_URI=mongodb://localhost:27017/shopping-cart
   ```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose "Free" tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `shopping-cart`

4. **Example Connection String**
   ```
   mongodb+srv://username:password@cluster0.m8i3l.mongodb.net/shopping-cart?retryWrites=true&w=majority
   ```

5. **Update .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.m8i3l.mongodb.net/shopping-cart
   ```

---

## 🎯 Frontend Configuration

### Vite Proxy Configuration
The vite.config.js already has proxy configured for API calls:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

This means frontend API calls to `/api/*` will proxy to `http://localhost:5000/api/*`

### Environment Variables (Optional)
For production, create a `.env` file in frontend root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Shopping Cart App
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📦 Port Configuration

### Default Ports
- **Backend**: 5000
- **Frontend**: 3000

### Change Ports if Needed

**Backend (backend/.env):**
```env
PORT=8000  # Changed from 5000
```

**Frontend (frontend/vite.config.js):**
```javascript
server: {
  port: 5173,  // Changed from 3000
  ...
}
```

---

## ✅ Verification Checklist

### Before Starting Backend

- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] `backend/.env` file created and configured
- [ ] MongoDB running (local or Atlas connection working)
- [ ] `backend/node_modules` exists (after npm install)

### Before Starting Frontend

- [ ] `frontend/node_modules` exists (after npm install)
- [ ] Backend server running on http://localhost:5000
- [ ] `frontend/vite.config.js` proxy configured correctly

### Verification Commands

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Test MongoDB connection
mongosh "mongodb://localhost:27017"

# Test Backend API
curl http://localhost:5000/api/health

# Check Process on Port
# Windows:
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :5000
lsof -i :3000
```

---

## 🚨 Common Configuration Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Verify MongoDB is running
2. Check connection string in .env
3. Try local MongoDB connection first
4. If using Atlas, whitelist your IP address

### Issue: "Port 5000/3000 already in use"
**Solution:**
```bash
# Find process on port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000

# Kill process
# Windows: taskkill /PID [PID] /F
# Mac/Linux: kill -9 [PID]
```

### Issue: "CORS error" or "Cannot reach API"
**Solution:**
1. Backend must be running on 5000
2. Frontend proxy must point to 5000
3. Restart both servers
4. Check vite.config.js proxy settings

### Issue: "JWT token invalid"
**Solution:**
1. Ensure JWT_SECRET is set and same across restarts
2. Change JWT_SECRET only in development
3. Clear browser localStorage and login again

### Issue: "Cannot login on another device" (Correct behavior)
- This is intentional! Only one device can be logged in per user
- Logout from the first device to login on another

---

## 🔐 Security Best Practices

### For Development
```env
JWT_SECRET=any-non-empty-string-for-development
MONGODB_URI=mongodb://localhost:27017/shopping-cart
```

### For Production
1. Generate strong JWT_SECRET
   ```bash
   openssl rand -hex 32
   ```

2. Use strong MongoDB password

3. Use MongoDB Atlas with:
   - IP whitelist enabled
   - Strong credentials
   - Network access restricted

4. Never commit .env to git

5. Use environment variables in hosting platform:
   - Heroku Config Vars
   - Vercel Environment Variables
   - AWS Secrets Manager
   - etc.

---

## 📝 Sample Complete Configuration

### backend/.env (Complete Example)
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/shopping-cart

# JWT Configuration
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# Server Configuration
PORT=5000
NODE_ENV=development
```

### backend/.env (Atlas Example)
```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://admin:MyPassword123@cluster0.m8i3l.mongodb.net/shopping-cart?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=xyz987654321abcdefghijklmnopqrst

# Server Configuration
PORT=5000
NODE_ENV=development
```

---

## 🚀 Quick Environment Setup

### Automated Setup Script (Windows)
```batch
@echo off
echo Creating backend/.env...
(
    echo MONGODB_URI=mongodb://localhost:27017/shopping-cart
    echo JWT_SECRET=dev-secret-key-change-in-production
    echo PORT=5000
    echo NODE_ENV=development
) > backend\.env
echo ✓ backend/.env created!
```

### Automated Setup Script (Mac/Linux)
```bash
#!/bin/bash
echo "Creating backend/.env..."
cat > backend/.env << EOF
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
NODE_ENV=development
EOF
echo "✓ backend/.env created!"
```

---

## 🎓 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Environment Variables](https://12factor.net/config)
- [Express Configuration](https://expressjs.com/en/advanced/best-practice-security.html)

---

## 💡 Tips & Tricks

1. **Keep separate .env files for dev/prod**
2. **Use strong random secrets for JWT**
3. **Change JWT_SECRET periodically in production**
4. **Monitor MongoDB storage and network**
5. **Keep backups of your MongoDB data**
6. **Use MongoDB Atlas backups for production**

---

Good luck with your shopping cart app! 🎉
