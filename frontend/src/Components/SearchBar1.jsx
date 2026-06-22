import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../lib/store.js";

const SearchBar1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [values, setValues] = useState({
    value: "Mohali",
    fromDate: null,
    toDate: null,
    RoomType: null,
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
    <div className="z-20 flex justify-center px-4 md:px-0">
      <form
        className="
          w-full max-w-6xl
          bg-white dark:bg-gray-800
          p-4 md:p-5
          rounded-2xl
          shadow-2xl
          border border-gray-300 dark:border-gray-700
          transition-all duration-300
        "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* Location */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Location
            </label>

            <input
              type="text"
              id="location"
              value={values.value}
              onChange={(e) => handleChange(e, "value")}
              placeholder="Enter city or hotel name"
              className="
                mt-2 p-2
                border border-gray-300 dark:border-gray-600
                rounded-lg

                bg-white dark:bg-gray-900
                text-black dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* From Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              From
            </label>

            <input
              type="date"
              id="fromDate"
              min={today}
              value={values.fromDate}
              onChange={(e) => handleChange(e, "fromDate")}
              className="
                mt-2 p-2
                border border-gray-300 dark:border-gray-600
                rounded-lg

                bg-white dark:bg-gray-900
                text-black dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              To
            </label>

            <input
              type="date"
              id="toDate"
              min={today}
              value={values.toDate}
              onChange={(e) => handleChange(e, "toDate")}
              className="
                mt-2 p-2
                border border-gray-300 dark:border-gray-600
                rounded-lg

                bg-white dark:bg-gray-900
                text-black dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* Rooms */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Rooms
            </label>

            <input
              type="number"
              id="rooms"
              min={1}
              value={values.rooms}
              onChange={(e) => handleChange(e, "rooms")}
              className="
                mt-2 p-2
                border border-gray-300 dark:border-gray-600
                rounded-lg

                bg-white dark:bg-gray-900
                text-black dark:text-white

                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent

                transition-all duration-300
              "
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Room Type
            </label>

            <select
              id="RoomType"
              value={values.RoomType}
              onChange={(e) => handleChange(e, "RoomType")}
              className="
                mt-2 p-2
                border border-gray-300 dark:border-gray-600
                rounded-lg

                bg-white dark:bg-gray-900
                text-black dark:text-white

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

          {/* Search Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="
              h-[42px]
              px-6

              bg-blue-600
              dark:bg-blue-500

              hover:bg-blue-700
              dark:hover:bg-blue-600

              text-white

              rounded-lg

              flex items-center justify-center

              shadow-md hover:shadow-lg

              transition-all duration-300

              focus:outline-none
              focus:ring-2 focus:ring-blue-500
            "
          >
            <FiSearch className="mr-2 text-xl" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar1;