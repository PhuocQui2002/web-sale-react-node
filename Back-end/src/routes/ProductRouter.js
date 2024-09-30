const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
router.get('/getDetailsProduct/:id', ProductController.getDetailsProduct)
router.get('/getAllProduct', ProductController.getAllProduct)
//router.post('/delete-many', authMiddleWare, ProductController.deleteMany)
//router.get('/get-all-type', ProductController.getAllType)

module.exports = router