import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import HotelImage from "./HotelImage.jsx";
import { formatPrice } from "../../lib/format.js";

const DAY_MS = 1000 * 60 * 60 * 24;
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—";

function stayStatus(fromDate, toDate) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (new Date(toDate) < today) return { label: "Completed", cls: "badge-muted" };
  if (new Date(fromDate) <= today) return { label: "Current stay", cls: "badge-success" };
  return { label: "Upcoming", cls: "badge-brass" };
}

// One booking, used for guests (My bookings), owners and admins (`showGuest`).
// Hotels that were removed, or no longer exist, are labelled instead of breaking the page.
export default function BookingCard({ booking, showGuest = false, index = 0 }) {
  const [open, setOpen] = useState(false);
  const hotel = Array.isArray(booking.hotelId) ? booking.hotelId[0] : booking.hotelId;
  const guest = Array.isArray(booking.bookedBy) ? booking.bookedBy[0] : booking.bookedBy;
  const removed = !hotel || hotel.isDeleted;
  const status = stayStatus(booking.fromDate, booking.toDate);
  const nights = Math.max(Math.round((new Date(booking.toDate) - new Date(booking.fromDate)) / DAY_MS), 0);

  return (
    <article
      className="card flex flex-col overflow-hidden animate-fade-up sm:flex-row"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <HotelImage src={hotel?.Image} alt={hotel?.name || "Hotel removed"} className="h-48 w-full shrink-0 sm:h-auto sm:w-56" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl leading-tight text-ink">{hotel?.name || "Hotel removed"}</h3>
            {(hotel?.area || hotel?.city) && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <IoLocationOutline className="text-brass" />
                {[hotel.area, hotel.city].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {removed && <span className="badge badge-danger">Hotel removed</span>}
            <span className={`badge ${status.cls}`}>{status.label}</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div><dt className="field-label">Check-in</dt><dd className="mt-1 text-ink">{fmtDate(booking.fromDate)}</dd></div>
          <div><dt className="field-label">Check-out</dt><dd className="mt-1 text-ink">{fmtDate(booking.toDate)}</dd></div>
          <div><dt className="field-label">Rooms</dt><dd className="mt-1 text-ink">{booking.rooms} · {booking.RoomType === "NonAc" ? "Non-AC" : booking.RoomType}</dd></div>
          <div><dt className="field-label">Total</dt><dd className="mt-1 font-semibold text-ink">{formatPrice(booking.bill)}</dd></div>
        </dl>

        {showGuest && guest && (
          <p className="text-sm text-muted">
            Guest: <span className="text-ink">{guest.name}</span>
            {guest.email && <> · <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${guest.email}`}>{guest.email}</a></>}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <p className="text-xs text-muted">{nights === 0 ? "Same-day stay" : `${nights} ${nights === 1 ? "night" : "nights"}`}</p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="btn btn-outline btn-sm">
            {open ? "Hide details" : "View details"}
          </button>
        </div>

        {open && (
          <dl className="grid grid-cols-2 gap-3 rounded-xl bg-surface2/70 p-4 text-sm animate-scale-in">
            <dt className="text-muted">Booking ID</dt><dd className="break-all text-right text-ink">{booking._id}</dd>
            {hotel && (<><dt className="text-muted">Price per night</dt><dd className="text-right text-ink">{formatPrice(hotel.price)}</dd></>)}
            {hotel?.state && (<><dt className="text-muted">State</dt><dd className="text-right text-ink">{hotel.state}</dd></>)}
            <dt className="text-muted">Room type</dt><dd className="text-right text-ink">{booking.RoomType === "NonAc" ? "Non-AC" : booking.RoomType}</dd>
          </dl>
        )}
      </div>
    </article>
  );
}

export const BookingCardSkeleton = () => (
  <div className="card flex flex-col overflow-hidden sm:flex-row">
    <div className="skeleton h-48 w-full rounded-none sm:h-auto sm:w-56" />
    <div className="flex-1 space-y-3 p-6">
      <div className="skeleton h-6 w-1/2" />
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-14 w-full" />
    </div>
  </div>
);
