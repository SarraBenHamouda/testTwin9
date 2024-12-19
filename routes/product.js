const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

// Define routes using the router
router.post('/', ProductController.add);
router.get('/', ProductController.findAll);
router.get('/getBatiment/:id', ProductController.showByID);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);
router.put('/updatProduct/:id', ProductController.updateproduct);
router.get('/getProductByName/:name', ProductController.findByName);
router.get('/aboveAverage', ProductController.calculateAveragePrice);

// Render Twig view for average price
router.get('/averagePrice', (req, res) => {
    res.render('averagePrice.twig');
});

module.exports = router;
