const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref: 'productType',
        required: true
    },
    imageURl: {
        type: String,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    imageChild: [ {
        type: String,
        default: ""
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('products',product); 