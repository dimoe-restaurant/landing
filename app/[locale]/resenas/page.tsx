import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/sections/Footer';
import type { GoogleReview } from '@/components/sections/ReviewsCards';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Reviews — DiMOE Pizzería Napolitana | Paine' : 'Reseñas — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'Read what customers say about DiMOE, the award-winning Neapolitan pizza restaurant in Paine, Chile.'
      : 'Lee lo que dicen los clientes sobre DiMOE, la pizzería napolitana premiada en Paine, Chile.',
  };
}

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';
const TRIPADVISOR_URL = 'https://www.tripadvisor.com/Restaurant_Review-g5981996-d34460013-Reviews-Dimoe_Restaurant-Paine_Santiago_Metropolitan_Region.html';
const PLACE_ID = 'ChIJs8epApEjY5YRphwLvQ4OeKo';

type LegacyReview = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type LegacyResponse = {
  result?: { rating?: number; reviews?: LegacyReview[] };
  status?: string;
};

async function fetchAllReviews(): Promise<{ reviews: GoogleReview[] | null; placeRating: number | null; totalRatings: number | null }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { reviews: null, placeRating: null, totalRatings: null };

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', PLACE_ID);
    url.searchParams.set('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.set('language', 'es');
    url.searchParams.set('reviews_sort', 'newest');
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 600 } });
    if (!res.ok) return { reviews: null, placeRating: null, totalRatings: null };

    const data = await res.json() as LegacyResponse & { result?: { user_ratings_total?: number } };
    if (data.status !== 'OK' || !data.result) return { reviews: null, placeRating: null, totalRatings: null };

    const reviews = (data.result.reviews ?? [])
      .sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
      .map(r => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text ?? '',
        relative_time_description: r.relative_time_description ?? '',
        publish_time: r.time ? new Date(r.time * 1000).toISOString() : undefined,
        profile_photo_url: r.profile_photo_url,
        author_uri: r.author_url,
      }));

    return { reviews, placeRating: data.result.rating ?? null, totalRatings: data.result.user_ratings_total ?? null };
  } catch {
    return { reviews: null, placeRating: null, totalRatings: null };
  }
}

const AVATAR_COLORS = ['#5B7FA6', '#6B9E78', '#A67B5B', '#7B6BA6', '#A68B5B'];

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  const full = Math.floor(count);
  const empty = 5 - full;
  const starPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#C17A3B" aria-hidden><path d={starPath} /></svg>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#2A2520" aria-hidden><path d={starPath} /></svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

const FALLBACK_REVIEWS: GoogleReview[] = [
  { author_name: 'María J.', rating: 5, text: 'La pizza napolitana más auténtica que he probado en Chile. El nuevo local es espectacular — amplio, con terraza y patio. La atmósfera de noche, con las lucecitas, es realmente especial. Ya somos habitués.', relative_time_description: 'hace 2 semanas' },
  { author_name: 'Felipe R.', rating: 5, text: 'El nivel es constante y alto. Los cócteles están perfectamente ejecutados y la carta de vinos sorprende para un lugar en Paine. Vale mucho la pena el viaje desde Santiago, más aún con estacionamiento propio.', relative_time_description: 'hace 1 mes' },
  { author_name: 'Carolina M.', rating: 5, text: 'Fuimos con nuestra perra y la bienvenida fue increíble — el patio es perfecto para mascotas. La pizza San Marzano es sublime. El nuevo local tiene mucho más espacio y las mesas están bien distribuidas.', relative_time_description: 'hace 3 semanas' },
  { author_name: 'Rodrigo V.', rating: 5, text: 'Primera vez que voy y quedé impresionado. La masa es diferente a todo lo que había probado — ligera, crujiente, con ese sabor ahumado del horno de leña. Los cócteles también excelentes.', relative_time_description: 'hace 1 mes' },
  { author_name: 'Francisca T.', rating: 5, text: 'Llevé a mis papás que son muy exigentes con la pizza italiana y salieron fascinados. El lugar es bonito, el servicio cálido y la Mechada e Cipolla es simplemente de otro nivel.', relative_time_description: 'hace 2 meses' },
];

