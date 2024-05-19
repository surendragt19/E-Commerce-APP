import jwt from 'jsonwebtoken'
import userModels from '../models/userModels.js';

//protected route token use
export const requireSignInMiddleWear=async(req,res,next)=>{
    try {
        const decoded = jwt.verify(req.headers.authorization,process.env.JWT_SECRET_KEY);
    req.user=decoded;
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({
            msg:'Procteced JWT Error',
            success:false
        })
    }
};

//admin access

export const isAdmin=async(req,res,next)=>{
    try {
        const user =await userModels.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'UnAuthrorized Access'
            })  
        }
        else{
            next()
        }        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:'Eroor in Admin Middlewaer',
            error
        })  
        
    }
}