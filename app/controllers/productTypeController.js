const mongoose = require('mongoose');
const productModel = require('../models/productModel');

const productTypeModel = require("../models/productTypeModel");

const createProductType = (req, res) => {
    let body = req.body;
    if (!body.name) {
        return res.status(400).json({
            message: `name is required`
        })
    }
    let newProductType = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        description: body.description,
    }
    productTypeModel.create(newProductType, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(201).json({
            message: `Create successful`,
            newProductType: data
        })
    })
}

//get all productType
const getAllProductType = (req, res) => {
    productTypeModel.find().populate('products')
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: ` get productType success`,
                productType: data
            })
        })
}


//get productType by Id
const getProductTypeById = (req, res) => {
    let productTypeId = req.params.productTypeId;
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            message: `productTypeId is invalid`
        })
    }
    productTypeModel.findById(productTypeId)
        .populate('products')
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: ` get productType by Id success`,
                productType: data
            })
        })

}

//update productType by Id
const updateProductTypeById = (req, res) => {
    let productTypeId = req.params.productTypeId;
    let body = req.body;;
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            message: `productTypeId is invalid`
        })
    }
    if (body.name !== undefined && body.name == "") {
        return res.status(400).json({
            message: `name is required`
        })
    }
    let updateproductType = {
        name: body.name,
        description: body.description,
    }
    productTypeModel.findByIdAndUpdate(productTypeId, updateproductType, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(200).json({
            message: `Update successful`,
            updateCourse: data
        })
    })
}

//delete by productType Id
const deleteByProductTypeId = async (req,res) => {
    try {
        await productModel.updateMany({type: req.params.productTypeId}, {type: null})
        await productTypeModel.findByIdAndDelete(req.params.productTypeId)
        res.status(200).json('delete successfully')
    } catch (error) {
        res.status(200).json(error)
    }
}



module.exports = {createProductType, getAllProductType,getProductTypeById,updateProductTypeById,deleteByProductTypeId}