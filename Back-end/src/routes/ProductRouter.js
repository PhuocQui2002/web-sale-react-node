const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
router.get('/getDetailsProduct/:id', ProductController.getDetailsProduct)
router.get('/getAllProduct', ProductController.getAllProduct)
router.post('/deleteMany', authMiddleWare, ProductController.deleteManyProduct)
router.get('/getAllType', ProductController.getAllType)
router.get('/getAllPrice', ProductController.getAllPrice)


module.exports = router