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
    <div className="z-20 flex justify-center  px-4 md:px-0">
      <form
        className="flex items-center w-full max-w-6xl bg-white p-2 rounded-lg shadow-xl border border-gray-300"
        onSubmit={handleSubmit}
      >
        {/* Location Input */}
        <div className="flex flex-col mr-4">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={values.value}
            onChange={(e) => handleChange(e, "value")}
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city or hotel name"
          />
        </div>

        {/* From Date Input */}
        <div className="flex flex-col mr-4">
          <label className="text-sm font-medium text-gray-700">From</label>
          <input
            type="date"
            id="fromDate"
            min={today}
            value={values.fromDate}
            onChange={(e) => handleChange(e, "fromDate")}
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Date Input */}
        <div className="flex flex-col mr-4">
          <label className="text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            id="toDate"
            min={today}
            value={values.toDate}
            onChange={(e) => handleChange(e, "toDate")}
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Number of Rooms Input */}
        <div className="flex flex-col mr-4">
          <label className="text-sm font-medium text-gray-700">Rooms</label>
          <input
            type="number"
            id="rooms"
            min={1}
            value={values.rooms}
            onChange={(e) => handleChange(e, "rooms")}
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room Type Select */}
        <div className="flex flex-col mr-4 ">
          <label className="text-sm font-medium text-gray-700">Room Type</label>
          <select
            id="RoomType"
            value={values.RoomType}
            onChange={(e) => handleChange(e, "RoomType")}
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="AC">AC</option>
            <option value="NonAc">Non-AC</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FiSearch className="mr-2 text-xl" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
