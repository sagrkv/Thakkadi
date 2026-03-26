import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thakkadi — Legal Calculator Suite',
    short_name: 'Thakkadi',
    description:
      'Free, open-source legal calculators for Indian lawyers. Limitation periods, Karnataka court fees, stamp duty — no login, no data stored.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0D9488',
    background_color: '#FAFAF8',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
