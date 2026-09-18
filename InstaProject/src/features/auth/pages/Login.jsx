import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
// import axios from 'axios'
import {useAuth} from "../hooks/useAuth"


const Login = () => {

    const [ userName, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const {handleLogin,loading}=useAuth()
    const navigate= useNavigate()

    if(loading){
        return(
            <main>
            <h1><Loading styleName="form-loading"></Loading></h1>
            </main>
        )
    }
    const handleSubmit = async(e)=> {
        e.preventDefault()
        await handleLogin(userName,password);

         navigate("/");
//    .then(res=>{
//     console.log(res);
//    })
    }
    
    //     axios.post("http://localhost:3000/auth/api/login", {
    //         userName,
    //         password,
    //     }, 
    //     { withCredentials: true }
    // )
    //         .then(res => {
    //             console.log(res.data)
    //         })


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login