const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customer = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    district: {
        type: String,
        default: "",
    },
    ward: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: "",
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "orders"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('customer', customer);