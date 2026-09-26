// Shown while a page's code or data loads.
export default function PageLoader({ label = "Loading" }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 animate-fade-in" role="status">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-brass" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
