const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    // status:{
    //     type:String,
    //     enum:['not started','pending','completed'],
    //     default:'not started'
    // }
    user_id: {
      type: Number,
      required: true,
    }
},
{ timestamps: true }
)

const todo = mongoose.model("todo",todoSchema)

module.exports = todo;