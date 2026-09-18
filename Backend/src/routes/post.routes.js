const express= require("express")
const postRouter= express.Router()
const postController= require("../Controllers/post.controller")
const multer= require("multer")
const upload= multer({storage:multer.memoryStorage()})
const identifyUser= require("../middlewares/auth.middleware")

/*
Post -/api/posts [protected]
- req.body={caption,image-file}
 */

postRouter.post("/", upload.single("image"),identifyUser, postController.createPostController);
postRouter.get("/", identifyUser,postController.getPostController);
/*
GET /api/posts/details/:postid
-return an detail about specific post with the id ,also check whether the post belong to user that the request come from
 */
postRouter.post("/details/:postId", identifyUser,postController.getPostDetails);
postRouter.post("/like/:postId",identifyUser,postController.likePostController);
postRouter.post("/unlike/:postId",identifyUser,postController.unlikePostController);


postRouter.get("/feed",identifyUser,postController.getFeedController);
module.exports=postRouter