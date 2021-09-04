const express = require('express')
const PORT = process.env.PORT || 3000;
const booksRoute = require('./routes/booksRoute')
require('./db/mongoConn')
let app = express();
app.use(express.json());
app.use('/books',booksRoute)

app.listen(PORT, ()=>{
    console.log(`Listening to port number ${PORT}`);
})