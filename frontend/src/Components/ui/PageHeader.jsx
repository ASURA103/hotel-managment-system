// Consistent page heading: small brass eyebrow, serif title, optional subtitle and actions.
export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <header className="mb-8 flex flex-col gap-4 animate-fade-up md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="title-section">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted md:text-base">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}
