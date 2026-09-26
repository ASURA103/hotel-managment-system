import { useState } from "react";

// Hotel photo that loads lazily and falls back to a styled placeholder when the URL fails
// (missing file, wrong image domain, offline).
export default function HotelImage({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brassSoft via-surface2 to-surface ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-4xl text-brass/80">{(alt || "D").trim().charAt(0).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
