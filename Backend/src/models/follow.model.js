const mongoose= require("mongoose");

const followSchema= new mongoose.Schema({
    follower:{
        type:String,
        ref:"users",
        required:[true,"Follower is required"]
    },
    followee:{
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        ref:"users",
        required:[true,"Following is required"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status can only be pending, accept or rejected"
        }
    }
},
    {
        timestamps:true
    })
    followSchema.index({follower:1, followee:1},{unique:true})

    const followModel=  mongoose.model("follows",followSchema)
    module.exports= followModel