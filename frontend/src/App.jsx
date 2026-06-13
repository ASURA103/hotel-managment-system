import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./Pages/Landing"
import UserAuth from "./Pages/userAuth"
import SellerAuth from "./Pages/SellerAuth"
import AddHotel from "./Pages/addHotel"
import SellerDashboard from "./Pages/SellerDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import AdminAuth from "./Pages/AdminAuth"
import Searchpage from "./Pages/searchpage"
import Book from "./Model/Book"
import UBookings from "./Pages/UBookings"
import Practice from "./Components/Practice"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
   
      <Route path="/" element={<Landing/>}/>
      <Route path="/user/auth" element={<UserAuth/>}/>
      <Route path="/seller/auth"  element={<SellerAuth/>} />
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/seller/add" element={<AddHotel />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />}  />
      <Route path="/admin/dashboard" element={<AdminDashboard />}  />
      <Route path="/search" element={<Searchpage />} />
      <Route path="/book" element={<Book  />} />
      <Route path="/bookings" element={<UBookings /> } />
      <Route path="/practice" element={<Practice /> } />
     </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
