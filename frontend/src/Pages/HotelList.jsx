import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { IoLocationOutline } from "react-icons/io5";
import { B_URL } from "../../config.js";
import HotelImage from "../Components/ui/HotelImage.jsx";
import PageHeader from "../Components/ui/PageHeader.jsx";
import EmptyState from "../Components/ui/EmptyState.jsx";
import { formatPrice } from "../lib/format.js";
import { errorMessage } from "../lib/api.js";

const Fact = ({ label, value }) => (
  <div className="flex justify-between gap-3 text-sm">
    <span className="text-muted">{label}</span>
    <span className="text-right text-ink">{value}</span>
  </div>
);
const yesNo = (v) => (v ? "Yes" : "No");

const HotelList = ({ onEdit }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  const fetchHotels = useCallback(async () => {
    try {
      const response = await axios.get(`${B_URL}/owner/gethotels`);
      setHotels(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching hotels", error);
      toast.error(errorMessage(error, "Error fetching hotels"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const delHotel = async (id) => {
    try {
      await axios.delete(`${B_URL}/owner/delHotel`, { data: { id } });
      toast.success("Hotel deleted");
      setConfirmId(null);
      await fetchHotels();
    } catch (error) {
      console.error("Error while deleting hotel", error);
      toast.error(errorMessage(error, "Error while deleting hotel"));
    }
  };

  return (
    <div>
      <Toaster richColors position="top-center" />
      <PageHeader
        eyebrow="Your properties"
        title="My Hotels"
        subtitle={loading ? "Loading your hotels…" : `Total Hotels: ${hotels.length}`}
      />

      {loading && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton h-56 rounded-none" />
              <div className="space-y-3 p-6"><div className="skeleton h-6 w-2/3" /><div className="skeleton h-24 w-full" /></div>
            </div>
          ))}
        </div>
      )}

      {!loading && hotels.length === 0 && (
        <EmptyState title="No Hotels Added Yet" text="Add your first hotel to start receiving bookings." />
      )}

      {!loading && hotels.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel, i) => (
            <article
              key={hotel._id}
              className="card card-hover flex flex-col overflow-hidden animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <HotelImage src={hotel.Image} alt={hotel.name} className="h-56 w-full" />

              <div className="flex flex-1 flex-col gap-5 p-6">
                <div>
                  <h2 className="font-display text-2xl leading-tight text-ink">{hotel.name}</h2>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                    <IoLocationOutline className="text-brass" />
                    {hotel.area}, {hotel.city}, {hotel.state}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-ink">
                    {formatPrice(hotel.price)} <span className="text-sm font-normal text-muted">/ Night</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Fact label="Unmarried Friendly" value={yesNo(hotel.unmarriedFriendly)} />
                  <Fact label="AC Rooms Available" value={yesNo(hotel.AcRoomA)} />
                  <Fact label="Non-AC Rooms Available" value={yesNo(hotel.NonAcRoomA)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-surface2/70 p-3 text-center">
                    <p className="field-label">Total AC</p>
                    <p className="mt-1 font-display text-2xl text-ink">{hotel.TotalAc}</p>
                  </div>
                  <div className="rounded-xl bg-surface2/70 p-3 text-center">
                    <p className="field-label">Total Non AC</p>
                    <p className="mt-1 font-display text-2xl text-ink">{hotel.TotalNonAc}</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-3 border-t border-line pt-4">
                  <button type="button" className="btn btn-outline btn-sm flex-1" onClick={() => onEdit && onEdit(hotel)}>
                    Edit
                  </button>
                  {confirmId === hotel._id ? (
                    <>
                      <button type="button" className="btn btn-danger btn-sm flex-1" onClick={() => delHotel(hotel._id)}>
                        Confirm delete
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmId(null)}>
                        Keep
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-ghost btn-sm flex-1 text-danger hover:bg-danger/10" onClick={() => setConfirmId(hotel._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;
