import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const getAllowedOrigins = () => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.split(',').map(url => url.trim());
  }
  return ['http://localhost:3000', 'http://localhost:5173'];
};

const allowedOrigins = getAllowedOrigins();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check if origin is allowed
    // Remove trailing slashes for comparison
    const originClean = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      const allowedClean = allowedOrigin.replace(/\/$/, '');
      return originClean === allowedClean;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}. Allowed origins:`, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Authentication API Server',
    status: 'running',
    endpoints: {
      health: '/api/health',
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

