# Backend Server Setup Guide (Node.js + MongoDB)

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Community Edition) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [YOUR_REPOSITORY_URL]
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. MongoDB Setup

**Option A: Local MongoDB Installation**
- Install MongoDB Community Edition
- Start MongoDB service:
  - **Windows**: MongoDB should start automatically as a service
  - **Mac**: `brew services start mongodb/brew/mongodb-community`
  - **Linux**: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string

### 4. Environment Configuration

Create a `.env` file in the root directory:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/foodapp
```

**For MongoDB Atlas, use your connection string:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/foodapp
```

### 5. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📂 Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (create this)
├── app/
│   ├── __init__.py    # Python module files
│   └── routes.py      # Python routes
└── static/            # Static files (CSS, JS, images)
```

## 🔧 Available Scripts

- `npm start` - Start the server
- `npm test` - Run tests (currently not configured)

## 🗄️ Database Information

- **Database Name**: `foodapp`
- **Connection**: MongoDB (local or Atlas)
- **Default Port**: 27017 (local)

## 📝 API Endpoints

Currently available:
- `GET /` - Test endpoint (returns "Server is running!")

## 🚨 Troubleshooting

### Common Issues:

1. **"Cannot connect to MongoDB"**
   - Ensure MongoDB is running locally OR
   - Check your MongoDB Atlas connection string in `.env`

2. **"Port already in use"**
   - Change the PORT in `.env` file
   - Or stop other processes using port 3000

3. **"Module not found"**
   - Run `npm install` to install dependencies

4. **"Environment variables not loading"**
   - Ensure `.env` file exists in root directory
   - Check file formatting (no spaces around =)

### Verify Setup:
1. Visit `http://localhost:3000` - should show "Server is running!"
2. Check console for "✅ MongoDB connected" message
3. No error messages in terminal

## 🔐 Security Notes

- Never commit `.env` files to Git
- Use strong passwords for MongoDB Atlas
- Keep dependencies updated: `npm audit fix`

## 👥 Team Collaboration

1. Always pull latest changes: `git pull origin main`
2. Install new dependencies if package.json changes: `npm install`
3. Restart server after pulling changes: `npm start`

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Verify all prerequisites are installed
3. Check console error messages
4. Contact the development team

---

**Last Updated**: October 7, 2025  
**Server Version**: 1.0.0  
**Node.js**: Express + Mongoose + MongoDB