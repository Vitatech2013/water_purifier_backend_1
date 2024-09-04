const Product = require('../models/product');
const multer = require('multer');
const path = require('path');
const { successResponse, errorResponse } = require("../utils/responseUtils");

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage }).single('file');

// Add a new product
exports.addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return errorResponse(res, 'File upload failed');

        const { productName, productPrice, warranty, description } = req.body;
        const productImg = req.file ? req.file.filename : null;

        try {
            const newProduct = new Product({ productName, productPrice, productImg, warranty, description });
            await newProduct.save();
            successResponse(res, newProduct, 'Product added successfully', 201);
        } catch (error) {
            errorResponse(res, error.message);
        }
    });
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return successResponse(res, null, 'No products found');
        }
        successResponse(res, products, 'Products retrieved successfully');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return successResponse(res, null, 'Product not found');
        }
        successResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return errorResponse(res, 'File upload failed');

        const { productName, productPrice, warranty, description } = req.body;
        const productImg = req.file ? req.file.filename : undefined;

        try {
            const updateData = { productName, productPrice, warranty, description };
            if (productImg) updateData.productImg = productImg;

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!updatedProduct) {
                return successResponse(res, null, 'Product not found');
            }
            successResponse(res, updatedProduct, 'Product updated successfully');
        } catch (error) {
            errorResponse(res, error.message);
        }
    });
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return successResponse(res, null, 'Product not found');
        }
        successResponse(res, null, 'Product deleted successfully');
    } catch (error) {
        errorResponse(res, error.message);
    }
};
