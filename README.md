# Authentication App

A full-stack authentication application with React frontend and Node.js/Express backend, using JWT authentication and MySQL database.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL database (local or cloud)
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd auth-app
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create .env file with DATABASE_URL, JWT_SECRET, etc.
   npm run prisma:migrate
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   # Create .env file with VITE_API_URL
   npm run dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5001

For detailed setup instructions, see:
- [Backend README](backend/README.md)
- [MySQL Setup Guide](backend/MYSQL_SETUP.md)

## 📦 Deployment

### Deploy to Production

This app is configured for deployment to:
- **Backend:** Render (https://render.com)
- **Frontend:** Vercel (https://vercel.com)
- **Database:** MySQL (PlanetScale recommended)

### Quick Deployment Guide

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for a quick reference guide.

### Complete Deployment Guide

See [DEPLOYMENT.md](DEPLOYMENT.md) for a comprehensive step-by-step guide.

### Environment Variables

See [ENV_VARIABLES.md](ENV_VARIABLES.md) for all environment variables needed for deployment.

## 📁 Project Structure

```
.
├── backend/           # Node.js/Express backend
│   ├── config/       # Configuration files
│   ├── middleware/   # Express middleware
│   ├── routes/       # API routes
│   ├── prisma/       # Prisma schema and migrations
│   └── server.js     # Express server
├── frontend/         # React/Vite frontend
│   ├── src/
│   │   ├── context/  # React context (AuthContext)
│   │   ├── pages/    # React pages (Login, Signup, Dashboard)
│   │   └── App.jsx   # Main app component
│   └── vite.config.js
├── DEPLOYMENT.md     # Complete deployment guide
├── QUICK_DEPLOY.md   # Quick deployment reference
└── ENV_VARIABLES.md  # Environment variables reference
```

## 🔧 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current user information (requires JWT token)

### Health Check
- `GET /api/health` - Health check endpoint

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Environment variable security
- HTTPS in production

## 📝 Environment Variables

### Backend
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5001)
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Node environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL

See [ENV_VARIABLES.md](ENV_VARIABLES.md) for detailed information.

## 🚀 Deployment Status

### Render (Backend)
- ✅ Configured with `render.yaml`
- ✅ Prisma migrations on deploy
- ✅ Health check endpoint
- ✅ Environment variables setup

### Vercel (Frontend)
- ✅ Configured with `vercel.json`
- ✅ SPA routing support
- ✅ Environment variables setup
- ✅ Build optimization

## 📖 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [MySQL Setup Guide](backend/MYSQL_SETUP.md) - MySQL database setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Quick deployment reference
- [ENV_VARIABLES.md](ENV_VARIABLES.md) - Environment variables reference

## 🐛 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check `DATABASE_URL` in `.env` file
   - Verify MySQL is running
   - Check database credentials

2. **CORS errors**
   - Verify `FRONTEND_URL` is set correctly
   - Check browser console for exact error
   - Ensure backend allows frontend origin

3. **Environment variables not working**
   - Frontend variables must have `VITE_` prefix
   - Restart development server after changes
   - Check `.env` file location and format

4. **Build failures**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check build logs for errors

For more troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting).

## 📄 License

ISC

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- Prisma for database ORM
- React team for React
- Vite team for Vite
- Render and Vercel for hosting platforms

---

## 🎯 Next Steps

1. ✅ Set up local development
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Configure environment variables
5. ✅ Test authentication flow
6. ✅ Set up custom domains (optional)
7. ✅ Monitor and optimize

---

**Happy Coding! 🚀**

