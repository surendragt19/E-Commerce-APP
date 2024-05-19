import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModels.js'
import jwt from 'jsonwebtoken'


//registraion
export const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body;
        //validation
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'email is Required'})
        }
        if(!password){
            return res.send({message:'password is Required'})
        }
        if(!phone){
            return res.send({message:'phone is Required'})
        }
        if(!address){
            return res.send({message:'address is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }
        //check user
        const exestingUser=await userModel.findOne({email})
        //exesting user
        if(exestingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login!!'
            })
        }
        //register user
        const hanshedPassword=await hashPassword(password)
        //save
        const user=await new userModel({name,email,phone,address,answer,password:hanshedPassword}).save()
        res.status(201).send({
            success:true,
            message:'Regisstraion SuccesFull !!',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succsess:false,
            message:'Eroor in Registration',
            error
        })
    }
}




//login 
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;

        //validation
        if(!email || !password){
            return res.status(400).send({
                succsess:false,
                message:'Invalid  Username or Password',
                error
            })
        }
        //check user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                succsess:false,
                message:'Email not registered',
            })            
        }
        //Password Compare Hash
        const matchPasswd=await comparePassword(password,user.password)
        if(!matchPasswd){
            return res.status(200).send({
                succsess:false,
                message:'Invalid Password',
            })
        }

        //token
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
        res.status(201).send({
            success:true,
            message:'Login SuccesFull !!',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succsess:false,
            message:'Eroor in login',
            error
        })
        
    }
}


//test
export const testColntroller=(req,res)=>{
   try {
    res.status(200).send({
        msg:'Procteced JWT',
        success:true
    })
    
   } catch (error) {
    console.log(error)
    res.status(400).send({
        msg:'Error in Token',
        success:false
    })
    
   }
}


//forget password

export const forgetController=async(req,res)=>{
    try {
        const [email,answer,newPassword]=req.body
        if(!email){
            res.staus(400).send({msg:'Email is Require'})
        }
        if(!answer){
            res.staus(400).send({msg:'Answer is Require'})
        }
        if(!newPassword){
            res.staus(400).send({msg:'New Password is Require'})
        }
        //chceck validation
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.staus(400).send({
                msg:'Wrong Email or Answer',
            })
        }
        const hashed=await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user,_id ,{password:hashed})
        res.status(200).send({
            msg:"Pass",
            success:true
        })
        }

     catch (error) {
        console.log(error)
        res.status(500).send({
            msg:'Someting went wrong',
            success:false,
            error
        })
        
    }
}

//auth protect
export const userProtect=(req,res)=>{
    try {
        res.status(200).send({ok:true});
    } catch (error) {
     console.log(error)
     res.status(400).send({
         msg:'Error in Auth Protected Route',
         success:false
     })
     
    }
 }

