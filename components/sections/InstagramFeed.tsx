import InstagramGrid from './InstagramGrid';

const PROFILE_URL = 'https://instagram.com/dimoe_restobar';

interface Post { id: string; url: string; permalink: string; type: string }

async function getPosts(): Promise<Post[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&limit=9&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? [])
      .filter((p: any) => p.media_type !== 'VIDEO' || p.thumbnail_url)
      .map((p: any) => ({
        id: p.id,
        url: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        permalink: p.permalink,
        type: p.media_type,
      }));
  } catch {
    return [];
  }
}

export default async function InstagramFeed() {
  const posts = await getPosts();

  if (!posts.length) return null;

  return (
    <section id="instagram" style={{ background: '#0D0B09', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
            Instagram
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
            Seguinos en Instagram
          </h2>
        </div>

        <InstagramGrid posts={posts} />

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #2A2520', color: '#F2EDE4', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'border-color 0.2s' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @dimoe_restobar
          </a>
        </div>
      </div>
    </section>
  );
}
