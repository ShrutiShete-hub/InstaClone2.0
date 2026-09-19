const postModel= require("../models/post.model")
const ImageKit= require("@imagekit/nodejs/index.js")
const {toFile}= require("@imagekit/nodejs/index.js")
const likeModel= require("../models/like.model")

const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KIT
})



async function createPostController(req, res) {
    console.log(req.body, req.file);

    //  const token= req.cookies.token;
    //  if(!token){
    //     return res.status(401).json({
    //         message:"Token not provided unauthorized access"
    //     })
    //  }
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "cohort-2-insta-clone-posts" // nested folders banane ke liye last me / laga do
    });
//     let decoded
// try{
//    decoded= jwt.verify(token,process.env.JWT_SECRET)
// }
// catch(err){
//     return res.status(401).json({
//         message:"Unauthorized user"
//     })
// }
// console.log(decoded)
    const post = await postModel.create({
        caption: req.body.caption,
        image_url: file.url,    // use schema field name
         user: req.user.id
    });

  
    res.status(201).json({
        message: "Post created successfully",
        post
    });
}

async function getPostController(req,res){
    // const token= req.cookies.token
    // if(!token){
    //     return res.status(401).json({
    //         message:"unAuthorized Access"
    //     })
    // }
    // let decoded;
    // try{
    //     decoded= jwt.verify(token,process.env.JWT_SECRET)
    // }
    // catch(err){
    //     return res.status(401).json({
    //         message:"Token Invalid"
    //     })
    // }
// const userId= decoded.id
const userId= req.user.id
const posts= await postModel.find({
    user:userId
})

if(!posts){
    res.status(404).json({
        message:"Post not found"
    })
}
res.status(200).json({
    message:"Post fetched Successfully",
    posts
})
}

async function getPostDetails(req, res) {
    const userId= req.user.id

//   const token= req.cookies.token
    // if(!token){
    //     return res.status(401).json({
    //         message:"unAuthorized Access"
    //     })
    // }
    //  let decoded;
    // try{
    //     decoded= jwt.verify(token,process.env.JWT_SECRET)
    // }
    // catch(err){
    //     return res.status(401).json({
    //         message:" Invalid token"
    //     })
    // }
    
    // const userId = decoded.id;
    
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isValidUser = post.user.toString() === userId.toString();
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content"
        });
    }
    // return details if desired
    return res.status(200).json({
        message:"post fetched successfully",
         post });
}
async function likePostController(req, res) {

    const username = req.user.userName
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}
async function getFeedController(req,res){
    const user= req.user
    const posts= await Promise.all( (await (await postModel.find({})).sort({_id:-1}).populate("user").lean())
   .map(async(post)=>{

    const isLiked= await likeModel.findOne({
        user:user.userName,
        post:post._id
    })

    post.isLiked=!!isLiked
    return post
   }))
   
    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}
async function unlikePostController(req,res){
   const postId= req.params
   const username=  req.user.username
   
   const isLiked = await likeModel.findOne({
    post:postId,
    user:username
   })
   if(!isLiked){
    return res.status(400).json({
        message:"post didn't like"
    })
   }
   await likeModel.findOneAndDelete({_id:isLiked._id})
   return res.status(200).json({
    message:"unliked post"
   })
}

module.exports={
    createPostController,
    getPostController,
    getPostDetails,
    likePostController,
    getFeedController,
    unlikePostController
}