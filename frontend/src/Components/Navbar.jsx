import React from "react"
import { useNavigate } from "react-router-dom"
import { VscAccount } from "react-icons/vsc"
import { FaHotel } from "react-icons/fa6"
import h from "/L6.jpg"



const Navbar = () => {
  const navigate = useNavigate();
  function userauth() {
    navigate("user/auth");
  }
  function seller(params) {
    navigate("seller/auth")
  }
  function Landing() {
    navigate("/");
  }
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.reload()
    navigate("/")
  }

  return (
    <div>
      <nav className="z-1 fixed rounded-full mt-2 mx-1 h-[7vh] shadow-md shadow-current w-[100%] bg-cover  " style={{ backgroundImage: `url(${h})`, height: ``, width: `` }}>
        <div className="flex justify-between mb-4  items-center w-full px-3  h-full  ">
          <div
            className="font-extrabold text-4xl cursor-pointer "
            onClick={Landing}
          >
            <i className="text-blue-700">DreamStay</i>
          </div>
           <div onClick={seller} className="cursor-pointer flex shadow-md shadow-current items-center px-2  justify-center text-center hover:bg-green-300" >
            <FaHotel className="text-4xl text-blue-600 mr-1" />
            <div className="block">
            <h1 className=" text-2xl"><b>List Your Properety</b></h1>
            <p className="text-gray-500" >Grow Your Business!</p>
            </div>
           </div>

          <div>
            {localStorage.getItem("token") ? (
              <div className="w-10 h-10 shadow-lg pl-5 text-2xl shadow-current border-blue-700 rounded-full bg-blue-500 flex justify-center cursor-pointer items-center ">
                {localStorage.getItem("name").split("")[0].toUpperCase()}
                <div className="  mt-5 pt-5 w-full h-full  hover:bg-opacity-100 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {" "}
                  <button
                    onClick={handleLogout}
                    className=" shadow-md  shadow-current px-1 py-1 mt-5  mr-4 bg-black  border cursor-pointer rounded-md  text-white  "
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-4xl  shadow-md  shadow-current  rounded-full float-right  cursor-pointer ">
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
