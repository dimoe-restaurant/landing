import { getTranslations } from 'next-intl/server';
import ReviewsCards, { type GoogleReview } from './ReviewsCards';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

type PlacesReview = {
  rating: number;
  text?: { text: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
    uri?: string;
  };
};

type PlacesResponse = {
  rating?: number;
  reviews?: PlacesReview[];
};

const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';

async function fetchGoogleReviews(): Promise<{ reviews: GoogleReview[] | null; placeRating: number | null }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { reviews: null, placeRating: null };

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,reviews',
        },
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) return { reviews: null, placeRating: null };
    const data = await res.json() as PlacesResponse;
    const reviews = (data.reviews ?? [])
      .filter(r => r.rating >= 4)
      .sort((a, b) => {
        const ta = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const tb = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return tb - ta;
      })
      .slice(0, 3)
      .map(r => ({
        author_name: r.authorAttribution?.displayName ?? 'Anónimo',
        rating: r.rating,
        text: r.text?.text ?? '',
        relative_time_description: r.relativePublishTimeDescription ?? '',
        publish_time: r.publishTime,
        profile_photo_url: r.authorAttribution?.photoUri,
        author_uri: r.authorAttribution?.uri,
      }));
    return { reviews, placeRating: data.rating ?? null };
  } catch {
    return { reviews: null, placeRating: null };
  }
}

export default async function Reviews() {
  const t = await getTranslations('reviews');
  const { reviews, placeRating } = await fetchGoogleReviews();

  return (
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
  );
}
