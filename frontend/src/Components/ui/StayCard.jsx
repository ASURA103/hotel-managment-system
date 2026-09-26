import { IoLocationOutline } from "react-icons/io5";
import HotelImage from "./HotelImage.jsx";
import { formatPrice } from "../../lib/format.js";


const yesNo = (v) => (v ? "Yes" : "No");

// Hotel card used on the landing page and in search results.
// `detailed` adds the Yes/No facts the results page has always shown.
export default function StayCard({ hotel, index = 0, onBook, actionLabel = "Book", detailed = false }) {
  return (
    <article
      className="card card-hover group flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <HotelImage
          src={hotel.Image}
          alt={hotel.name}
          className="h-full w-full transition duration-700 ease-out group-hover:scale-105"
        />
        <span className="badge absolute left-4 top-4 bg-bg/90 text-ink backdrop-blur">
          {formatPrice(hotel.price)} <span className="font-normal text-muted">/ night</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-2xl leading-tight text-ink">{hotel.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
            <IoLocationOutline className="shrink-0 text-brass" />
            {[hotel.area, hotel.city].filter(Boolean).join(", ")}
          </p>
        </div>

        {detailed ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted">State</dt><dd className="text-right text-ink">{hotel.state}</dd>
            <dt className="text-muted">Unmarried friendly</dt><dd className="text-right text-ink">{yesNo(hotel.unmarriedFriendly)}</dd>
            <dt className="text-muted">AC rooms</dt><dd className="text-right text-ink">{yesNo(hotel.AcRoomA)}</dd>
            <dt className="text-muted">Non-AC rooms</dt><dd className="text-right text-ink">{yesNo(hotel.NonAcRoomA)}</dd>
          </dl>
        ) : (
          <div className="flex flex-wrap gap-2">
            {hotel.AcRoomA && <span className="badge badge-brass">AC rooms</span>}
            {hotel.NonAcRoomA && <span className="badge badge-muted">Non-AC rooms</span>}
            {hotel.unmarriedFriendly && <span className="badge badge-success">Unmarried friendly</span>}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <p className="text-sm text-muted">{detailed ? `${formatPrice(hotel.price)} / night` : hotel.state}</p>
          <button type="button" onClick={() => onBook(hotel)} className="btn btn-primary btn-sm">
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

export const StayCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="skeleton aspect-[4/3] rounded-none" />
    <div className="space-y-3 p-6">
      <div className="skeleton h-6 w-2/3" />
      <div className="skeleton h-4 w-1/2" />
      <div className="skeleton h-9 w-full" />
    </div>
  </div>
);
