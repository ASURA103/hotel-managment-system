import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    idProof:{
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

const owner = mongoose.model("owner",ownerSchema)
owner.on("index", (err) => { if (err) console.error("owners index build failed (duplicate emails in the database?):", err.message) })
export default owner