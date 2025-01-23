import { Signin, Signup } from "../controller/user_controller.js";
import { searchHotel, myBookings, bookHotel } from "../controller/hotel_controller.js";
import authMiddleware from "../lib/authMiddleware.js";

export default function userRouter(router) {
  router.post("/user/signup", Signup);
  router.post("/user/signin", Signin);
  router.post("/user/searchHotel", searchHotel);
  router.get("/user/mybookings", authMiddleware, myBookings);
  router.post("/user/bookH", authMiddleware, bookHotel );
}
