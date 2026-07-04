import { getTranslations } from 'next-intl/server';
import ReviewsCards, { type GoogleReview } from './ReviewsCards';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

// Old Places API — battle-tested, profile_photo_url es URL directa de CDN
type LegacyReview = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time?: number; // Unix timestamp
};

type LegacyResponse = {
  result?: {
    rating?: number;
    reviews?: LegacyReview[];
  };
  status?: string;
};

const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';

async function fetchGoogleReviews(): Promise<{ reviews: GoogleReview[] | null; placeRating: number | null }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { reviews: null, placeRating: null };

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', PLACE_ID);
    url.searchParams.set('fields', 'rating,reviews');
    url.searchParams.set('language', 'es');
    url.searchParams.set('reviews_sort', 'newest');
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 600 } });
    if (!res.ok) return { reviews: null, placeRating: null };

    const data = await res.json() as LegacyResponse;
    if (data.status !== 'OK' || !data.result) return { reviews: null, placeRating: null };

    const reviews = (data.result.reviews ?? [])
      .filter(r => r.rating >= 4 && r.text && r.text.trim().length > 0)
      .sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
      .slice(0, 3)
      .map(r => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text ?? '',
        relative_time_description: r.relative_time_description ?? '',
        publish_time: r.time ? new Date(r.time * 1000).toISOString() : undefined,
        profile_photo_url: r.profile_photo_url,
        author_uri: r.author_url,
      }));

    return { reviews, placeRating: data.result.rating ?? null };
  } catch {
    return { reviews: null, placeRating: null };
  }
}

export default async function Reviews() {
  const t = await getTranslations('reviews');
  const { reviews, placeRating } = await fetchGoogleReviews();

  const reviewSchema = reviews && reviews.length > 0
    ? {
        '@context': 'https://schema.org',
        '@graph': reviews.map(r => ({
          '@type': 'Review',
          itemReviewed: { '@id': 'https://dimoe.cl/#restaurant' },
          author: { '@type': 'Person', name: r.author_name },
          reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
          ...(r.publish_time ? { datePublished: r.publish_time.substring(0, 10) } : {}),
          reviewBody: r.text,
        })),
      }
    : null;

  return (
    <>
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema).replace(/</g, '\\u003c') }}
        />
      )}
      <ReviewsCards
        label={t('label')}
        headline={t('headline')}
        googleLabel={t('google_label')}
        award={t('award')}
        cta={t('cta')}
        googleMapsUrl={GOOGLE_MAPS_URL}
        reviews={reviews}
        placeRating={placeRating}
      />
    </>
  );
}
