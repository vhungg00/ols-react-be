const express = require('express');
const auth = require('../../middlewares/auth');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').post(auth('manageProduct'), productController.createProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management and retrieval
 */
