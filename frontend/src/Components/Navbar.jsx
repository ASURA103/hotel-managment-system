import React from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaHotel } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  function userauth() {
    navigate("user/auth");
  }

  function seller() {
    navigate("seller/auth");
  }

  function Landing() {
    navigate("/");
  }

  function handleLogout() {
    localStorage.clear()
    window.location.reload();
    navigate("/");
  }

  return (
    <div className="z-10 fixed w-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div
          className="text-white text-4xl font-extrabold cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={Landing}
        >
          Dream<span className="text-yellow-300">Stay</span>
        </div>

        {/* Menu & List Property Section */}
        <div className="flex items-center space-x-8">
          <div
            onClick={seller}
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <FaHotel className="text-3xl mr-2" />
            <div>
              <h1 className="text-xl font-semibold">List Your Property</h1>
              <p className="text-sm text-gray-500">Grow Your Business!</p>
            </div>
          </div>

          {/* User Authentication / Profile Section */}
          <div>
            
            {localStorage.getItem("token") && localStorage.getItem("type") === "user" ? (
                <div className='flex gap-4 cursor-pointer items-center relative group '>
                 <div className=' w-32 h-12 font-primary font-bold rounded-3xl flex items-center justify-center text-lg' onClick={()=>{navigate("/bookings")}}>
                   My Bookings
                  </div>  
                <div className="w-12 h-12 bg-[#03045e] text-white text-2xl font-bold rounded-full flex items-center justify-center cursor-pointer">
                  {localStorage.getItem("name").split(" ")[0].charAt(0).toUpperCase()}
                </div>
                <div className="absolute top-14 left-0 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-b-lg w-full hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-white text-3xl cursor-pointer hover:scale-110 transition-transform duration-300">
                <VscAccount onClick={userauth} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
