import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../lib/store.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [values, setValues] = useState({
    value: "Mohali",
    fromDate: null,
    toDate: null,
    roomType: null,
    rooms: 1,
  });

  function handleChange(e, type) {
    setValues((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateItem(values));
    navigate("/search");
  }

  return (
    <div className="z-20 flex justify-center mt-16 px-4 md:px-0">
      <form
        className="
          w-full max-w-5xl
          bg-white dark:bg-gray-800
          p-6 md:p-8
          rounded-2xl
          shadow-2xl
          border border-gray-200 dark:border-gray-700
          transition-all duration-300
        "
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Location Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Location
            </label>

            <input
              type="text"
              id="location"
              value={values.value}
              onChange={(e) => handleChange(e, "value")}
              placeholder="Enter city or hotel name"
              className="
                mt-2 p-3
                border border-gray-300 dark:border-gray-600
                rounded-xl

                bg-white dark:bg-gray-900
                text-gray-800 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* From Date Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              From
            </label>

            <input
              type="date"
              id="fromDate"
              min={today}
              value={values.fromDate}
              onChange={(e) => handleChange(e, "fromDate")}
              className="
                mt-2 p-3
                border border-gray-300 dark:border-gray-600
                rounded-xl

                bg-white dark:bg-gray-900
                text-gray-800 dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* To Date Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              To
            </label>

            <input
              type="date"
              id="toDate"
              min={today}
              value={values.toDate}
              onChange={(e) => handleChange(e, "toDate")}
              className="
                mt-2 p-3
                border border-gray-300 dark:border-gray-600
                rounded-xl

                bg-white dark:bg-gray-900
                text-gray-800 dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* Number of Rooms Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Rooms
            </label>

            <input
              type="number"
              id="rooms"
              min={1}
              value={values.rooms}
              onChange={(e) => handleChange(e, "rooms")}
              className="
                mt-2 p-3
                border border-gray-300 dark:border-gray-600
                rounded-xl

                bg-white dark:bg-gray-900
                text-gray-800 dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* Room Type Select */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Room Type
            </label>

            <select
              id="roomType"
              value={values.roomType}
              onChange={(e) => handleChange(e, "roomType")}
              className="
                mt-2 p-3
                border border-gray-300 dark:border-gray-600
                rounded-xl

                bg-white dark:bg-gray-900
                text-gray-800 dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            >
              <option value="">Select</option>
              <option value="AC">AC</option>
              <option value="NonAc">Non-AC</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              onClick={handleSubmit}
              className="
                w-full

                bg-blue-600 dark:bg-blue-500
                hover:bg-blue-700 dark:hover:bg-blue-600

                text-white

                py-3 px-4

                rounded-xl

                flex items-center justify-center

                font-semibold

                shadow-lg hover:shadow-xl

                transition-all duration-300

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <FiSearch className="mr-2 text-xl" />
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;