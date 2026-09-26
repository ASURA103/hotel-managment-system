import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../lib/store.js";

const Field = ({ label, htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
    <span className="field-label">{label}</span>
    {children}
  </label>
);

// The hotel search form. `compact` is the version shown above search results
// (SearchBar1 re-exports it); it starts from the current search.
const SearchBar = ({ compact = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((state) => state.updateItem);

  const today = new Date().toISOString().split("T")[0];

  const [values, setValues] = useState(() => ({
    value: (compact && current.value) || "Mohali",
    fromDate: (compact && current.fromDate) || "",
    toDate: (compact && current.toDate) || "",
    RoomType: (compact && current.RoomType) || "",
    rooms: (compact && current.rooms) || 1,
  }));

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
    <div className={`z-20 flex justify-center px-4 md:px-0 ${compact ? "" : "mt-16"}`}>
      <form
        onSubmit={handleSubmit}
        className={`card w-full max-w-5xl animate-fade-up ${compact ? "p-4 md:p-5" : "p-5 shadow-lift md:p-7"}`}
      >
        {!compact && <p className="eyebrow mb-4">Find your stay</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_.7fr_.9fr_auto] lg:items-end">
          <Field label="Destination" htmlFor={compact ? "location-c" : "location"}>
            <input
              type="text"
              id={compact ? "location-c" : "location"}
              value={values.value}
              onChange={(e) => handleChange(e, "value")}
              placeholder="City, area or hotel"
              required
              className="field"
            />
          </Field>

          <Field label="Check-in" htmlFor={compact ? "fromDate-c" : "fromDate"}>
            <input
              type="date"
              id={compact ? "fromDate-c" : "fromDate"}
              min={today}
              value={values.fromDate}
              onChange={(e) => handleChange(e, "fromDate")}
              required
              className="field"
            />
          </Field>

          <Field label="Check-out" htmlFor={compact ? "toDate-c" : "toDate"}>
            <input
              type="date"
              id={compact ? "toDate-c" : "toDate"}
              min={values.fromDate || today}
              value={values.toDate}
              onChange={(e) => handleChange(e, "toDate")}
              required
              className="field"
            />
          </Field>

          <Field label="Rooms" htmlFor={compact ? "rooms-c" : "rooms"}>
            <input
              type="number"
              id={compact ? "rooms-c" : "rooms"}
              min={1}
              value={values.rooms}
              onChange={(e) => handleChange(e, "rooms")}
              className="field"
            />
          </Field>

          <Field label="Room type" htmlFor={compact ? "RoomType-c" : "RoomType"}>
            <select
              id={compact ? "RoomType-c" : "RoomType"}
              value={values.RoomType}
              onChange={(e) => handleChange(e, "RoomType")}
              className="field"
            >
              <option value="">Select</option>
              <option value="AC">AC</option>
              <option value="NonAc">Non-AC</option>
            </select>
          </Field>

          <button type="submit" className="btn btn-primary h-11 w-full sm:col-span-2 lg:col-span-1 lg:w-auto">
            <FiSearch size={16} />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
