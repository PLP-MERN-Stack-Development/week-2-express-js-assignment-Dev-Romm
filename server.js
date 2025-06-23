// server.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const productRouter = require('./routes/routes');
const validateProduct = require('./middleware/validateProduct');
const authenticate = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory products data
const products = require('./data/products');

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to '${req.url}'`);
  next();
});

// Optional login endpoint to generate token
app.post('/login', (req, res) => {
  const user = { username: 'admin' }; // dummy user
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Secure all product routes
app.use(authenticate);

// Product routes
app.use('/', productRouter(products, validateProduct));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;