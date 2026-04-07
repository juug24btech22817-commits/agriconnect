const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to seed admin...');

    const adminExists = await User.findOne({ email: 'admin@agriconnect.com' });

    if (adminExists) {
      console.log('Admin user already exists. Updating role to admin...');
      adminExists.role = 'admin';
      await adminExists.save();
      console.log('Admin user updated successfully.');
    } else {
      console.log('Creating new admin user...');
      await User.create({
        name: 'AgriConnect Admin',
        email: 'admin@agriconnect.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created successfully.');
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
