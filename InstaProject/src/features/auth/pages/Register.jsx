import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const {handleRegister,loading}=useAuth()

    const [ userName, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate= useNavigate()
    async function handleSubmit(e){

        e.preventDefault()
       await handleRegister(userName,email,password)
       navigate("/")
    }
        if(loading){
            return (<main>
                <h1>Loading.....</h1>
            </main>)
        }
    
    

    //     axios.post("http://localhost:3000/auth/api/register",{
    //         userName ,
    //         email,
    //         password,
    //     },{
    //         withCredentials:true
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //      .catch(err => {
    //     console.log(err.response);

    //     if (err.response?.status === 409) {
    //         alert(err.response.data.message); // ✅ shows backend message
    //     } else {
    //         alert("Something went wrong ❌");
    //     }
    // });
    

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        type="text"
                        name='email'
                        placeholder='Enter email' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button>Register</button>
                </form>

                <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register