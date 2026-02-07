import Link from 'next/link';

interface ToolCardProps {
  readonly href: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
}

export default function ToolCard({ href, icon, title, description, tags }: ToolCardProps) {
  return (
    <Link href={href} className="tool-card group">
      <div className="flex items-start justify-between">
        <div className="tool-card-icon">{icon}</div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0"
          style={{ color: 'var(--color-slate-400)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
      <h3
        className="text-lg font-extrabold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-900)', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      <p className="text-sm mb-3" style={{ color: 'var(--color-neutral-600)' }}>
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              background: 'var(--color-slate-50)',
              color: 'var(--color-slate-600)',
              borderLeft: '2px solid var(--color-slate-300)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
