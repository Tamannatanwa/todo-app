const user = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const genrateToken = async (userData)=>{
    const payload = { userId: userData._id, email:userData.email };
    const secretKey =  process.env.jwt_sec;
    const options = { expiresIn: '7d' };
    return jwt.sign(payload,secretKey,options)
}

const signup = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        if(!username && !email && !password){
            console.log("all fields are required")
            return res.status(400).json({
                msg:"all fields are required"
            })
        }
        const preExistance = await user.findOne({email});
        if(preExistance){
               console.log("User Exists")
                return res.status(400).json({
                msg:"user exist",
                // email:preExistance.email
            })
        }
        const hashPsw = await bcrypt.hash(password,10)
        const addUser = user.create({username,email,password:hashPsw})

        console.log("user added successfully",addUser)

        return res.status(201).json({
            msg:"user signup successfully !",
            username:addUser.username,
            email: addUser.email,
            auth_token:await genrateToken(addUser)
        })

    }
    catch(err){
        console.error("Error:", err);
        next(err)
    }
}


const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        console.log(email,password)
        if(!email && !password){
            console.log("all fields are required")
            return res.status(400).json({
                msg:"all fields are required !"
            })
        }
        const userFind = await user.findOne({email});
        const psw_varify = await bcrypt.compare(password,userFind.password)
        if(!psw_varify){
            console.log("wrong password")
            return res.status(400).json({
                msg:"wrong password"
            })
        }

        
        console.log("User Found",userFind)

        return res.status(200).json({
            msg:"User login successfully !",
            emai:userFind.email,
            username:userFind.username,
            _id:userFind._id,
            auth_token:await genrateToken(userFind)
        })
    }
    catch(err){
        console.error("Error:", err);
        next(err)

    }
}

module.exports = {signup,login}