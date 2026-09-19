const mongoose= require("mongoose");
async function connectToDB(){
    
    await mongoose.connect(process.env.MONGO_DB)
    console.log("Connected to MongoDB");
}
module.exports=connectToDB