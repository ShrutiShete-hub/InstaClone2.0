import React ,{useState,useRef}from 'react'
import "../style/Createpost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'
const Createpost = () => {
    const [caption, setCaption] = useState("")
    const postImageinputFieldRef=useRef(null)
    const navigate=useNavigate()
    const {loading,handleCreatePost}=usePost ()

    function handlesubmit(e){
        e.preventDefault()
        const file= postImageinputFieldRef.current.files[0]
        handleCreatePost(file,caption)
        navigate("/")
    }
    if(loading){
        return (
            <h1>Creating Post...</h1>
        )
    }
  return (
    <main className='create-post-page'>
        <div className='form-container'>
            <h1>Create post</h1>
            <form onSubmit={handlesubmit

            }>
                <label className="post-image-label"htmlFor="postImage">Select Image</label>
                <input ref={postImageinputFieldRef}hidden type="file" name="postImage" id="postImage"/>
                <input
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                 type="text" name="caption" id="caption" />
                <button className='button primary-button'> Create post</button>
            </form>
        </div>
    </main>
  )
}

export default Createpost
