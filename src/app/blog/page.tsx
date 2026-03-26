import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog/parser';
import BlogCard from '@/components/blog/BlogCard';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Blog — Thakkadi',
  description:
    'Explainers, guides, and updates on Indian legal procedures, limitation periods, court fees, and new legislation.',
  alternates: { canonical: '/blog' },
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <h1
        className="text-2xl md:text-3xl font-extrabold mb-2 mt-4"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        Blog
      </h1>
      <p
        className="text-sm mb-8"
        style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
      >
        Explainers, guides, and updates on Indian legal procedures.
      </p>

      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
