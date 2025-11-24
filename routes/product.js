const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get verified products
router.get("/verified", async (req, res) => {
    const products = await Product.find({ makerVerified: true });
    res.json(products);
});

// Create product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read all products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Update product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Maker verification
router.patch("/verify/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { makerVerified: true }, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
