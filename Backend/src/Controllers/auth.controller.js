const jwt=require("jsonwebtoken")
const userModel= require("../models/user.model")
//  const crypto= require("crypto")
const bcrypt= require("bcryptjs");


async function registerController (req,res){
    const {userName,email,password,bio,profileImage}=req.body
    // const isUserExistByEmail= await userModel.findOne({email})
    // if(isUserExistByEmail){
    //     res.status(409).json({
    //         message:"Already user email exist"
    //     })
    // }
    //  const isUserExistByName= await userModel.findOne({name})
    // if(isUserExistByName){
    //     res.status(409).json({
    //         message:"Already user name exist"
    //     })
    // }
    const isUserALreadyExist=await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })
    if (isUserALreadyExist) {
    return res.status(409).json({
        message:
            isUserALreadyExist.email === email
                ? "Email already exists"
                : "Username already exists"
    });
}
    //  const hash= crypto.createHash("sha256").update(password).digest("hex")
    const hash=  await bcrypt.hash(password,10) 

    const user= await userModel.create({
        userName,
        email,
        bio,
        profileImage,
        password:hash

    })
    const token= jwt.sign({
        id:user._id,
        userName:user.userName
    },
    process.env.JWT_SECRET,
    // {
    //     expiresIn:"7d"
    // }
   
)
res.cookie("token",token)
res.status(201).json({
    user:{
        email:user.email,
        userName:user.userName,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}


async function loginController (req,res){
    const { userName, email, password ,profileImage} = req.body;

    const user= await userModel.findOne({
        $or:[
            //condition
            {userName:userName},
            {email:email}
        ]
    }).select("+password")
    
    if(!user){
        return res.status(404).json({
            message:"user not found"
        });
    }
    // const hash= crypto.createHash("sha256").update(password).digest("hex")
    // const isPassword= hash==user.password

    const isPassword=await bcrypt.compare(password,user.password)
    if(!isPassword){
        return res.status(401).json({
            message:"Password Invalid"
        });
    }
    const token= jwt.sign({
        id:user._id,
        userName:user.userName
    },
    process.env.JWT_SECRET,
    // {
    //     expiresIn:"7d"
    // }
)
    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            userName:user.userName,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage

        }
    })
}
async function getMeController(req,res){
    const userId= req.user.id
    const user= await userModel.findById(userId)
    res.status(200).json({
        user:{
            userName:user.userName,
            email:user.email,
            bio:user.bio
        }
    })

}
module.exports = {
    registerController,
    loginController,
    getMeController
};