interface SectionBadgeProps {
  readonly section: string;
}

export default function SectionBadge({ section }: SectionBadgeProps) {
  return (
    <span className="section-badge">
      {section}
    </span>
  );
}
