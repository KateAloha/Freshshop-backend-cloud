const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    orderDate: {
        type: String,
        default: ""
    },
    shippedDate: {
        type: String,
        defaul: ""
    },
    city: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    ward: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    payment: {
        type: String,
        require: true
    },
    shipping: {
        type: String,
        required: true
    },
    orderDetails: [{
        type: mongoose.Types.ObjectId,
        ref: 'orderDetail',
    }],
    cost: {
        type: Number,
        default: 0
    }
    

},{
    timestamps: true
})

module.exports = mongoose.model('orders',order);