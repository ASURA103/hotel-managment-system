import axios from "axios";
import React, { useEffect, useState } from "react";
import { B_URL } from "../../config.js";
import PageHeader from "../Components/ui/PageHeader.jsx";
import EmptyState from "../Components/ui/EmptyState.jsx";
import BookingCard, { BookingCardSkeleton } from "../Components/ui/BookingCard.jsx";

// Owner dashboard: bookings made at the owner's hotels.
const Bookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${B_URL}/owner/bookings`);
        setBooking(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log("error while checking Bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Reservations"
        title="Hotel Bookings"
        subtitle={loading ? "Loading Bookings…" : `Total Bookings: ${booking.length}`}
      />

      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }, (_, i) => <BookingCardSkeleton key={i} />)}
        </div>
      ) : booking.length === 0 ? (
        <EmptyState title="No Bookings Found" text="Customers haven't booked your hotels yet." />
      ) : (
        <div className="flex flex-col gap-6">
          {booking.map((book, i) => (
            <BookingCard key={book._id} booking={book} index={i} showGuest />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
