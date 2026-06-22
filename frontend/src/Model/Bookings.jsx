import axios from "axios";
import React, { useEffect, useState } from "react";
import { B_URL } from "../../config.js";

const Bookings = () => {
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

        console.log(response.data);

        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error while checking Bookings");
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  return (
    <div
      className="
        min-h-screen
        p-4 md:p-8

        bg-gradient-to-br
        from-sky-50
        via-white
        to-cyan-50

        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950

        transition-all duration-300
      "
    >
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">
          Hotel Bookings
        </h1>

        {!loading && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Total Bookings :{" "}
            <span className="font-bold text-blue-600">
              {booking.length}
            </span>
          </p>
        )}
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex flex-col items-center justify-center pt-20">
          <div
            className="
              w-14 h-14

              border-4
              border-blue-200
              border-t-blue-600

              rounded-full

              animate-spin
            "
          ></div>

          <h1 className="mt-5 text-lg font-semibold text-gray-600 dark:text-gray-300">
            Loading Bookings...
          </h1>
        </div>
      ) : booking.length === 0 ? (
        <div
          className="
            bg-white dark:bg-slate-900

            rounded-3xl

            shadow-xl

            p-10

            text-center
          "
        >
          <h2 className="text-3xl font-bold text-slate-700 dark:text-white">
            No Bookings Found
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Customers haven't booked your hotels yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {booking.map((book) => (
            <div
              key={book._id}
              className="
                bg-white
                dark:bg-slate-900

                rounded-3xl

                shadow-xl

                overflow-hidden

                border
                border-gray-200
                dark:border-slate-700

                hover:shadow-2xl
                hover:-translate-y-1

                transition-all duration-300
              "
            >
              {/* Image */}

              <img
                src={book.hotelId[0].Image}
                alt={book.hotelId[0].name}
                className="
                  w-full
                  h-56

                  object-cover

                  hover:scale-105

                  transition-all duration-500
                "
              />

              <div className="p-6">
                {/* Hotel Name */}

                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                  {book.hotelId[0].name}
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Booking ID : {book._id}
                </p>

                {/* Customer */}

                <div
                  className="
                    mt-5

                    p-4

                    rounded-2xl

                    bg-slate-50
                    dark:bg-slate-800
                  "
                >
                  <h3 className="font-bold text-lg text-slate-700 dark:text-white mb-2">
                    Customer Details
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    Name : {book.bookedBy[0].name}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300">
                    Email : {book.bookedBy[0].email}
                  </p>
                </div>

                {/* Booking Details */}

                <div
                  className="
                    mt-5

                    grid grid-cols-2 gap-4
                  "
                >
                  <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Check In
                    </p>

                    <p className="font-bold text-slate-800 dark:text-white">
                      {book.fromDate.slice(0, 10)}
                    </p>
                  </div>

                  <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Check Out
                    </p>

                    <p className="font-bold text-slate-800 dark:text-white">
                      {book.toDate.slice(0, 10)}
                    </p>
                  </div>

                  <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rooms
                    </p>

                    <p className="font-bold text-slate-800 dark:text-white">
                      {book.rooms}
                    </p>
                  </div>

                  <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Room Type
                    </p>

                    <p className="font-bold text-slate-800 dark:text-white">
                      {book.RoomType}
                    </p>
                  </div>
                </div>

                {/* Bill */}

                <div
                  className="
                    mt-5

                    flex justify-between items-center

                    bg-green-50
                    dark:bg-green-900/20

                    px-5 py-4

                    rounded-2xl
                  "
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Bill
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹ {book.bill}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;