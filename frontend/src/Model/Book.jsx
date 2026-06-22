import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import axios from "axios";

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state;

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    rooms: 1,
    bill: "",
    RoomType: "",
    hotelId: hotel._id,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/user/auth");
    }
  }, [navigate]);

  function handleChange(e, type) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(`${B_URL}/user/bookH`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        const days =
          (toDate - fromDate) / (1000 * 60 * 60 * 24);

        const bill =
          days === 0
            ? hotel.price * formData.rooms
            : days * hotel.price * formData.rooms;

        setFormData((prevFormData) => ({
          ...prevFormData,
          bill: bill,
        }));
      }
    }
  };

  return (
    <div
      className="
      min-h-screen
      w-full

      bg-gradient-to-br
      from-sky-500
      via-blue-600
      to-indigo-700

      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-950

      py-8
      px-4

      transition-all
      duration-300
    "
    >
      <div
        className="
        max-w-4xl
        mx-auto

        bg-white
        dark:bg-slate-900

        p-5
        md:p-8

        rounded-[32px]

        shadow-2xl

        border
        border-white/20
        dark:border-slate-700

        backdrop-blur-md

        space-y-7

        transition-all
        duration-300
      "
      >
        <h1
          className="
          text-center

          text-3xl
          md:text-5xl

          font-bold

          text-slate-800
          dark:text-white
        "
        >
          Book Your Stay at {hotel.name}
        </h1>

        <div className="flex justify-center">
          <img
            src={hotel.Image}
            alt={hotel.name}
            className="
            w-full

            h-[250px]
            md:h-[420px]

            object-cover

            rounded-3xl

            shadow-2xl

            hover:scale-[1.02]

            transition-all
            duration-500
          "
          />
        </div>

        <div
          className="
          text-center

          text-base
          md:text-lg

          text-slate-700
          dark:text-slate-300

          space-y-2
        "
        >
          <p>
            <strong>Area:</strong> {hotel.area}
          </p>

          <p>
            <strong>City:</strong> {hotel.city}
          </p>

          <p>
            <strong>State:</strong> {hotel.state}
          </p>

          <p>
            <strong>Price:</strong> ₹{hotel.price} per night
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="fromDate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Check-in Date
              </label>

              <input
                type="date"
                id="fromDate"
                min={today}
                className="
                w-full

                p-3

                mt-2

                border

                border-slate-300
                dark:border-slate-700

                rounded-xl

                bg-white
                dark:bg-slate-800

                text-slate-800
                dark:text-white

                shadow-sm

                focus:outline-none

                focus:ring-2
                focus:ring-blue-500

                transition-all
                duration-300
              "
                onChange={(e) =>
                  handleChange(e, "fromDate")
                }
              />
            </div>

            <div>
              <label
                htmlFor="toDate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Check-out Date
              </label>

              <input
                type="date"
                id="toDate"
                min={today}
                className="
                w-full

                p-3

                mt-2

                border

                border-slate-300
                dark:border-slate-700

                rounded-xl

                bg-white
                dark:bg-slate-800

                text-slate-800
                dark:text-white

                shadow-sm

                focus:outline-none

                focus:ring-2
                focus:ring-blue-500

                transition-all
                duration-300
              "
                onChange={(e) =>
                  handleChange(e, "toDate")
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rooms"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Number of Rooms
            </label>

            <input
              type="number"
              id="rooms"
              min="1"
              defaultValue="1"
              className="
              w-full

              p-3

              mt-2

              border

              border-slate-300
              dark:border-slate-700

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-800
              dark:text-white

              shadow-sm

              focus:outline-none

              focus:ring-2
              focus:ring-blue-500

              transition-all
              duration-300
            "
              onChange={(e) =>
                handleChange(e, "rooms")
              }
            />
          </div>

          <div className="relative">
            <label
              htmlFor="bill"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Total Bill
            </label>

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-slate-500 dark:text-slate-300 text-xl mt-7">
                ₹
              </span>
            </div>

            <input
              type="number"
              id="bill"
              value={formData.bill}
              readOnly
              className="
              w-full

              pl-8

              p-3

              mt-2

              border

              border-slate-300
              dark:border-slate-700

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-800
              dark:text-white

              shadow-sm

              focus:outline-none

              focus:ring-2
              focus:ring-blue-500

              transition-all
              duration-300
            "
            />
          </div>

          <div>
            <label
              htmlFor="RoomType"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Room Type
            </label>

            <select
              id="RoomType"
              className="
              w-full

              p-3

              mt-2

              border

              border-slate-300
              dark:border-slate-700

              rounded-xl

              bg-white
              dark:bg-slate-800

              text-slate-800
              dark:text-white

              shadow-sm

              focus:outline-none

              focus:ring-2
              focus:ring-blue-500

              transition-all
              duration-300
            "
              onChange={(e) =>
                handleChange(e, "RoomType")
              }
            >
              <option value="">
                Select Room Type
              </option>

              <option value="AC">AC</option>

              <option value="NonAc">
                NonAC
              </option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="
              w-full

              py-4

              bg-gradient-to-r

              from-blue-600
              to-cyan-500

              hover:from-blue-700
              hover:to-cyan-600

              text-white

              font-bold

              rounded-2xl

              shadow-xl

              hover:shadow-2xl

              hover:scale-[1.02]

              transition-all
              duration-300

              focus:outline-none

              focus:ring-4
              focus:ring-blue-300
            "
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