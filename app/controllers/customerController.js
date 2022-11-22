const mongoose = require("mongoose");

const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}
// Create Customer
const createCustomer = (req, res) => {
    // B1: Thu thập dữ liệu từ req
    let body = req.body;
    console.log(body)
    // B2: Validate dữ liệu
    if (!body.fullName) {
        return res.status(400).json({
            message: "fullName is required!"
        })
    }
    // if (!body.phone) {
    //     return res.status(400).json({
    //         message: "phone is required!"
    //     })
    // }
    if (!validateEmail(body.email)) {
        return res.status(400).json({
            message: "email is invalid!"
        })
    }
    // if (!body.password) {
    //     return res.status(400).json({
    //         message: "password is required!"
    //     })
    // }

    // B3: Gọi model thực hiện các thao tác nghiệp vụ
    let newCustomerData = {
        _id: mongoose.Types.ObjectId(),
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        ward: body.ward,
        district: body.district,
        city: body.city,
        password: body.password
    }

    customerModel.create(newCustomerData, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(201).json({
            message: "Create successfully",
            newCustomer: data
        })
    })
}

//Get all Customer
const getAllCustomer = (req, res) => {
    customerModel.find().populate({
        path: 'orders',
        populate: ({
            path: "orderDetails",
            populate: ({
                path: 'product',
                model: 'products'
            })
        })
    }).exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }

            return res.status(200).json({
                message: "Get all Customers successfully",
                Customer: data
            })
        })
}

//Get Customer by id
const getCustomerById = (req, res) => {
    // B1: Thu thập dữ liệu từ req
    let customerId = req.params.customerId;
    console.log("CustomerId", customerId);
    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            message: "Customer ID is invalid!"
        })
    }

    // B3: Gọi model thực hiện các thao tác nghiệp vụ
    customerModel.findById(customerId).populate({
        path: 'orders',
        populate: ({
            path: "orderDetails",
            populate: ({
                path: 'product',
                model: 'products'
            })
        })
    }).exec((error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }

        return res.status(201).json({
            message: "Get Customer successfully",
            Customer: data
        })
    })
}

//Update Customer
const updateCustomer = (req, res) => {
    // B1: Thu thập dữ liệu từ req
    let customerId = req.params.customerId;
    let body = req.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            message: "Customer ID is invalid!"
        })
    }

    // Bóc tách trường hợp undefied
    if (body.fullName !== undefined && body.fullName == "") {
        return res.status(400).json({
            message: "fullName is required!"
        })
    }
    

    if (!validateEmail(body.email)) {
        return res.status(400).json({
            message: "email is invalid!"
        })
    }




    // B3: Gọi model thực hiện các thao tác nghiệp vụ
    let updateCustomerData = {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        ward: body.ward,
        district: body.district,
        city: body.city,
        password: body.password
    }

    customerModel.findByIdAndUpdate(customerId, updateCustomerData, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }

        return res.status(200).json({
            message: "Update Customer successfully",
            Customer: data
        })
    })
}

// Delete CustomerType
const deleteCustomer = async (req, res) => {
    // B1: Thu thập dữ liệu từ req

    try {
        await orderModel.updateMany({ buyer: req.params.customerId }, { buyer: null })
        await customerModel.findByIdAndDelete(req.params.customerId)
        res.status(200).json('delete successfully')
    } catch (error) {
        res.status(200).json(error)
    }

}

// Export Drink controller thành 1 module
module.exports = {
    createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer
}
