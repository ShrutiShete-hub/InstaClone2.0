import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import Nav from '../components/Nav'
const Feed = () => {
    const{Feed,handleGetFeed,loading,handleLike,handleunLike}=usePost()
    useEffect(()=>{
        handleGetFeed()
    }, [])
    if(loading || !Feed){
        return(
            <main>
                <h1>Feed is Loading...</h1>
            </main>

        )
    }

  return (
    <main className='feed-page'> 
    <Nav/>
        <div className="feed">
           <div className="posts">
           {Feed.map(post=>{
            return <Post user={post.user} post={post}loading={loading} handleLike={handleLike}
            handleunLike={handleunLike}/>
           })}
           </div>
        </div>
    </main>
  )
}

export default Feed
