import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DiMOE — Pizzería Napolitana y Restobar',
    short_name: 'DiMOE',
    description: 'Pizza napolitana en horno de leña, pastas artesanales y cócteles de autor. 2° Mejor Restaurante de Chile 2025. En Paine, a 35 min de Santiago.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0B09',
    theme_color: '#C17A3B',
    lang: 'es-CL',
    orientation: 'portrait',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    categories: ['food', 'lifestyle'],
  };
}
