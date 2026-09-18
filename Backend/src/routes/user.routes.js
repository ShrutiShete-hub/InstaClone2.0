const express= require("express");
const userController= require("../Controllers/user.controller")
const  userRouter= express.Router();
const identifyUser= require("../middlewares/auth.middleware")
// @route Post /api/user/follow/:userid
//@description Follow a user
//@access Private 
userRouter.post("/follow/:userName", identifyUser,userController.followUserController)
userRouter.post("/unfollow/:userName", identifyUser,userController.unfollowUserController)




module.exports=userRouter

