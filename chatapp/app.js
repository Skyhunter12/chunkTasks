const express = require('express')
const app = express();
require('./db/mongoConn');
const userRoutes = require('./routes/user')
const Message = require('./model/msgModel');
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection',()=>{
    console.log('user is connected');
})
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname))
app.use(userRoutes);

// var server = app.listen(3000,()=>{
//     console.log('Server is running on port',server.address().port);
// })

var server =http.listen(3000,()=>{
    console.log(`Server is running on port, ${server.address().port}`);
})