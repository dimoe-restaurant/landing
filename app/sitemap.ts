import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://dimoe.cl', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://dimoe.cl/en', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://dimoe.cl/carta', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://dimoe.cl/en/carta', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://dimoe.cl/privacidad', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://dimoe.cl/en/privacidad', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
