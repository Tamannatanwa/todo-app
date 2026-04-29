const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    status:{
        type:String,
        enum:['not started','pending','completed'],
        default:'not started'
    }
},
{ timestamps: true }
)

const todo = mongoose.model("todo",todoSchema)

module.exports = todo;