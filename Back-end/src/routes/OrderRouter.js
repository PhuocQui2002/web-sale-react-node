const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');

const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create/:id',authUserMiddleWare, OrderController.createOrder)
router.get('/getDetailsOrder/:id', OrderController.getDetailsOrder)
router.get('/getAllOrderByUserId/:id', authUserMiddleWare,OrderController.getAllOrderByUserId)
router.delete('/cancelOrder/:id', OrderController.cancelOrderDetails)
router.get('/allOrder',authMiddleWare, OrderController.getAllOrder)
router.put('/updateOrder/:id',authMiddleWare, OrderController.updateOrder)





module.exports = router