import Link from 'next/link';
import ToolIcon from './ToolIcon';

interface ToolCardProps {
  readonly href: string;
  readonly title: string;
  readonly attribution: string;
  readonly description: string;
  readonly linkText: string;
  readonly number: string;
  readonly jurisdiction: string;
  readonly kind: 'deadline' | 'fee' | 'document';
}

export default function ToolCard({ href, title, attribution, description, linkText, number, jurisdiction, kind }: ToolCardProps) {
  return (
    <Link href={href} className={`tool-card tool-card-${kind}`}>
      <div className="tool-card-top"><span className="tool-symbol"><ToolIcon kind={kind} /></span><span className="tool-number">{number}</span></div>
      <p className="tool-jurisdiction">{jurisdiction}</p>
      <h3 className="tool-card-title">{title}</h3>
      <p className="tool-card-description">{description}</p>
      <p className="tool-card-attribution">{attribution}</p>
      <span className="tool-card-link">{linkText}<span className="tool-card-arrow" aria-hidden="true">↗</span></span>
    </Link>
  );
}
