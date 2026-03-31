const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const { category, search } = req.query;
  const query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const products = await Product.find(query).populate('farmer', 'name farmerDetails location');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name farmerDetails location');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
const createProduct = async (req, res) => {
  const { name, category, price, unit, image, description, quantity, mandiPrice, retailPrice } = req.body;

  try {
    const product = new Product({
      name,
      category,
      price,
      unit,
      image,
      description,
      quantity,
      mandiPrice,
      retailPrice,
      farmer: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = async (req, res) => {
  const { name, category, price, unit, image, description, quantity, mandiPrice, retailPrice } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.farmer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized to update this product' });
      }

      product.name = name || product.name;
      product.category = category || product.category;
      product.price = price || product.price;
      product.unit = unit || product.unit;
      product.image = image || product.image;
      product.description = description || product.description;
      product.quantity = quantity || product.quantity;
      product.mandiPrice = mandiPrice || product.mandiPrice;
      product.retailPrice = retailPrice || product.retailPrice;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.farmer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized to delete this product' });
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
