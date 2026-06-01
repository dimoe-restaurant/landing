import { NextResponse } from 'next/server';

// Configurar INSTAGRAM_ACCESS_TOKEN en Vercel:
// Meta Business Manager → System Users → Generate Token (never expire)
// El System User debe tener permisos sobre la cuenta @dimoe_restobar
// Ver tarea #6 para instrucciones de setup completo

const FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,timestamp';
const LIMIT = 9;

export const revalidate = 3600; // ISR: refrescar cada hora

export interface InstagramPost {
  id: string;
  url: string;
  permalink: string;
  type: string;
  timestamp: string;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'INSTAGRAM_ACCESS_TOKEN no configurado', posts: [] },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Instagram API error:', err);
      return NextResponse.json({ error: 'Error al obtener el feed', posts: [] }, { status: 502 });
    }

    const data = await res.json();
    const posts: InstagramPost[] = (data.data ?? [])
      .filter((p: any) => p.media_type !== 'VIDEO' || p.thumbnail_url)
      .map((p: any) => ({
        id: p.id,
        url: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        permalink: p.permalink,
        type: p.media_type,
        timestamp: p.timestamp,
      }));

    return NextResponse.json({ posts });
  } catch (err) {
    console.error('Instagram fetch error:', err);
    return NextResponse.json({ error: 'Error interno', posts: [] }, { status: 500 });
  }
}
