import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed  from "./features/auth/post/page/Feed"
import CreatePost from "./features/auth/post/page/Createpost"
// export const routes=createBrowserRouter([
//     {
//     path:'/login',
//     element:(<Login/>)
// },
// {
//     path:'/register',
//     element:(<Register/>)
// },
// ])

function AppRoutes(){
    return (
   
        <BrowserRouter>
        <div>Hello</div>
           <Routes>
            <Route path="/create-post" element={CreatePost}></Route>
            <Route path="/" element={<Feed/>}></Route>
            <Route path='/login'element={<Login/>}/>
            <Route path='/register'element={<Register/>}/>
           </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes