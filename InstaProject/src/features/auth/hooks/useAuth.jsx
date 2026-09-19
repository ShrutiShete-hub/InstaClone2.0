import {useContext} from "react"
import AuthContext from "../Auth.context.jsx"
import {login,register,getMe} from "../services/auth.api.js";

export function useAuth(){
    const context = useContext(AuthContext)

    const {user, setuser,loading,setloading}=context

    const handleLogin=async (email,password)=>{
        setloading(true)
        
       const response= await login(email,password)
       setuser(response.user)
           setloading(false)
        }
       
    
    
      
   const handleRegister =async (userName,email,password)=>{
        setloading(true)
       const response= await register(userName,email,password)
       setuser(response.user)
       
           setloading(false)
       }
    
      
    
const handlegetMe =async (userName,email,password)=>{
        setloading(true)
       const response= await getMe(userName,email,password)
       setuser(response.user)
       
           setloading(false)
       }
    return {
        user,loading,handleLogin,handleRegister,handlegetMe
    }
    }
    
