import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6

    },
})

const user = mongoose.model("users",userSchema)
user.on("index", (err) => { if (err) console.error("users index build failed (duplicate emails in the database?):", err.message) })

export default user