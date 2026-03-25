import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({sucess:false,message:'Missing Details'})
        }
        const salt=await bcrypt.genSalt(10)
        const hashsedPassword=await bcrypt.hash(password,salt);
        const userdata={
            name,
            email,
            password:hashsedPassword
        }
        const newUser=new userModel(userdata)
        const user=await newUser.save()
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({sucess:true,token,user:{name:user.name}})
    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }
}
const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({sucess:false,message:'User does not exit'})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(ismatch){
            const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({sucess:true,token,user:{name:user.name}})
        }
        else{
            return res({sucess:false,message:'Invalid credentials'})
        }
        
    }
    catch(error){
        console.log(error)
        res.json({sucess:false,message:error.message})
    }
}