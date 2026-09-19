const mongoose= require("mongoose")
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        unique:[true,"user already exist"],
        required:[true,"UserName required"]
    },
    email:{
        type:String,
        unique:[true,"Email already exist"],
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"password required"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/yx2zqav6q/test_7W5N3sSva?updatedAt=1772794760468"
    },
   

})
const userModel= mongoose.model("users",userSchema)
module.exports=userModel;