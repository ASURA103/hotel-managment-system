
import { AddAdmine, adminSignin, AllBookings, AllHotels, deleteHotel, sendWarning } from "../controller/admin_controller.js"
import authMiddleware from "../lib/authMiddleware.js"
import requireRole from "../lib/requireRole.js"

export default function adminRouter(router){
    const adminOnly = [authMiddleware, requireRole("admin")]
    router.post("/admin/signin",adminSignin)
    router.get("/admin/getallbookings",adminOnly,AllBookings)
    router.get("/admin/allhotels",adminOnly,AllHotels)
    router.delete("/admin/deleteHotel",adminOnly,deleteHotel)
    router.post("/admin/sendWarning",adminOnly,sendWarning)
    router.post("/admin/add",adminOnly,AddAdmine)
}
