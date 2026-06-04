import { getTranslations } from 'next-intl/server';
import ReviewsCards, { type GoogleReview } from './ReviewsCards';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

async function fetchGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es&reviews_sort=newest`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const reviews: GoogleReview[] = data.result?.reviews ?? [];
    return reviews.filter(r => r.rating >= 4).slice(0, 3);
  } catch {
    return null;
  }
}

export default async function Reviews() {
  const t = await getTranslations('reviews');
  const reviews = await fetchGoogleReviews();

  return (
    <ReviewsCards
      label={t('label')}
      headline={t('headline')}
      googleLabel={t('google_label')}
      award={t('award')}
      cta={t('cta')}
      googleMapsUrl={GOOGLE_MAPS_URL}
      reviews={reviews}
    />
  );
}
