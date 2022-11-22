const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productType = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'products',
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('productType',productType);