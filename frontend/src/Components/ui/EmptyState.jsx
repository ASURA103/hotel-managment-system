// "Nothing here yet" block with an optional action button.
export default function EmptyState({ title, text, action }) {
  return (
    <div className="card mx-auto flex max-w-lg flex-col items-center gap-3 px-8 py-14 text-center animate-fade-up">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brassSoft font-display text-xl text-brass">
        ✦
      </span>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {text && <p className="text-sm text-muted">{text}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
