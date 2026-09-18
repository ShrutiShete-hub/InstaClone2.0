// import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
 import {AuthProvider} from "./features/auth/Auth.context"
import { PostContextProvider } from "./features/auth/post/post.context"
import "./features/auth/style.scss"

function App() {
  return (

     <AuthProvider>
      <PostContextProvider>
     < AppRoutes />
     </PostContextProvider>
     </AuthProvider>
    //  <RouterProvider router={router}/>
  )
}

export default App