const mongoose = require("mongoose");

const conn = async ()=>{
    try{
        const res = await mongoose.connect(process.env.mongo_url)
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = conn;