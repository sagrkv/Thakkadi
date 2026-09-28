import Link from 'next/link';

interface ToolCardProps {
  readonly href: string;
  readonly title: string;
  readonly attribution: string;
  readonly description: string;
  readonly linkText: string;
}

export default function ToolCard({
  href,
  title,
  attribution,
  description,
  linkText,
}: ToolCardProps) {
  return (
    <Link href={href} className="tool-card group">
      <h3 className="tool-card-title">{title}</h3>

      <p className="tool-card-attribution">{attribution}</p>

      <p className="tool-card-description">{description}</p>

      <span className="tool-card-link">
        {linkText} &rarr;
      </span>
    </Link>
  );
}
