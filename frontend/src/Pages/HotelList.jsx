import React, { useEffect, useState } from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import { TbDatabaseEdit } from "react-icons/tb";
import { FcDeleteDatabase } from "react-icons/fc";

const HotelList = () => {
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

  console.log("hotels", hotels);

  const delHotel = async () => {
    try {
      await axios.delete(`${B_URL}/owner/delHotel`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

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
    "
    >
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">
          My Hotels
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Total Hotels :
          <span className="font-bold text-blue-600 ml-2">
            {hotels.length}
          </span>
        </p>
      </div>

      {/* Hotels */}

      <div
        className="
        grid

        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3

        gap-8
      "
      >
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="
            bg-white
            dark:bg-slate-900

            rounded-3xl

            overflow-hidden

            shadow-xl

            border
            border-gray-200
            dark:border-slate-700

            hover:-translate-y-2
            hover:shadow-2xl

            transition-all
            duration-300
          "
          >
            {/* Image */}

            <div className="overflow-hidden">
              <img
                src={hotel.Image}
                alt={hotel.name}
                className="
                w-full

                h-64

                object-cover

                hover:scale-110

                transition-all
                duration-500
              "
              />
            </div>

            {/* Top Section */}

            <div className="p-5">
              <div className="flex justify-between items-center mb-5">
                {/* Edit */}

                <TbDatabaseEdit
                  onClick={() => Edit(hotel)}
                  className="
                  text-4xl

                  text-amber-500

                  cursor-pointer

                  hover:scale-125

                  transition-all
                  duration-300
                "
                />

                {/* Hotel Name */}

                <h2
                  className="
                  text-2xl

                  font-bold

                  text-center

                  text-slate-800
                  dark:text-white
                "
                >
                  {hotel.name}
                </h2>

                {/* Delete */}

                <FcDeleteDatabase
                  onClick={delHotel}
                  className="
                  text-4xl

                  cursor-pointer

                  hover:scale-125

                  transition-all
                  duration-300
                "
                />
              </div>

              {/* Hotel Details */}

              <div
                className="
                space-y-2

                text-slate-700
                dark:text-slate-300

                font-medium
              "
              >
                <p>
                  <span className="font-bold">Area:</span> {hotel.area}
                </p>

                <p>
                  <span className="font-bold">City:</span> {hotel.city}
                </p>

                <p>
                  <span className="font-bold">State:</span> {hotel.state}
                </p>

                <p className="text-green-600 font-bold text-lg">
                  ₹ {hotel.price}
                  <span className="text-sm text-gray-500 ml-1">
                    / Night
                  </span>
                </p>

                <p>
                  <span className="font-bold">
                    Unmarried Friendly:
                  </span>{" "}
                  {hotel.unmarriedFriendly ? "Yes ✅" : "No ❌"}
                </p>

                <p>
                  <span className="font-bold">
                    AC Rooms Available:
                  </span>{" "}
                  {hotel.AcRoomA ? "Yes ✅" : "No ❌"}
                </p>

                <p>
                  <span className="font-bold">
                    Non-AC Rooms Available:
                  </span>{" "}
                  {hotel.NonAcRoomA ? "Yes ✅" : "No ❌"}
                </p>

                <div className="flex gap-4 pt-3">
                  <div
                    className="
                    flex-1

                    bg-sky-50
                    dark:bg-slate-800

                    rounded-2xl

                    p-3

                    text-center
                  "
                  >
                    <p className="text-sm text-gray-500">
                      Total AC
                    </p>

                    <p className="font-bold text-xl text-blue-600">
                      {hotel.TotalAc}
                    </p>
                  </div>

                  <div
                    className="
                    flex-1

                    bg-sky-50
                    dark:bg-slate-800

                    rounded-2xl

                    p-3

                    text-center
                  "
                  >
                    <p className="text-sm text-gray-500">
                      Total Non AC
                    </p>

                    <p className="font-bold text-xl text-purple-600">
                      {hotel.TotalNonAc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {hotels.length === 0 && (
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold text-slate-700 dark:text-white">
            No Hotels Added Yet
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Add your first hotel to start receiving bookings.
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelList;