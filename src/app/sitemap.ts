import type { MetadataRoute } from 'next';
import { getAllActSlugs } from '@/data/laws';
import { getAllPosts } from '@/lib/blog/parser';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thakkadi.in';

  const actSlugs = getAllActSlugs();

  return [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/limitation-calculator`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/court-fee-calculator`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stamp-duty-calculator`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/limitation-calculator/rules`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/court-fee-calculator/rules`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/laws`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...actSlugs.map((slug) => ({
      url: `${baseUrl}/laws/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/blog`,
    },
    ...getAllPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
    })),
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/feedback`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
