import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Configurar en Vercel: Settings → Environment Variables → RESEND_API_KEY
// Obtener en: resend.com → API Keys → Create API Key (gratis, 100 emails/día)

const DESTINATION = 'contacto@dimoe.cl';
const FROM = 'DiMOE Landing <onboarding@resend.dev>';

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurado — email no enviado');
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: DESTINATION,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} — DiMOE Landing`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#333">
          <h2 style="color:#C17A3B;margin:0 0 24px">Nuevo mensaje desde dimoe.cl</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:90px">Nombre</td><td style="padding:8px 0;font-weight:600">${nombre}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#C17A3B">${email}</a></td></tr>
          </table>
          <div style="margin:20px 0;padding:16px;background:#f9f9f9;border-radius:8px;border-left:3px solid #C17A3B">
            <p style="margin:0;white-space:pre-wrap">${mensaje}</p>
          </div>
          <p style="font-size:12px;color:#999;margin-top:24px">Enviado desde el formulario de contacto de dimoe.cl</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
