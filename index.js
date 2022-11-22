//Import thu vien express
const express = require("express");
//Import thư viện mongoose
const mongoose = require("mongoose");
// import thu vien path
const path = require("path");
//import thu vien cors
const cors = require("cors")


const app = new express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const productTypeRouter = require("./app/routes/productTypeRoute");
const productRouter = require("./app/routes/productRoute");
const orderDetaiRouter = require("./app/routes/orderDetailRoute");
const orderRouter = require('./app/routes/orderRoute');
const customerRouter = require("./app/routes/customerRoute")


mongoose.connect('mongodb+srv://KateAloha:Khuyen%402000@cluster0.m6kmxcp.mongodb.net/test', function (error) {
    if (error) throw error;
    console.log('connect success');
})


app.use('/', productTypeRouter);
app.use('/', productRouter);
app.use('/', orderDetaiRouter);
app.use('/', orderRouter);
app.use('/', customerRouter);

app.listen(PORT, () => {
    console.log("App listenning on port: ", PORT)
})
