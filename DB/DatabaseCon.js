const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

async function  DatabaseCon (){
    try {
        await mongoose.connect(DB_URL);
        console.log("Database Connected !");
    } catch (error) {
        console.log(error);
        
    }

}


module.exports = {DatabaseCon}