import mongoose, {Schema} from "mongoose";
 
const bookingsSchema= new mongoose.Schema({
    fromDate :{
        type: Date,
        required: true
    },
    toDate:{
        type: Date,
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    bill:{
        type: Number,
        required: true
    },
    RoomType: {
        type: String,
        required: true
    },
    bookedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    hotelId: [{
        type: Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    }]
})

// Availability lookups (per hotel, room type and date range) and "my bookings".
bookingsSchema.index({ hotelId: 1, RoomType: 1, fromDate: 1, toDate: 1 })
bookingsSchema.index({ bookedBy: 1 })

const bookings = mongoose.model("bookings",bookingsSchema)
bookings.on("index", (err) => { if (err) console.error("bookings index build failed:", err.message) })

export default bookings