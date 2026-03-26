import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/seo/json-ld';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  readonly items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items
    .filter((item) => item.href)
    .map((item) => ({ name: item.label, url: item.href! }));

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(schemaItems)} />
      <nav className="breadcrumb mb-6 no-print" aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="breadcrumb-sep">{'\u203A'}</span>}
            {item.href ? (
              <Link href={item.href} className="breadcrumb-item">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-active">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
