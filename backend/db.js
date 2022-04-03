const mongoose = require('mongoose');
const uri='mongodb://localhost:27017/test';

const connectToMongo = ()=>{
    mongoose.connect(uri,()=>{
        console.log("connected to mongo succesfully");
    })
}

module.exports = connectToMongo;