const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    // profile_pic:{
    //     type:String,
    //     default:"https://example.com"
    // }

},
{
    timestamps:true
})


const user = mongoose.model("user",userSchema)
module.exports = user;
