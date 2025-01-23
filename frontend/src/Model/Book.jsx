import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { B_URL } from '../../config.js';
import { toast, Toaster } from 'sonner';

const Book = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hotel = location.state
    const [formData,setFormData] =useState({
       fromDate:"",
       toDate:"",
       rooms:"",
       RoomType:""

    })
    useEffect(()=>{
        if(!localStorage.getItem("token")){
        
            navigate("/user/auth")
        }

    })
     function handleChange(e,type){
        setFormData(
            {
                ...formData,
                [type]: e.target.value
            }
        )

     }
     async function handleSubmit(){
        try{
        const response = await axios.post(`${B_URL}/user/bookH`,formData)
        toast.success("Hotel Booked Successful")
        setTimeout(()=>{
            navigate("/")
        },2000)
    }catch(error){
        toast.error("Invalid credentials")
        console.log("error while booking hotel".error)
    }
     }
    

  return (
    <div className=' w-screen h-full pt-4'>
    <div className=" bg-[#00b4d8] px-4 pb-4  rounded-[10vh] shadow-lg shadow-[#03045e] text-white w-[100vh] justify-self-center  ">
        <h1 className='text-center text-4xl font-extrabold'> BOOK HOTEL {hotel.name}</h1>
        <div>
            <img src={hotel.Image} alt={hotel.name} className='w-full h-[50vh] rounded-t-[7vh]' />
        </div>
      <h1>Chek Booking Details for {hotel.name}</h1>
      <p>Area: {hotel.area}</p>
      <p>City: {hotel.city}</p>
      <p>State: {hotel.state}</p>
      <p>Price: ₹{hotel.price} per night</p>
      <div>
      <form className=" rounded-[10vh] w-full  content-center ">
        <div className=" flex justify-between border-[#03045e] border w-full">
          <div className=" w-full">
            <label className="  cursor-pointer   text-sm font-medium   " htmlFor="date">
              From{" "}
            </label>
            <input
              type="date"
              id="date"
              className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) =>handleChange(e, "fromDate")}
            />
          </div>
          <div className=" w-full">
            <label className="  cursor-pointer   text-sm font-medium   " htmlFor="date">
              To{" "}
            </label>
            <input
              type="date"
              id="date"
              className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) =>handleChange(e, "toDate")}
            />
          </div>
        </div>
        <div className="border-[#03045e] border  w-full ">
          <label className="  cursor-pointer text-sm font-medium   " htmlFor="rooms">
            Number of Rooms{" "}
          </label>
          <input
            type="number"
            id="rooms"
            min={1}
            defaultValue={1}
            className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>handleChange(e, "rooms")}
          />
        </div>
        <div className="border-[#03045e] border  w-full ">
          <label className="  cursor-pointer text-sm font-medium   " htmlFor="type">
            Room Type{" "}
          </label>
          <select
            className=" bg-[#00b4d8]"
            name=""
            id="type"
            onChange={(e) =>handleChange(e, "RoomType")}
          >
            <option value="">Select</option>
            <option value="AC">AC</option>
            <option value="NonAc">NonAc</option>
          </select>
        </div>
        <div className='justify-self-center'>
        <button
          type="submit"
          className=" border-2 border-black  mt-2  h-[35px] rounded-[20vh] px-2 flex justify-center text-2xl     shadow-md hover:shadow-current   font-medium text-white bg-blue-700 hover:bg-[#03045e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={ handleSubmit}
        >
          Confirm{" "}
        </button>
        </div>
      </form>
    </div>
    </div>
    <Toaster />
    </div>
  )
}

export default Book