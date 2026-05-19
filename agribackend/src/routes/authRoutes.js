const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerUser, authUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

const router = express.Router();

// Define a strict rate limiter for auth requests (brute-force prevention)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 register/login requests per windowMs
  message: {
    message: 'Too many login or registration attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, authUser);

module.exports = router;
