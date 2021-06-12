const jwt = require("jsonwebtoken")
const user = require("../db/userSchema")


const Authentication = async (req , res , next) =>{
    try {
        const token = req.cookies.jwtoken;

        const verifyToken = jwt.verify(token , process.env.SECRET_KEY)

        const trueUser = await user.findOne({_id:verifyToken._id , "tokens.token": token})
        
        if(!trueUser){ throw new Error("user not found")}

        req.token = token;
        req.userId = trueUser._id;
        req.trueUser = trueUser

        next();

    } catch (error) {
        return res.status(401).json({message:"Please regester & Login First"})
    }

}

module.exports = Authentication