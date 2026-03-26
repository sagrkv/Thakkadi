import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/parser';

interface BlogCardProps {
  readonly post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      <div className="flex items-center gap-2 mb-2">
        <time
          dateTime={post.date}
          className="text-xs font-mono"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {formattedDate}
        </time>
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              fontSize: '0.6875rem',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <h3
        className="text-base font-bold mb-1 leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-primary)',
        }}
      >
        {post.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {post.excerpt}
      </p>
    </Link>
  );
}
