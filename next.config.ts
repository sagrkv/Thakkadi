import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  async rewrites() {
    // Keep existing feedback submissions in Netlify Forms after moving hosting.
    // Limit this rewrite to Vercel so Netlify never proxies back to itself.
    if (process.env.VERCEL !== '1') return [];

    return {
      beforeFiles: [
        {
          source: '/__forms.html',
          destination: 'https://thakkadi.netlify.app/__forms.html',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
