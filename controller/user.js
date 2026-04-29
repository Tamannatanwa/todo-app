const user = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const genrateToken = async (userData)=>{
    const payload = { userId: userData._id, email:userData.email };
    const secretKey =  process.env.jwt_sec;
    const options = { expiresIn: '7d' };
    return jwt.sign(payload,secretKey,options)
}

const signup = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username && !email && !password){
            return res.status(400).json({
                msg:"all fields are required"
            })
        }
        const preExistance = await user.findOne({email});
        if(preExistance){
                return res.status(400).json({
                msg:"user exist",
                // email:preExistance.email
            })
        }
        const hashPsw = await bcrypt.hash(password,10)
        const addUser = user.create({username,email,password:hashPsw})
        return res.status(201).json({
            msg:"User has been created successfully !",
            username:addUser.username,
            email: addUser.email,
            auth_token:await genrateToken(addUser)
        })

    }
    catch(err){
        console.error("Error:", err);
    }
}


const login = async(req,res)=>{
    try{

    }
    catch(err){

    }
}

module.exports = {signup,login}