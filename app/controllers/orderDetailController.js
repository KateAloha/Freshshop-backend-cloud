const mongoose = require("mongoose");

// Import Order Model
const orderDetailModel = require("../models/orderDetailModel");
const orderModel = require("../models/orderModel");



// create Order Detail Of Order
const createOrderDetail = async (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let body = req.body;
    
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(body.order)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "OrderId ID is invalid"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(body.product)) {
        return res.status(400).json({
            message: "product Id is invalid"
        })
    }
    if(!Number.isInteger(body.quantity) || body.quantity < 0) {
        return res.status(400).json({
            message: "quantity is invalid!"
        })
    }
    
  

    //B3: Thao tác với cơ sở dữ liệu
    let newOrderDetailInput = {
        _id: mongoose.Types.ObjectId(),
        product: body.product,
        quantity: body.quantity,
        order: body.order
    }

    if (body.order) {
        const order = orderModel.findById(body.order)
        await order.updateOne({$push: {orderDetails: newOrderDetailInput._id}})
    }
    orderDetailModel.create(newOrderDetailInput, (error, data) => {
        if(error) {
            return res.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } 
        return res.status(201).json({
            message: 'create successfully',
            newOrderDetail: data
        })
    })
}


const getAllOrderDetail = (request, response) => {
    //B1: Chuẩn bị dữ liệu

    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "OrderId ID is invalid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    orderModel.find()
        .populate("order").populate('product')
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    message: "Get data success",
                    data: data.orderDetails
                })
            }
        })
}

const getOrderDetailById = (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "order Detail Id is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    orderDetailModel.findById(orderDetailId)
        .populate('order').populate('product')
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: ` get product by Id success`,
                product: data
            })
        })
}

const updateOrderDetail = (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    let body = req.body;

    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "Order Detail ID is not valid"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(body.product)) {
        return res.status(400).json({
            message: "product Id is invalid"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(body.order)) {
        return res.status(400).json({
            message: "order Id is invalid"
        })
    }
    if(body.quantity !== undefined && (!Number.isInteger(body.quantity) || body.quantity <= 0)) {
        return res.status(400).json({
            message: "quantity is invalid!"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let OrderDetailUpdate = {
        product: body.product,
        quantity: body.quantity,
        order: body.order
    }


    orderDetailModel.findByIdAndUpdate(orderDetailId, OrderDetailUpdate, (error, data) => {
        if(error) {
            return res.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return res.status(200).json({
                message: "Success: Update order detail success",
                data: data
            })
        }
    })
}

const deleteOrderDetail = (req, res) => {
    //B1: Chuẩn bị dữ liệu
    let orderDetailId = req.params.orderDetailId;
    //B2: Validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(orderDetailId)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "order Detail ID is not valid"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(body.order)) {
        return res.status(400).json({
            status: "Error 400: Bad req",
            message: "Order ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu

    orderDetailModel.findByIdAndDelete(orderDetailId, (error) => {
        if(error) {
            return res.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } 
        return res.status(204).json({
            message: 'delele success'
        })
    })
}
  // Export customer controller thành 1 module
module.exports = {
    createOrderDetail ,
    getAllOrderDetail ,
    getOrderDetailById,
    updateOrderDetail ,
    deleteOrderDetail ,
}
