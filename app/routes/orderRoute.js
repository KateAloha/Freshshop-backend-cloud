const express = require("express");

const router = express.Router();

const {
    createOrder, getAllOrder, getOrderById, updateOrderById, deleteOrderById } = require("../controllers/orderController");

router.get('/orders', getAllOrder);

router.post('/orders', createOrder);

router.get('/orders/:orderId', getOrderById);

router.put('/orders/:orderId', updateOrderById);

router.delete('/orders/:orderId', deleteOrderById);

module.exports = router;
