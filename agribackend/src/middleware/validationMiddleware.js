/**
 * Custom request payload validation middleware for AgriConnect
 */

const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a valid string.');
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    errors.push('Email is required.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address.');
    }
  }

  // Password complexity validation
  if (!password || typeof password !== 'string') {
    errors.push('Password is required.');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
  }

  // Role validation
  if (role && !['farmer', 'buyer', 'admin'].includes(role)) {
    errors.push('Role must be one of: farmer, buyer, admin.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Email check
  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email is required.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address.');
    }
  }

  // Password check
  if (!password || typeof password !== 'string' || password === '') {
    errors.push('Password is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};
