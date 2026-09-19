const express= require("express")
const cookie= require("cookie-parser")
const cors= require("cors")
/*require Routes */


const authRoutes=require("./routes/auth.routes")
const postRoutes= require("./routes/post.routes")
const userRoutes= require("./routes/user.routes")

const app= express();
app.use(express.json())
app.use(cookie())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
/* using Routes */

app.use("/auth/api",authRoutes)
app.use("/post/api",postRoutes)
app.use("/user/api",userRoutes)
module.exports=app