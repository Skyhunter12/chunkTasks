const mongoose = require('mongoose');
const validator = require('validator')
let customerSchema= new mongoose.Schema({
    name:String,
    mobileNo:{
        type:Number,
    },
    email:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid");
            }
        }
    }
})

const Customer = new mongoose.model('Customer',customerSchema);
module.exports = Customer