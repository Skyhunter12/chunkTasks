const mongoose = require('mongoose');

let conn =mongoose.connect("mongodb://localhost:27017/books",
{
useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{
    console.log('connected');
}).catch(err=>{
    console.log(err);

})
module.exports = conn;
