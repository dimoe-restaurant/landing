import { NextRequest, NextResponse } from 'next/server';

const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';
const DEBUG_TOKEN = 'dimoe-debug-2026';

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== DEBUG_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Sin API key' }, { status: 500 });

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', PLACE_ID);
  url.searchParams.set('fields', 'rating,reviews');
  url.searchParams.set('language', 'es');
  url.searchParams.set('reviews_sort', 'newest');
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}
