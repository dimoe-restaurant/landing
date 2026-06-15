import { NextRequest, NextResponse } from 'next/server';

const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';
const DEBUG_TOKEN = 'dimoe-debug-2026';

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== DEBUG_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Sin API key' }, { status: 500 });

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,reviews.rating,reviews.text,reviews.relativePublishTimeDescription,reviews.publishTime,reviews.googleMapsUri,reviews.authorAttribution',
      },
      cache: 'no-store',
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
