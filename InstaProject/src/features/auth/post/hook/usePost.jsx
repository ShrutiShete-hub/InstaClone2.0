import { getFeed,createPost ,likePost,unlikePost} from "../service/post.api";
import { useContext,useEffect } from "react";
import PostContext from "../post.context";
export const usePost=()=> {
const context= useContext(PostContext)
const {loading,setloading,Post,Feed,setFeed}=context;
const handleGetFeed= async ()=>{
    setloading(true);

    const data= await getFeed()
    setFeed(data.post)//setFeed(data.post.reverse())
    setloading(false)
}
const handleCreatePost= async(imageFile,caption)=>{
    setloading(true)
    const data= await  createPost(imageFile,caption)
    setFeed([data.post,...Feed])
    setloading(false)

}
const handleLike =async (post)=>{
 
   const data= await likePost(post)
   await handleGetFeed
  
   console.log(data)
}
const handleunLike =async (post)=>{
  
   const data= await unlikePost(post)
   await handleGetFeed()
   console.log(data)
   
}
useEffect(()=>{
    handleGetFeed()
},[])
return {loading,Feed,Post,handleGetFeed,handleCreatePost,handleLike,handleunLike}
}
