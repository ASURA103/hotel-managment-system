import { Link } from "react-router-dom";

// Split-screen layout for sign-in pages: form on one side, a full-height photo on the other.
export default function AuthShell({ image, eyebrow, caption, children }) {
  return (
    <div className="grid min-h-screen bg-bg lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link to="/" className="flex items-center gap-3 self-start">
          <img src="/logo1.webp" alt="" className="h-10 w-auto" />
          <span className="font-display text-xl text-ink">DreamStay</span>
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md animate-fade-up">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img key={image} src={image} alt="" className="absolute inset-0 h-full w-full object-cover animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512]/80 via-[#0E1512]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          {eyebrow && <p className="eyebrow !text-[#CDAA6E]">{eyebrow}</p>}
          {caption && <p className="mt-3 max-w-md font-display text-4xl leading-tight text-[#F7F3EC]">{caption}</p>}
        </div>
      </div>
    </div>
  );
}

// Heading block used at the top of every auth form.
export const AuthHeading = ({ eyebrow, title, subtitle }) => (
  <div className="mb-8">
    {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
    <h1 className="font-display text-4xl text-ink">{title}</h1>
    {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
  </div>
);

// Shown when the user was sent here because their session ended.
export const ExpiredNote = () =>
  new URLSearchParams(window.location.search).get("expired") ? (
    <p className="mb-6 rounded-xl border border-brass/30 bg-brassSoft px-4 py-3 text-sm text-ink">
      Your session ended. Please sign in again.
    </p>
  ) : null;
