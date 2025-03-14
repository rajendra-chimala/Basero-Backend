const express = require('express');
const app = express();
require('dotenv').config();
const {DatabaseCon} = require('./DB/DatabaseCon');
const cors = require('cors');

DatabaseCon();

app.get('/',(req,res)=>{
    res.end(`<H1>Server is Running !</H1>`);
})


app.use(cors())
app.use(express.json());
app.use('/api',require('./Router/User'))
app.use('/api/room/',require('./Router/Room'));




app.listen(process.env.PORT, ()=>{
    console.log(`Server Is Running      [${process.env.PORT}]` );
})