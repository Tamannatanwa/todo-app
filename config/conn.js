const mongoose = require("mongoose");

const conn = async ()=>{
    try{
        const res = await mongoose.connect(process.env.mongo_url)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = conn;