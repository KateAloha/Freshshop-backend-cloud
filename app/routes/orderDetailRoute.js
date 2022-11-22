const express = require("express");

const router = express.Router();

const { 
    createOrderDetail ,
    getOrderDetailById,
    getAllOrderDetail ,
    updateOrderDetail ,
    deleteOrderDetail ,
} = require("../controllers/orderDetailController");

router.get('/order-details', getAllOrderDetail);

router.get('/order-details/:orderDetailId', getOrderDetailById);

router.post('/order-details', createOrderDetail);

router.put('/order-details/:orderDetailId', updateOrderDetail);

router.delete('/order-details/:orderDetailId', deleteOrderDetail);

module.exports = router;

