import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog/parser';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found | Thakkadi' };

  return {
    title: `${post.title} — Thakkadi Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="mt-4">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <time
              dateTime={post.date}
              className="text-xs font-mono"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {formattedDate}
            </time>
            {post.tags.map((tag) => (
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
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
          >
            {post.excerpt}
          </p>
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Link href="/blog" className="rules-link">
          {'\u2190'} All posts
        </Link>
      </div>
    </div>
  );
}
