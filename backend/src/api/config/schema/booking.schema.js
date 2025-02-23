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

const bookings = mongoose.model("bookings",bookingsSchema)

export default bookings