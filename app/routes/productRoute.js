const express = require('express');

const productRouter = express.Router();

const { createProduct, getAllProduct,getProductById,updateProductById,deleteByProductId} = require('../controllers/productController');

productRouter.get('/productRouters', getAllProduct);

productRouter.get('/productRouters/:productId', getProductById);

productRouter.post('/productRouters', createProduct);

productRouter.put('/productRouters/:productId', updateProductById);

productRouter.delete('/productRouters/:productId', deleteByProductId);



module.exports = productRouter

