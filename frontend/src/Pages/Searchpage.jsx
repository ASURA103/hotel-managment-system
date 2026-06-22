import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import SearchBar from "../Components/SearchBar1.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

export const Searchpage = ({}) => {
  const navigate = useNavigate();

  const items = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  const [hotels, setHotels] = useState([]);

  console.log(items);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post(
          `${B_URL}/user/searchHotel`,
          items.updateItem
        );

        setHotels(response.data);

        setLoading(false);

        console.log("search data response", response.data);
      } catch (error) {
        toast.error("error while searching hotels");
      }
    };

    fetchHotels();
  }, [items.updateItem]);

  console.log(items);

  console.log("hotels", hotels);

  function Book(hotel) {
    navigate("/book", { state: hotel });
  }

  return (
    <>
      <div
        className="
        min-h-screen

        bg-gradient-to-br

        from-sky-100
        via-cyan-50
        to-blue-100

        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950

        text-slate-900
        dark:text-white

        pt-6

        transition-all duration-300
      "
      >
        <Navbar />
        {/* SEARCH BAR */}

        <div className="w-full mt-20 max-w-7xl mx-auto px-4 z-10">
          <SearchBar />
        </div>

        <Toaster />

        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div
              className="
              text-3xl

              font-bold

              text-blue-700
              dark:text-blue-400

              animate-pulse
            "
            >
              LOADING...
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-10">
            {/* RESULTS */}

            <div className="mb-10">
              <h1
                className="
                text-3xl
                md:text-4xl

                font-bold

                text-slate-800
                dark:text-white
              "
              >
                {hotels.length} Hotels found in{" "}
                <span className="text-blue-600 dark:text-cyan-400">
                  {items.updateItem.value}
                </span>
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Find the best hotels matching your search.
              </p>
            </div>

            {/* HOTEL LIST */}

            <div
              className="
              grid

              grid-cols-1

              sm:grid-cols-2

              lg:grid-cols-3

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

                  hover:shadow-2xl

                  hover:-translate-y-2

                  border

                  border-slate-200
                  dark:border-slate-700

                  transition-all duration-300
                "
                >
                  {/* IMAGE */}

                  <div className="overflow-hidden">
                    <img
                      src={hotel.Image}
                      alt={hotel.name}
                      className="
                      w-full

                      h-[260px]

                      object-cover

                      hover:scale-110

                      transition-all duration-700
                    "
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">
                    <div className="text-center mb-5">
                      <h1
                        className="
                        text-3xl

                        font-bold

                        text-slate-800
                        dark:text-white
                      "
                      >
                        {hotel.name}
                      </h1>
                    </div>

                    <div
                      className="
                      space-y-2

                      text-slate-700
                      dark:text-slate-300

                      font-medium
                    "
                    >
                      <p>
                        <span className="font-bold">Area:</span>{" "}
                        {hotel.area}
                      </p>

                      <p>
                        <span className="font-bold">City:</span>{" "}
                        {hotel.city}
                      </p>

                      <p>
                        <span className="font-bold">State:</span>{" "}
                        {hotel.state}
                      </p>

                      <p>
                        <span className="font-bold">
                          Unmarried Friendly:
                        </span>{" "}
                        {hotel.unmarriedFriendly ? "Yes" : "No"}
                      </p>

                      <p>
                        <span className="font-bold">
                          AC Rooms Available:
                        </span>{" "}
                        {hotel.AcRoomA ? "Yes" : "No"}
                      </p>

                      <p>
                        <span className="font-bold">
                          Non-AC Rooms Available:
                        </span>{" "}
                        {hotel.NonAcRoomA ? "Yes" : "No"}
                      </p>
                    </div>

                    {/* PRICE + BUTTON */}

                    <div className="flex justify-between items-center mt-7">
                      <div>
                        <h1
                          className="
                          text-3xl

                          font-extrabold

                          text-green-600
                          dark:text-green-400
                        "
                        >
                          ₹{hotel.price}

                          <span className="text-gray-400 text-base font-normal">
                            {" "}
                            / Night
                          </span>
                        </h1>
                      </div>

                      <button
                        onClick={() => Book(hotel)}
                        className="
                        px-6

                        py-3

                        rounded-2xl

                        bg-gradient-to-r

                        from-blue-600
                        to-cyan-500

                        hover:from-blue-700
                        hover:to-cyan-600

                        text-white

                        font-bold

                        shadow-lg

                        hover:shadow-2xl

                        hover:scale-105

                        transition-all duration-300
                      "
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hotels.length === 0 && (
              <div className="text-center py-20">
                <h1
                  className="
                  text-4xl

                  font-bold

                  text-slate-700
                  dark:text-slate-300
                "
                >
                  No Hotels Found 😔
                </h1>

                <p className="mt-4 text-gray-500">
                  Try changing your filters or search another city.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchpage;