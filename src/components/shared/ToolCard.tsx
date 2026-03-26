import Link from 'next/link';

interface ToolCardProps {
  readonly href: string;
  readonly title: string;
  readonly attribution: string;
  readonly description: string;
  readonly linkText: string;
  readonly icon?: string;
}

export default function ToolCard({
  href,
  title,
  attribution,
  description,
  linkText,
  icon,
}: ToolCardProps) {
  return (
    <Link href={href} className="tool-card group">
      {icon && (
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3"
          style={{
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
          }}
        >
          {icon}
        </div>
      )}

      <h3 className="tool-card-title">{title}</h3>

      <p className="tool-card-attribution">{attribution}</p>

      <p className="tool-card-description">{description}</p>

      <span className="tool-card-link">
        {linkText} &rarr;
      </span>
    </Link>
  );
}
