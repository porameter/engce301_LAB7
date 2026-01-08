// ============================================
// CONTROLLER LAYER - Products
// ============================================

const ProductService = require('../services/product.service');

class ProductController {

    // ===== GET ALL =====
    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    // ===== GET BY ID =====
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            // not found → 404
            if (error.message.includes('not found')) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            } else {
                // อื่น ๆ → 500
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }
    }

    // ===== CREATE =====
    static async createProduct(req, res) {
        try {
            // 1. รับข้อมูลจาก req.body
            const productData = req.body;

            // 2. เรียก Service
            const newProduct = await ProductService.createProduct(productData);

            // 3. ส่ง Response
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: newProduct
            });
        } catch (error) {
            // validation error → 400
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    // ===== UPDATE =====
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;

            const updatedProduct = await ProductService.updateProduct(id, productData);

            res.json({
                success: true,
                message: 'Product updated successfully',
                data: updatedProduct
            });
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: error.message
                });
            }
        }
    }

    // ===== DELETE =====
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            await ProductService.deleteProduct(id);

            res.json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }
    }

    // ===== SEARCH =====
    static async searchProducts(req, res) {
        try {
            const { q } = req.query;

            if (!q) {
                return res.status(400).json({
                    success: false,
                    error: 'Search keyword is required'
                });
            }

            const products = await ProductService.searchProducts(q);

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = ProductController;
