const express = require("express");

const router = express.Router();

const { 
    createCustomer ,  getAllCustomer ,   getCustomerById,    updateCustomer ,   deleteCustomer  } = require("../controllers/customerController");

router.post("/customers", createCustomer);

router.get("/customers", getAllCustomer );

router.get("/customers/:customerId", getCustomerById);

router.put("/customers/:customerId", updateCustomer );

router.delete("/customers/:customerId",deleteCustomer);

module.exports = router;
