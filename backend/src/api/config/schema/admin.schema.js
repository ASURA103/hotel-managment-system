import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: [6, 'password less length'],
        required: true
    }
})

const admin = mongoose.model("admin",adminSchema)
admin.on("index", (err) => { if (err) console.error("admins index build failed (duplicate usernames?):", err.message) })

export default admin