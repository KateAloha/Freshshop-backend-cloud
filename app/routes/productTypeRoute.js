const express = require('express');

const productTypeRouter = express.Router();

const { createProductType, getAllProductType,getProductTypeById,updateProductTypeById,deleteByProductTypeId} = require('../controllers/productTypeController');

productTypeRouter.get('/productTypeRouters', getAllProductType);

productTypeRouter.get('/productTypeRouters/:productTypeId', getProductTypeById);

productTypeRouter.post('/productTypeRouters', createProductType);

productTypeRouter.put('/productTypeRouters/:productTypeId', updateProductTypeById);

productTypeRouter.delete('/productTypeRouters/:productTypeId', deleteByProductTypeId);



module.exports = productTypeRouter

