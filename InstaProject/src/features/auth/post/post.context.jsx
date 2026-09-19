import { createContext } from "react";
import { useState } from "react";
const PostContext =createContext();

export const PostContextProvider=({children})=>{
     const [loading, setloading]= useState(false);
     const [Post, setPost] = useState(null)
     const [Feed, setFeed] = useState(null)
     return (
        <PostContext.Provider value={{loading,setloading,Post,setPost,Feed,setFeed}}>
            {children}
        </PostContext.Provider>
     )
}

export default PostContext
    
