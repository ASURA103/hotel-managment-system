import authMiddleware from "../lib/authMiddleware.js"
import requireRole from "../lib/requireRole.js"
import { addHotel, updateHotel, getHotels, delHotel } from "../controller/hotel_controller.js"
import { hotelBookings, ownerSignin, ownerSignup } from "../controller/owner_controller.js"
import { upload } from "../model/hotel.model.js"



export default function ownerRouter(router){
    const ownerOnly = [authMiddleware, requireRole("owner")]
    const multiple = [...ownerOnly, upload.single('file')]
    router.post("/owner/signup",ownerSignup)
    router.post("/owner/signin",ownerSignin)
    router.post("/owner/addhotel",multiple,addHotel)
    router.put("/owner/updatehotel",multiple,updateHotel)
    router.get("/owner/getHotels",ownerOnly,getHotels)
    router.delete("/owner/delHotel",ownerOnly,delHotel)
    router.get("/owner/bookings",ownerOnly,hotelBookings)

}
