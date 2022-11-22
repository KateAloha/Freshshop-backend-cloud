const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderDetail = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        require: true
    },
    quantity: {
        type: Number,
        default: 0,
        require: true
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: 'orders',
        require: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('orderDetail',orderDetail);