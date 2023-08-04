import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import { isAuthenticated } from "../middlewares/auth.js";

   
export const getAllUsers =  async (req,res) => {

    const users = await User.find({});


    res.json({
        sucess : true,
        users : users,
    })
}

export const register =  async (req,res) => {

    const {name,email,password} = req.body;
    let user = await User.findOne({email});

    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exits",
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    // when key value pair is same so we write in this way...
    user = await User.create({
        name,
        email,
        password : hashedPassword
    });
    sendCookie(user,res,"registered successfully" , 201)
}

export const login = async(req,res) => {
    const {email,password} = req.body;

    let user = await User.findOne({email}).select("+password"); // in model of user we have specified  select as false

    if(!user){
        return res.status(404).json({
            success: false,
            message:"Invalid email or Password",
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({
            success: false,
            message:"Invalid email or Password",
        })
    }

    sendCookie(user,res,`welcome back, ${user.name}`,200);
}

export const getMyDetails =  (req,res) => {
 
    // const { token } = req.cookies;
    
    // console.log(token);

    // if(!token){
    //     return res.status(404).json({
    //         success: false,
    //         message:"Login first",
    //     })
    // }

    // const decoded = jwt.verify(token,process.env.JWT_SECRET)

    // const user = await User.findById(decoded._id)

    res.status(200).json({
        success : true,
        user : req.user,
    })
}


export const logout = (req,res) => {
    res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
        success : true,
        user : req.user,
    })
}
