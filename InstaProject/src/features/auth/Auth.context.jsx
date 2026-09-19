import { createContext ,useState} from "react";
// import {login ,register } from "./services/auth.api.js"

 const AuthContext= createContext()
export function AuthProvider({children}){

   const [user, setuser] = useState(null)
   const [loading, setloading] = useState(false)

  
   
return (
    <AuthContext.Provider value={{user,setuser,loading,setloading}}>
        {children}
    </AuthContext.Provider>
)
   

} 
export default AuthContext