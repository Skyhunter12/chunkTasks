const Customer = require('../models/customerModel')
const Chat = require('../models/chatModel')

exports.customerDetails =async (req,res,next)=>{
    try {
        let _id = req.params.id;
        let customer_detail = await Customer.find({_id:_id})
        if(!customer_detail){
            res.status(400).json({
                'message':'Customer details are invalid',
                'success':false
            })
        }
        res.status(200).json({
            'message':'Customer details are retreived successfully',
            'success':true,
            'data':customer_detail
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'errors':error
        })
    }
}
exports.customerChats = async (req,res,next)=>{
    try {
        let customerId = req.params.customerId
        let chat = await Chat.findOne({user:customerId})
        res.status(200).json({
            'message':'Here are customer\'s interactions ',
            'messages':chat.messages
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'errors':error
        })
    }
}
exports.postCustomer=async (req,res,next)=>{
    try {
        let {name,mobileNo,email}= req.body;
        let registerCustomer = new Customer({
            name:name,
            mobileNo:mobileNo,
            email:email
        })
        let registered = await registerCustomer.save();
        if(!registered){
           return res.status(400).json({
                'message':'Looks like full info is missing',
                'success':false
            })
        }
        res.status(200).json({
            'message':`A user with name ${registered.name} added to customers list`,
            'success':true
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'errors':error
        })
    }
}
exports.postMessage = async (req,res,next)=>{
    try {
        let customerId = req.params.customerId;
        let customer =await Customer.findById({_id:customerId})
        let chat =await Chat.findOne({user:customer._id})
        if(!chat){
        chat = new Chat({user:customer._id})
        }
        const newComment = {
            text:req.body.text
        } 
        chat.messages.unshift(newComment);
        await chat.save()
        res.status(200).json({
            'message':'A message is sent successfully',
            'success':true
        })
    } catch (error) {
        res.status(500).json({
            'message':'network error',
            'errors':error
        })
    }
}

exports.editCustomer=async (req,res,next)=>{
    try {
        const _id = req.params.id;
        let success = false;
            if(req.body.constructor === Object && Object.keys(req.body).length === 0){
                res.send('Please select valid field/s to update')
            }else{
                const updateCustomer = await Customer.findOneAndUpdate(_id,req.body,{ new:true });
                success = true;
                
              res.status(200).json({
                'message':`User with id ${_id} is updated`,
                'success':success,
                'data':updateCustomer
              });        
    }
    } catch (error) {
       return  res.status(500).json({
            'message':'Network error',
            'errors':error
        })
    }
}
exports.deleteCustomer=async (req,res,next)=>{
    try {
        let customerErase =await Customer.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({
            'message':'Customer is erased from list',
            'success':true
        }) 
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'errors':error
        })
    }
}