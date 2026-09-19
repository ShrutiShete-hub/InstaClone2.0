require("dotenv").config()

const app= require("./src/app.js")
const connect=require("./src/config/Database.js")



connect();



app.listen(3000,()=>{
    console.log("Server is running")
})