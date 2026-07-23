import { NextRequest, NextResponse } from 'next/server';
import { saveContact } from '@/lib/notion';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

function deviceFromUserAgent(req: NextRequest): 'Mobile' | 'Desktop' {
  const ua = req.headers.get('user-agent') ?? '';
  return /Mobi|Android|iPhone|iPad/i.test(ua) ? 'Mobile' : 'Desktop';
}

function dobToIso(value: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value ?? '').trim());
  if (!match) return null;
  const [, ddStr, mmStr, yyyyStr] = match;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);
  const date = new Date(Date.UTC(yyyy, mm - 1, dd));
  const isRealDate = date.getUTCFullYear() === yyyy && date.getUTCMonth() === mm - 1 && date.getUTCDate() === dd;
  if (!isRealDate || date.getTime() > Date.now()) return null;
  return `${yyyyStr}-${mmStr}-${ddStr}`;
}

export async function POST(req: NextRequest) {
  try {
    const allowed = await checkRateLimit('lead-carta', clientIp(req) ?? 'unknown');
    if (!allowed) {
      return NextResponse.json({ error: 'Demasiadas solicitudes, intenta de nuevo en un minuto' }, { status: 429 });
    }

    const { nombre, email, telefono, fechaNacimiento, marketing_consent } = await req.json();

    if (!nombre?.trim() || !email?.trim() || !telefono?.trim()) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const fechaIso = dobToIso(fechaNacimiento);
    if (!fechaIso) {
      return NextResponse.json({ error: 'Fecha de nacimiento inválida' }, { status: 400 });
    }

    await saveContact({
      nombre,
      email,
      telefono,
      marketing: !!marketing_consent,
      origen: 'Carta - Nuevo Cliente',
      ip: clientIp(req),
      dispositivo: deviceFromUserAgent(req),
      fechaNacimiento: fechaIso,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead carta API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
