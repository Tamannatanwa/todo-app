const jwt = require('jsonwebtoken');

const authMiddlewareJwt  = async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        console.log(req.headers)
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.jwt_sec)
        req.user = decoded;
        next();
    }
    catch(err){
      return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {authMiddlewareJwt}