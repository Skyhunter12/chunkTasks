const express = require('express');
const router = express.Router();
const {customerDetails,
customerChats,
postCustomer,
postMessage,
editCustomer,
deleteCustomer} = require('../controller/crmController')

router.get('/customers/:id',customerDetails)
router.get('/customers/:customerId/chats',customerChats)
router.post('/customers',postCustomer)
router.post('/customers/:customerId/chats',postMessage)
router.patch('/customers/:id',editCustomer)
router.delete('/customers/:id',deleteCustomer)

module.exports = router