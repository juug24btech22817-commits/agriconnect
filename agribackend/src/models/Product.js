const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Subscription'],
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      default: 'kg',
    },
    image: {
      type: String,
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    mandiPrice: Number,
    retailPrice: Number,
    rating: {
      type: Number,
      default: 5.0,
    },
    description: String,
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
