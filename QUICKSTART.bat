@echo off
REM Shopping Cart App - Quick Start Guide for Windows

echo.
echo ====================================
echo Shopping Cart E-Commerce Application
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Check if MongoDB is running (optional)
echo Checking MongoDB connection...
timeout /t 2 /nobreak

echo.
echo ====================================
echo OPTION 1: Quick Setup (Recommended)
echo ====================================
echo.
echo This will:
echo 1. Install all dependencies for backend and frontend
echo 2. Setup environment variables
echo 3. Prepare the application
echo.
echo Run: npm run install-all
echo.

echo ====================================
echo OPTION 2: Manual Setup
echo ====================================
echo.
echo Backend Setup:
echo   1. cd backend
echo   2. npm install
echo   3. Edit .env file with your MongoDB URI
echo   4. npm run dev (or npm start)
echo.
echo Frontend Setup (in another terminal):
echo   1. cd frontend
echo   2. npm install
echo   3. npm run dev
echo.

echo ====================================
echo OPTION 3: Seed Database with Sample Data
echo ====================================
echo.
echo After backend is running, in backend folder:
echo   npm run seed
echo.
echo This will add 10 sample products to your database
echo.

echo ====================================
echo Getting Started
echo ====================================
echo.
echo 1. Make sure MongoDB is running
echo.
echo 2. Open Terminal 1 (Backend):
echo    - cd backend
echo    - npm install (if not already done)
echo    - npm run dev
echo.
echo 3. Open Terminal 2 (Frontend):
echo    - cd frontend
echo    - npm install (if not already done)
echo    - npm run dev
echo.
echo 4. Open Browser:
echo    - http://localhost:3000
echo.
echo 5. Create an account and start shopping!
echo.

echo ====================================
echo Useful Commands
echo ====================================
echo.
echo Backend:
echo   npm run dev      - Start with auto-reload
echo   npm start        - Start production mode
echo   npm run seed     - Add sample items to database
echo.
echo Frontend:
echo   npm run dev      - Start development server
echo   npm run build    - Build for production
echo   npm run preview  - Preview production build
echo.

echo ====================================
echo Troubleshooting
echo ====================================
echo.
echo MongoDB Connection Error?
echo   - Make sure MongoDB is running: mongod
echo   - Or use MongoDB Atlas and update .env
echo.
echo Port Already in Use?
echo   - Kill port 5000: netstat -ano ^| findstr :5000
echo   - Kill port 3000: netstat -ano ^| findstr :3000
echo.
echo CORS or Token Errors?
echo   - Clear browser localStorage (F12 -> Application -> Clear Storage)
echo   - Restart both frontend and backend
echo.

echo ====================================
echo Documentation
echo ====================================
echo.
echo - README.md: Full project documentation
echo - SETUP.md: Detailed setup instructions
echo - API_DOCS.md: API endpoint documentation
echo.

echo Press any key to close this window...
pause
