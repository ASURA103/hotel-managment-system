import { Signin, Signup } from "../controller/user_controller.js";
import { searchHotel, myBookings, bookHotel, listHotels } from "../controller/hotel_controller.js";
import authMiddleware from "../lib/authMiddleware.js";
import requireRole from "../lib/requireRole.js";

export default function userRouter(router) {
  const guest = [authMiddleware, requireRole("user")];
  router.post("/user/signup", Signup);
  router.post("/user/signin", Signin);
  router.post("/user/searchHotel", searchHotel);
  router.get("/user/hotels", listHotels);
  router.get("/user/mybookings", guest, myBookings);
  router.post("/user/bookH", guest, bookHotel );
}
