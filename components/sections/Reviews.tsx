import { getTranslations } from 'next-intl/server';
import ReviewsCards, { type GoogleReview } from './ReviewsCards';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

type PlacesReview = {
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
};

async function fetchGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews',
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json() as { reviews?: PlacesReview[] };
    return (data.reviews ?? [])
      .filter(r => r.rating >= 4)
      .slice(0, 3)
      .map(r => ({
        author_name: r.authorAttribution?.displayName ?? 'Anónimo',
        rating: r.rating,
        text: r.text?.text ?? '',
        relative_time_description: r.relativePublishTimeDescription ?? '',
        profile_photo_url: r.authorAttribution?.photoUri,
      }));
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