export default async function ResenasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const { reviews, placeRating, totalRatings } = await fetchAllReviews();

  const displayReviews = reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;
  const ratingDisplay = placeRating != null ? placeRating.toFixed(1) : '4.8';

  return (
    <main style={{ background: '#0D0B09', paddingTop: '72px' }}>
      {/* Back */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(242,237,228,0.45)', textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {isEn ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 24px) 0', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
          {isEn ? 'Reviews' : 'Reseñas'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: '0 0 24px' }}>
          {isEn ? 'What our guests say' : 'Lo que dicen nuestros clientes'}
        </h1>

        {/* Rating badge */}
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#181310', border: '1px solid #2A2520', borderRadius: '100px', padding: '10px 20px', textDecoration: 'none', marginBottom: '12px' }}
        >
          <GoogleLogo />
          <Stars count={placeRating ?? 4.8} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F2EDE4' }}>{ratingDisplay}</span>
          {totalRatings && <span style={{ fontSize: '13px', color: '#9B8B7E' }}>· {totalRatings} {isEn ? 'reviews' : 'reseñas'}</span>}
          {!totalRatings && <span style={{ fontSize: '13px', color: '#9B8B7E' }}>· Google Business</span>}
        </a>

        {/* Award */}
        <div>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', color: '#C17A3B', textTransform: 'uppercase', border: '1px solid rgba(193,122,59,0.35)', borderRadius: '100px', padding: '7px 20px' }}>
            {isEn ? '🏆 2nd place Top Chile 2025 · @thetopchile' : '🏆 2° lugar Top Chile 2025 · @thetopchile'}
          </span>
        </div>
      </div>

      {/* Reviews grid */}
      <div style={{ maxWidth: '1100px', margin: '56px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '16px' }}>
          {displayReviews.map((review, i) => {
            const initial = review.author_name.charAt(0).toUpperCase();
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div key={i} style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {review.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={review.profile_photo_url} alt={review.author_name} width={40} height={40} referrerPolicy="no-referrer" crossOrigin="anonymous" style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>{initial}</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#F2EDE4', margin: '0 0 2px' }}>{review.author_name}</p>
                    <p style={{ fontSize: '11px', color: '#9B8B7E', margin: 0 }}>
                      {review.publish_time ? formatDate(review.publish_time) : review.relative_time_description}
                    </p>
                  </div>
                  <GoogleLogo />
                </div>
                <Stars count={review.rating} />
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242,237,228,0.65)', margin: 0 }}>&ldquo;{review.text}&rdquo;</p>
                {review.author_uri && (
                  <a href={review.author_uri} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#C17A3B', textDecoration: 'none', alignSelf: 'flex-start', opacity: 0.85 }}>
                    {isEn ? 'View on Google →' : 'Ver en Google →'}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ textAlign: 'center', marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#181310', border: '1px solid #2A2520', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 500, color: '#F2EDE4', textDecoration: 'none' }}
          >
            <GoogleLogo />
            {isEn ? 'Leave a review on Google' : 'Dejar una reseña en Google'}
          </a>
          <a href={TRIPADVISOR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#9B8B7E', textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><circle cx="7.5" cy="13" r="5" fill="#00AA6C" /><circle cx="16.5" cy="13" r="5" fill="#00AA6C" /><circle cx="7.5" cy="13" r="3" fill="white" /><circle cx="16.5" cy="13" r="3" fill="white" /><circle cx="7.5" cy="13" r="1.6" fill="#00AA6C" /><circle cx="16.5" cy="13" r="1.6" fill="#00AA6C" /></svg>
            {isEn ? 'Also on TripAdvisor — be the first to review us →' : '¿Ya visitaste DiMOE? Sé el primero en reseñarnos en TripAdvisor →'}
          </a>
        </div>
      </div>

      <div style={{ height: 'clamp(64px, 8vw, 96px)' }} />
      <Footer />
    </main>
  );
}
