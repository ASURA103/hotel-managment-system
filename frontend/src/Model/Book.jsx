import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";

import Navbar from "../Components/Navbar.jsx";
import HotelImage from "../Components/ui/HotelImage.jsx";
import { formatPrice } from "../lib/format.js";
import { errorMessage } from "../lib/api.js";
import { getRole, getToken } from "../lib/session.js";

const DAY_MS = 1000 * 60 * 60 * 24;

// Same rule the server uses: a same-day stay counts as one night's price.
function calculateBill(price, rooms, fromDate, toDate) {
  if (!fromDate || !toDate) return "";
  const from = new Date(fromDate);
  const to = new Date(toDate);
  if (to < from) return "";
  const days = (to - from) / DAY_MS;
  return days === 0 ? price * rooms : days * price * rooms;
}

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state;
  const today = new Date().toISOString().split("T")[0];
  const search = hotel?.search || {};

  const [formData, setFormData] = useState({
    fromDate: search.fromDate || "",
    toDate: search.toDate || "",
    rooms: search.rooms || 1,
    RoomType: search.RoomType || "",
    hotelId: hotel?._id,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!getToken() || getRole() !== "user") {
      navigate("/user/auth");
    }
  }, [navigate]);

  const price = Number(hotel?.price) || 0;
  const rooms = Number(formData.rooms) || 0;
  const bill = useMemo(
    () => calculateBill(price, rooms, formData.fromDate, formData.toDate),
    [price, rooms, formData.fromDate, formData.toDate],
  );
  const nights =
    formData.fromDate && formData.toDate
      ? Math.max((new Date(formData.toDate) - new Date(formData.fromDate)) / DAY_MS, 0)
      : 0;

  // Opened without choosing a hotel (e.g. /book typed directly): go back to searching.
  if (!hotel?._id) return <Navigate to="/" replace />;

  function handleChange(e, type) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // The server recomputes the bill; it is sent for compatibility only.
      await axios.post(`${B_URL}/user/bookH`, { ...formData, bill });
      toast.success("Hotel Booked Successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(errorMessage(error, "Error while booking the hotel."));
      console.error("Error:", error);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Toaster richColors position="top-center" />

      <main className="container-page grid gap-8 pb-16 pt-28 lg:grid-cols-[1.1fr_.9fr]">
        {/* Hotel */}
        <section className="animate-fade-up">
          <p className="eyebrow">Book your stay</p>
          <h1 className="title-section mt-2">{hotel.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted">
            <IoLocationOutline className="text-brass" />
            {[hotel.area, hotel.city, hotel.state].filter(Boolean).join(", ")}
          </p>

          <div className="card mt-6 overflow-hidden">
            <HotelImage src={hotel.Image} alt={hotel.name} eager className="aspect-[16/10] w-full" />
            <dl className="grid grid-cols-2 gap-4 p-6 text-sm sm:grid-cols-4">
              <div><dt className="field-label">Area</dt><dd className="mt-1 text-ink">{hotel.area}</dd></div>
              <div><dt className="field-label">City</dt><dd className="mt-1 text-ink">{hotel.city}</dd></div>
              <div><dt className="field-label">State</dt><dd className="mt-1 text-ink">{hotel.state}</dd></div>
              <div><dt className="field-label">Price</dt><dd className="mt-1 text-ink">{formatPrice(hotel.price)} per night</dd></div>
            </dl>
          </div>
        </section>

        {/* Booking form */}
        <section className="lg:pt-24">
          <form onSubmit={handleSubmit} className="card space-y-5 p-6 animate-fade-up md:p-8" style={{ animationDelay: "80ms" }}>
            <h2 className="font-display text-2xl text-ink">Your booking</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label htmlFor="fromDate" className="flex flex-col gap-1.5">
                <span className="field-label">Check-in date</span>
                <input type="date" id="fromDate" min={today} value={formData.fromDate} required className="field" onChange={(e) => handleChange(e, "fromDate")} />
              </label>
              <label htmlFor="toDate" className="flex flex-col gap-1.5">
                <span className="field-label">Check-out date</span>
                <input type="date" id="toDate" min={formData.fromDate || today} value={formData.toDate} required className="field" onChange={(e) => handleChange(e, "toDate")} />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label htmlFor="rooms" className="flex flex-col gap-1.5">
                <span className="field-label">Number of rooms</span>
                <input type="number" id="rooms" min="1" value={formData.rooms} required className="field" onChange={(e) => handleChange(e, "rooms")} />
              </label>
              <label htmlFor="RoomType" className="flex flex-col gap-1.5">
                <span className="field-label">Room type</span>
                <select id="RoomType" value={formData.RoomType} required className="field" onChange={(e) => handleChange(e, "RoomType")}>
                  <option value="">Select room type</option>
                  <option value="AC" disabled={hotel.AcRoomA === false}>AC</option>
                  <option value="NonAc" disabled={hotel.NonAcRoomA === false}>Non-AC</option>
                </select>
              </label>
            </div>

            <div className="rounded-2xl border border-line bg-surface2/60 p-5">
              <div className="flex justify-between text-sm text-muted">
                <span>
                  {formatPrice(price)} × {rooms || 0} {rooms === 1 ? "room" : "rooms"} × {Math.max(nights, 1)} {nights > 1 ? "nights" : "night"}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <span className="field-label" id="bill">Total bill</span>
                <span className="font-display text-3xl text-ink" aria-labelledby="bill">
                  {bill === "" ? "—" : formatPrice(bill)}
                </span>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? "Booking…" : "Confirm booking"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Book;
