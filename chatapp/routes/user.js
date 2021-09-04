let express = require('express');
const router = express.Router()
const {getMessages,
postMessage} =require('../controller/userController')

router.get('/messages',getMessages);

router.post('/messages',postMessage);

module.exports = router