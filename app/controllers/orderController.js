const mongoose = require("mongoose");

// Import Order Model
const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");
const orderDetailModel = require("../models/orderDetailModel");


// create Order Of Customer
const createOrder = async (req, res) => {
    //B1: Chuẩn bị dữ liệu
    
    let body = req.body;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(body.buyer)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "Customer ID is invalid"
        })
    }

    // if(!body.orderDate) {
    //     return res.status(400).json({
    //         message: "orderDate is invalid"
    //     })
    // }
    // if(!body.shippedDate) {
    //     return res.status(400).json({
    //         message: "shipped Date is invalid"
    //     })
    // }
    
    if(!Number.isInteger(body.cost) || body.cost < 0) {
        return res.status(400).json({
            message: "Cost is invalid!"
        })
    }
    

    //B3: Thao tác với cơ sở dữ liệu
    let newOrderInput = {
        _id: mongoose.Types.ObjectId(),
        orderDate: body.orderDate,
        shippedDate: body.shippedDate,
        city: body.city,
        district: body.district,
        ward: body.ward,
        address: body.address,
        buyer: body.buyer,
        payment: body.payment,
        shipping: body.shipping,
        orderDetails: body.orderDetails,
        cost: body.cost
    }

    if (body.buyer) {
        const buyer = customerModel.findById(body.buyer)
        await buyer.updateOne({$push : {orders: newOrderInput._id}})
    }

    orderModel.create(newOrderInput, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(201).json({
            message: `Create successful`,
            newOrderInput: data
        })
    })
}
// Get all Order 
const getAllOrder = (req, res) => {

    orderModel.find()
        .populate("buyer").populate({
            path: 'orderDetails',
            populate: {
                path: 'product',
                model: 'products'
            }
        })
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: `get all product list success`,
                orderList: data
            })
        })
}


const getOrderById = (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let orderId = req.params.orderId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "OrderId ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu

    orderModel.findById(orderId)
        .populate('buyer').populate({
            path: 'orderDetails',
            populate: {
                path: 'product',
                model: 'products'
            }
        })
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: ` get product by Id success`,
                order: data
            })
        })
}

const updateOrderById = (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let orderId = req.params.orderId;
    let body = req.body;

    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "Order ID is not valid"
        })
    }
    if(body.orderDate !== undefined && body.orderDate == "") {
        return res.status(400).json({
            message: "orderDate is invalid!"
        })
    }
    if(body.shippedDate !== undefined && body.shippedDate == "") {
        return res.status(400).json({
            message: "shippedDate is invalid!"
        })
    }
    if(body.cost !== undefined && (!Number.isInteger(body.cost) || body.cost <= 0)) {
        return res.status(400).json({
            message: "cost is invalid!"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let OrderUpdate = {
        orderDate: body.orderDate,
        shippedDate: body.shippedDate,
        city: body.city,
        district: body.district,
        ward: body.ward,
        address: body.address,
        buyer: body.buyer,
        payment: body.payment,
        shipping: body.shipping,
        orderDetails: body.orderDetails,
        cost: body.cost
    }


    orderModel.findByIdAndUpdate(orderId, OrderUpdate, (error, data) => {
        if(error) {
            return res.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Update order success",
                order: data
            })
        }
    })
}

const deleteOrderById = async (req, res) => {
    //B1: Chuẩn bị dữ liệu
    try {
        await customerModel.updateMany({orders: req.params.orderId}, {$pull: {order: req.params.orderId}})
        await orderModel.findByIdAndDelete(req.params.orderId)
        res.status(200).json('delete successfully')
    } catch (error) {
        res.status(200).json(error)
    }
}
  // Export customer controller thành 1 module
module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById
}
