import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { B_URL } from '../../config.js';
import { toast, Toaster } from 'sonner';
import axios from "axios";

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state;
  const today =new Date().toISOString().split('T')[0]
  
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    rooms: 1,
    bill: "",
    RoomType: "",
    hotelId: hotel._id
  });
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/user/auth");
    }
  }, [navigate]);
  
  function handleChange(e, type) {
    setFormData({
      ...formData,
      [type]: e.target.value
    });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${B_URL}/user/bookH`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Hotel Booked Successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error while booking the hotel.");
      console.error("Error:", error);
    }
  }

  
  useEffect(() => {
    calculateBill();
  }, [formData.fromDate, formData.toDate, formData.rooms]);

  const calculateBill = () => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);

      if (toDate >= fromDate) {
        const days = (toDate - fromDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        const bill = days === 0 ? hotel.price * formData.rooms : days * hotel.price * formData.rooms;
        setFormData(prevFormData => ({
          ...prevFormData,
          bill: bill
        }));
      }
    }
  };

  return (
    <div className="w-screen h-full bg-gradient-to-r from-blue-500 to-teal-400 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-800">Book Your Stay at {hotel.name}</h1>
        <div className="flex justify-center">
          <img
            src={hotel.Image}
            alt={hotel.name}
            className="w-full h-[40vh] object-cover rounded-3xl shadow-lg"
          />
        </div>

        <div className="text-center text-lg text-gray-700">
          <p><strong>Area:</strong> {hotel.area}</p>
          <p><strong>City:</strong> {hotel.city}</p>
          <p><strong>State:</strong> {hotel.state}</p>
          <p><strong>Price:</strong> ₹{hotel.price} per night</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-600">Check-in Date</label>
              <input
                type="date"
                id="fromDate"
                min={today}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e, "fromDate")}
              />
            </div>
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-600">Check-out Date</label>
              <input
                type="date"
                id="toDate"
                min={today}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e, "toDate")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-600">Number of Rooms</label>
            <input
              type="number"
              id="rooms"
              min="1"
              defaultValue="1"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(e, "rooms")}
            />
          </div>
          <div className="relative">
            <label htmlFor="bill" className="block text-sm font-medium text-gray-600">Total Bill</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-600  text-[20px] mt-7 ">₹</span>
            </div>
            <input
              type="number"
              id="bill"
              value={formData.bill}
              readOnly
              className="w-full pl-6 p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label htmlFor="RoomType" className="block text-sm font-medium text-gray-600">Room Type</label>
            <select
              id="RoomType"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(e, "RoomType")}
            >
              <option value="">Select Room Type</option>
              <option value="AC">AC</option>
              <option value="NonAc">NonAC</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>

      <Toaster />
    </div>
  );
};

export default Book;
