import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelList from "./HotelList.jsx";

const SellerDashboard = () => {
  const navigate = useNavigate();
  
  useEffect (() =>{
    if(!localStorage.getItem("token") || localStorage.getItem("userType") !== "owner"){
      navigate("/seller/auth")
    }
  })
  
  function addhotel() {
    navigate("/seller/add");
  }

  function dash() {
    navigate("/seller/dashboard");
  }
  function edit() {
    navigate("/seller/edit");
  }


  function Landing() {
    navigate("/");
  }
  return (
    <div className="p-2  h-[100vh] flex">
      <nav className="block  bg-gray-500 w-[20vh] shadow-lg shadow-current   rounded-md p-3">
        <div className="text-center  mb-3   " onClick={Landing}>
          <i className="  bg-black text-white hover:bg-white hover:text-black  font-extrabold text-4xl cursor-pointer rounded-md shadow-lg shadow-current px-1">
            Home
          </i>
        </div>

        <div className="">
          <i
            className=" bg-black text-white hover:bg-white hover:text-black   cursor-pointer text-2xl font-extrabold shadow-md shadow-current rounded-md "
            onClick={dash}
          >
            Dashboard
          </i>
        </div>

        <div className="m-1 mt-3">
          <b className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1 cursor-pointer shadow-md font-bold " onClick={addhotel}>
            addhotel{" "}
          </b>
        </div>
        <div className="m-1">
          <b className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1  cursor-pointer shadow-md font-bold " onClick={edit}>
            Hotels Bookings{" "}
          </b>
        </div>
        <div className="m-1">
          <b className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1  cursor-pointer shadow-md font-bold " >
            My Hotels{" "}
          </b>
        </div>

      </nav>
      <div className=" w-[100%] bg-[#023e8a] ml-3 border-4 shadow-lg shadow-current rounded-md ">
      <HotelList />
      </div>
    </div>
  );
};
export default SellerDashboard;
