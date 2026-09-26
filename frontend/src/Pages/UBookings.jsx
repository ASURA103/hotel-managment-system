import React, { useEffect } from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import PageHeader from "../Components/ui/PageHeader.jsx";
import EmptyState from "../Components/ui/EmptyState.jsx";
import BookingCard, { BookingCardSkeleton } from "../Components/ui/BookingCard.jsx";
import { getRole, getToken } from "../lib/session.js";

const UBookings = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const allowed = Boolean(getToken()) && getRole() === "user";

  useEffect(() => {
    if (!allowed) navigate("/");
  }, [allowed, navigate]);

  useEffect(() => {
    if (!allowed) return;
    async function serverCall() {
      try {
        const response = await axios.get(`${B_URL}/user/mybookings`);
        setData([...(response.data.bookings || [])].reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    serverCall();
  }, [allowed]);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="container-page max-w-5xl pb-16 pt-28">
        <PageHeader eyebrow="Your trips" title="My Bookings" subtitle="View all your booked hotels in one place" />

        {loading ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }, (_, i) => <BookingCardSkeleton key={i} />)}
          </div>
        ) : data.length === 0 ? (
          <EmptyState
            title="No Bookings Yet"
            text="Looks like you haven't booked any hotels yet."
            action={<button type="button" onClick={() => navigate("/")} className="btn btn-primary">Explore Hotels</button>}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {data.map((item, i) => (
              <BookingCard key={item._id} booking={item} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UBookings;
