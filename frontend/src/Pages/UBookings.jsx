import React, { useEffect } from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import Navbar from "../Components/Navbar.jsx";
import HotelCard from "../Components/HotelCard.jsx";
import { useNavigate } from "react-router-dom";

const UBookings = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "user"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function serverCall() {
      try {
        const response = await axios.get(`${B_URL}/user/mybookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);

        setData(response.data.bookings.reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    serverCall();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="
          min-h-screen
          pt-28 pb-10 px-4

          bg-gradient-to-br
          from-sky-50
          via-white
          to-cyan-50

          dark:from-slate-950
          dark:via-slate-900
          dark:to-slate-950
        "
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-24">
            <div
              className="
                w-14 h-14
                rounded-full
                border-4
                border-blue-200
                border-t-blue-600
                animate-spin
              "
            ></div>

            <p className="mt-5 text-lg font-semibold text-gray-600 dark:text-gray-300">
              Loading your bookings...
            </p>
          </div>
        ) : (
          <>
            {/* Heading */}

            <div className="text-center mb-10">
              <h1
                className="
                  text-4xl md:text-5xl
                  font-extrabold

                  text-slate-800
                  dark:text-white
                "
              >
                My Bookings
              </h1>

              <p className="mt-3 text-gray-500 dark:text-gray-400">
                View all your booked hotels in one place
              </p>
            </div>

            {/* Empty State */}

            {data.length === 0 ? (
              <div
                className="
                  max-w-xl mx-auto

                  bg-white
                  dark:bg-slate-900

                  rounded-3xl

                  shadow-xl

                  p-10

                  text-center
                "
              >
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                  No Bookings Yet
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Looks like you haven't booked any hotels yet.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="
                    mt-6

                    px-7 py-3

                    rounded-xl

                    bg-blue-600
                    hover:bg-blue-700

                    text-white
                    font-semibold

                    transition-all
                    duration-300

                    hover:scale-105
                  "
                >
                  Explore Hotels
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                {data.map((item, key) => (
                  <div
                    key={key}
                    className="
                      w-full
                      flex
                      justify-center

                      transition-all
                      duration-300

                      hover:scale-[1.01]
                    "
                  >
                    <HotelCard
                      item={item.hotelId[0]}
                      buttonName="View Details"
                      buttonClick={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UBookings;