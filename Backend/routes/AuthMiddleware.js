const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../Backend/.env' });

const authProtected = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    // Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided, authorization denied' });
    }
   
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authProtected };
