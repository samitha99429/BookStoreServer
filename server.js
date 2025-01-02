const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://books-store-client-one.vercel.app',
  'https://books-store-client-c3ks7x096-samithas-projects-66fa87b4.vercel.app',
  'http://localhost:3000' // Add localhost for development
];

// Configure CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Block request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable cookies and credentials
}));

// Explicitly handle preflight requests
app.options('*', cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Set the port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
