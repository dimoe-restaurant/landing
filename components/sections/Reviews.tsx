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

const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';

async function fetchGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
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
