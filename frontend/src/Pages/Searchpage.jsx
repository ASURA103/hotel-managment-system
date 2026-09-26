import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import SearchBar from "../Components/SearchBar1.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import StayCard, { StayCardSkeleton } from "../Components/ui/StayCard.jsx";
import EmptyState from "../Components/ui/EmptyState.jsx";
import { errorMessage } from "../lib/api.js";
import { getRole, getToken } from "../lib/session.js";

export const Searchpage = () => {
  const navigate = useNavigate();
  const search = useSelector((state) => state.updateItem);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [hotels, setHotels] = useState([]);

  const fetchHotels = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await axios.post(`${B_URL}/user/searchHotel`, search);
      setHotels(Array.isArray(response.data) ? response.data : []);
      setStatus("ready");
    } catch (error) {
      toast.error(errorMessage(error, "error while searching hotels"));
      setStatus("error");
    }
  }, [search]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  function Book(hotel) {
    if (!getToken() || getRole() !== "user") {
      navigate("/user/auth");
      return;
    }
    // Carry the search so the booking form starts with the same dates and rooms.
    navigate("/book", {
      state: { ...hotel, search: { fromDate: search.fromDate, toDate: search.toDate, rooms: search.rooms, RoomType: search.RoomType } },
    });
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Toaster richColors position="top-center" />

      <div className="container-page pt-28">
        <SearchBar />
      </div>

      <main className="container-page py-12">
        <div className="mb-10 animate-fade-up">
          <p className="eyebrow">Search results</p>
          <h1 className="title-section mt-2">
            {status === "ready" ? `${hotels.length} ${hotels.length === 1 ? "hotel" : "hotels"} found in ` : "Hotels in "}
            <span className="italic text-brass">{search.value}</span>
          </h1>
          <p className="mt-2 text-muted">Find the best hotels matching your search.</p>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => <StayCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <EmptyState
            title="Search didn't go through"
            text="Check the destination and dates, then try again."
            action={<button type="button" onClick={fetchHotels} className="btn btn-outline">Try again</button>}
          />
        )}

        {status === "ready" && hotels.length === 0 && (
          <EmptyState title="No hotels found" text="Try changing your filters or search another city." />
        )}

        {status === "ready" && hotels.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, i) => (
              <StayCard key={hotel._id} hotel={hotel} index={i} onBook={Book} actionLabel="Book now" detailed />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Searchpage;
