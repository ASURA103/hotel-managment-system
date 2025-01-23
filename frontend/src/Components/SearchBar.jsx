import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../lib/store.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setVal] = useState(false);
  const [values, setValues] = React.useState({
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
    console.log(values)
    e.preventDefault();
    dispatch(updateItem(values));
    navigate("/search");
  }
  return (
    <div className="  rounded-[10vh]  w-[100vh] shadow-lg shadow-[#03045e] text-white  ">
      <form className=" rounded-[10vh] w-full flex bg-[#00b4d8] content-center r">
        <div className="rounded-l-[10vh] border border-[#03045e]  w-full">
          <label className="  cursor-pointer ml-2 text-sm font-medium    " htmlFor="Name">
            Name,city{" "}
          </label>
          <input
            type="text"
            id="Name"
            className="  pl-3 bg-[#00b4d8] w-full rounded-bl-[10vh]  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>handleChange(e, "value")}
          />
        </div>
        <div className="flex  border-[#03045e] border w-full">
          <div className=" w-full">
            <label className="  cursor-pointer   text-sm font-medium   " htmlFor="date">
              From{" "}
            </label>
            <input
              type="date"
              id="date"
              className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) =>handleChange(e, "fromDate")}
            />
          </div>
          <div className=" w-full">
            <label className="  cursor-pointer   text-sm font-medium   " htmlFor="date">
              To{" "}
            </label>
            <input
              type="date"
              id="date"
              className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) =>handleChange(e, "toDate")}
            />
          </div>
        </div>
        <div className="border-[#03045e] border  w-full ">
          <label className="  cursor-pointer text-sm font-medium   " htmlFor="rooms">
            Number of Rooms{" "}
          </label>
          <input
            type="number"
            id="rooms"
            min={1}
            defaultValue={1}
            className=" bg-[#00b4d8] w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) =>handleChange(e, "rooms")}
          />
        </div>
        <div className="border-[#03045e] border  w-full ">
          <label className="  cursor-pointer text-sm font-medium   " htmlFor="type">
            Room Type{" "}
          </label>
          <select
            className=" bg-[#00b4d8]"
            name=""
            id="type"
            onChange={(e) =>handleChange(e, "roomType")}
          >
            <option value="">Select</option>
            <option value="AC">AC</option>
            <option value="NonAc">NonAc</option>
          </select>
        </div>

        <button
          type="submit"
          className=" rounded-r-[10vh] h-full  w-[50vh] flex justify-center py-4 px-4    shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-[#03045e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={(e) => handleSubmit(e)}
        >
          <FiSearch className="mr-[1px] text-xl " />
          Search{" "}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
