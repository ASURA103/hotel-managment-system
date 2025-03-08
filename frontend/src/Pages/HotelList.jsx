import React, { useEffect, useState } from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import { TbDatabaseEdit } from "react-icons/tb";
import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${B_URL}/owner/gethotels`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels", error);
      }
    };

    fetchHotels();
  }, []);
console.log("hotels",hotels)
  const delHotel = async () => {
    try {
      await axios.delete(`${B_URL}/owner/delHotel`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const response = await axios.get(`${B_URL}/owner/gethotels`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setHotels(response.data);
    } catch (error) {
      console.error("Error while deleting hotel", error);
    }
  };

  const Edit = (hotel) => {
    setCurrentHotel(hotel);
    setFormData(hotel);
    console.log("formData", formData);
    setIsDialogOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="hotel-list flex space-x-4 m-4">
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="hotel-card block bg-[#e5e5e5] text-[#000000] p-2 rounded-xl  shadow-md shadow-current"
        > 
          <div > 
          <img src={hotel.Image} alt={hotel.name} className="w-[40vh] h-[30vh] rounded-xl "/>
          </div>
          <div className="flex text-4xl  rounded-md justify-between px-2 shadow-lg shadow-[#14213d]  mb-4  ">
            <div className="cursor-pointer ">
              <TbDatabaseEdit onClick={Edit}  className="text-[#fca311] "/>
            </div>
            <div className="">
              <i className="font-extrabold text-2xl ">{hotel.name}</i>
            </div>
            <div className="float-right ">
              <FcDeleteDatabase className="cursor-pointer text-[#fca311] " onClick={delHotel} />
            </div>
          </div>
          <div className="font-bold">
            <p>Area: {hotel.area}</p>
            <p>City: {hotel.city}</p>
            <p>State: {hotel.state}</p>
            <p>Price: Rs {hotel.price}</p>
            <p>Unmarried Friendly: {hotel.unmarriedFriendly ? "Yes" : "No"}</p>
            <p>AC Rooms Available: {hotel.AcRoomA ? "Yes" : "No"}</p>
            <p>Non-AC Rooms Available: {hotel.NonAcRoomA ? "Yes" : "No"}</p>
            <p>Total AC Rooms: {hotel.TotalAc}</p>
            <p>Total Non-AC Rooms: {hotel.TotalNonAc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
