const mongoose = require('mongoose');

const productModel = require("../models/productModel");
const productType = require("../models/productTypeModel")

const createProduct = async (req, res) => {
    let body = req.body;
    if (!body.name) {
        return res.status(400).json({
            message: `name is required`
        })
    }
    // if (!body.imageChild) {
    //     return res.status(400).json({
    //         message: `imageChild is required`
    //     })
    // }
    // if (!body.categories) {
    //     return res.status(400).json({
    //         message: `categories is required`
    //     })
    // }
    if (!mongoose.Types.ObjectId.isValid(body.type)) {
        return res.status(400).json({
            message: `Type is required`
        })
    }
    if (!body.imageURl) {
        return res.status(400).json({
            message: `imageUrl is required`
        })
    }
    if (!Number.isInteger(body.buyPrice) || body.buyPrice < 0) {
        return res.status(400).json({
            message: `buyPrice is invalid`
        })
    }
    if (!Number.isInteger(body.promotionPrice) || body.promotionPrice < 0) {
        return res.status(400).json({
            message: `promotionPrice is invalid`
        })
    }

    let newProduct = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        type: body.type,
        imageURl: body.imageURl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
        amount: body.amount,
        imageChild: body.imageChild
    }
    if (body.type) {
        const type = productType.findById(body.type)
        await type.updateOne({ $push: { products: newProduct._id } })
    }
    productModel.create(newProduct, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(201).json({
            message: `Create successful`,
            newProduct: data
        })
    })
}

//get all product
const getAllProduct = (req, res) => {
    let limit = req.query.limit;
    let filterName = req.query.filterName;
    let filterMinPrice = req.query.filterMinPrice;
    let filterMaxPrice = req.query.filterMaxPrice;
    let filterCategories = req.query.filterCategories;


    const regex = new RegExp(`${filterName}`);
    // const regexColor = new RegExp(`${filterColor}`);
    // const regexCategories = new RegExp(`${filterCategories}`);

    let condition = {};

    if (filterName) {
        condition.name = regex;
    }
    if (filterMinPrice) {
        condition.buyPrice = { ...condition.buyPrice, $gte: filterMinPrice };
    }
    if (filterMaxPrice) {
        condition.buyPrice = { ...condition.buyPrice, $lte: filterMaxPrice };
    }


    //categories
    if (filterCategories !== "" && !Array.isArray(filterCategories) && filterCategories !== undefined) {
        filterCategories = [filterCategories]
    }

    if (Array.isArray(filterCategories)) {
        condition.categories = {
            $in: filterCategories
        }
    }



    productModel.find(condition)
        .limit(limit)
        .populate("type")
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
            return res.status(200).json({
                message: `get all product list success`,
                productList: data
            })
        })
}


//get product by Id
const getProductById = (req, res) => {
    let productId = req.params.productId;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            message: `productId is invalid`
        })
    }
    productModel.findById(productId)
        .populate('type')
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

//update product by Id
const updateProductById = async (req, res) => {

    let productId = req.params.productId;
    let body = req.body;;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            message: `productId is invalid`
        })
    }
    if (body.name !== undefined && body.name == "") {
        return res.status(400).json({
            message: `name is required`
        })
    }
    // if (body.categories !== undefined && body.categories == "") {
    //     return res.status(400).json({
    //         message: `categories is required`
    //     })
    // }
    // if (body.imageChild !== undefined && body.imageChild == "") {
    //     return res.status(400).json({
    //         message: `imageChild is required`
    //     })
    // }
    if (!mongoose.Types.ObjectId.isValid(body.type)) {
        return res.status(400).json({
            message: `type is invalid`
        })
    }
    if (body.imageURl !== undefined && body.imageURl == "") {
        return res.status(400).json({
            message: `imageUrl is required`
        })
    }
    if (body.buyPrice !== undefined && (!Number.parseInt(body.buyPrice) || body.buyPrice < 0)) {
        return res.status(400).json({
            message: `buyPrice is invalid`
        })
    }
    if (body.promotionPrice !== undefined && (!Number.parseInt(body.promotionPrice) || body.promotionPrice < 0)) {
        return res.status(400).json({
            message: `promotionPrice is invalid`
        })
    }
    let updateproduct = {
        name: body.name,
        type: body.type,
        imageURl: body.imageURl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
        amount: body.amount,
        imageChild: body.imageChild
    }

    productModel.findByIdAndUpdate(productId, updateproduct, (error, data) => {
        if (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return res.status(200).json({
            message: `Update successful`,
            product: data
        })
    })
}

//delete by product Id
const deleteByProductId = async (req, res) => {

    try {
        await productType.updateMany({ products: req.params.productId }, { $pull: {products :req.params.productId }})
        await productModel.findByIdAndDelete(req.params.productId)
        res.status(200).json('delete successfully')
    } catch (error) {
        res.status(200).json(error)
    }
}

module.exports = { createProduct, getAllProduct, getProductById, updateProductById, deleteByProductId }