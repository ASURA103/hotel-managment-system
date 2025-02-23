import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { B_URL } from "../../config.js";

const Bookings = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${B_URL}/owner/bookings`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.log(" error while cheking Bookings");
      }
    };

    fetchBooking();
  }, []);
  console.log("Bookings", booking);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Hotel Bookings</h1>
     { loading ?(
      <h1>Loading... </h1>) :(
      <div className="grid grid-cols-1 gap-4">
        <h1>NO of Bookings Found is {booking.length} </h1>
        {booking.map((book) => (
          <div key={book._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-semibold text-lg">{book.hotelId[0].name}</h3>
            <p className="text-gray-600">Booking ID: {book._id}</p>
            <p className="text-gray-600">
              Customer Name: {book.bookedBy[0].name}
            </p>
            <p className="text-gray-600">Check-in: {book.fromDate}</p>
            <p className="text-gray-600">Check-out: {book.toDate}</p>
            <p className="text-gray-600">Check-out: {book.rooms}</p>
            <p className="text-gray-600">Check-out: {book.RoomType}</p>
          </div>
        ))}
      </div>
      )
    }
    </div>
  );
};
export default Bookings;
