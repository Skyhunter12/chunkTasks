const mongoose = require('mongoose');
let msgSchema = new mongoose.Schema({
    name:String,
    message:String,
    date:{
        type:Date,
        default:Date.now
    }
})

const Message = new mongoose.model('Message',msgSchema);
module.exports = Message