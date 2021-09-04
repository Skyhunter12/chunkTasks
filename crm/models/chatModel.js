const mongoose =  require('mongoose');

let MediaSchema = new mongoose.Schema({    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
    },
    messages:[
        {
            text:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

let Chat = new mongoose.model('Chat',MediaSchema);
module.exports = Chat;