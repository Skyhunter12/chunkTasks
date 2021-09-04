let express = require('express');
require('./db/mongoConn');
const routes = require('./routes/customerRoute')
const PORT = process.env.PORT ||3000

let app =express()

app.use(express.json())
app.use(routes);

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})