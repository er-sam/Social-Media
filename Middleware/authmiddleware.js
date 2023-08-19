// const JWT = require("jsonwebtoken")
import JWT from "jsonwebtoken";
import userModel from "../Models/UserModels.js";


// TOKEN IS MAINLY AVAILABLE OR PASSED THROUGH HEADER IN authorization eg : REQ.HEADER.AUTH 
// get-->next(validate)-->res 
export const protectedRoute=async(req,res,next)=>{
    // console.log("req.header",req.headers)
    // console.log("object",req.body.headers)     
    try{
        let jwt;
        if(req.headers.authorization === undefined){
             jwt = req.body.headers.Authorization
        }
        else{
             jwt = req.headers.authorization
        }
        const decode = JWT.verify(jwt,process.env.JWT_C)
        req.user = decode;
        next();
        // console.log(req.headers.authorization)
        // console.log("decode->"+JSON.stringify(decode))
    }       
    catch(error){
        console.log(error)     
        res.status(401).send({
            success : false,
            message : "Jwt failure.............",    
            error
        })
    }
}


//CHECKING ADMIN 
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        // console.log(user.role)
        if(user.role !== 1){
            return res.status(401).send({
                success : false,
                message : "Unauthorized access.."
            })
        }
        else{
            next()
        }
        
    } catch (error) {
        // console.log(error)
        res.status(401).send({
            success : false,
            message : "error in middleware",
            error
        })
    }
}
  
