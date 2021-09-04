const Message = require('../model/msgModel');
const http = require('http');
const io = require('socket.io')(http);

exports.getMessages = async (req,res,next)=>{
    try {
        let allMessages =await Message.find();
        res.status(200).json({
            'message':'All messages are retrieved',
            'success':true,
            'messages':allMessages
        })
    } catch (error) {
        res.status(500).json({
            'message':'network error',
            'success':false
        })
    }
}
exports.postMessage = async (req,res,next)=>{
    try {
        let newMsg = await Message(req.body);
        newMsg.save((err)=>{
            if(err) {
            res.status(400).json({
                'message':'There is error in request',
                'success':false,
                'error':err
            })
        }
        io.emit('message',req.body);
        res.status(200).json({
            'message':'All messages are retrieved',
            'success':true,
            'messages':newMsg
        })
        })
    } catch (error) {
        res.status(500).json({
            'message':'network error',
            'success':false
        })
    }
}