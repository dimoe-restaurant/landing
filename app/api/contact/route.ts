import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContact, type ContactTipo, type ContactOrigen } from '@/lib/notion';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

const TIPOS_VALIDOS: ContactTipo[] = ['Consulta', 'Sugerencia', 'Reclamo', 'Felicitación'];
const ORIGENES_VALIDOS: ContactOrigen[] = ['Home', 'Atención Cliente'];

function deviceFromUserAgent(req: NextRequest): 'Mobile' | 'Desktop' {
  const ua = req.headers.get('user-agent') ?? '';
  return /Mobi|Android|iPhone|iPad/i.test(ua) ? 'Mobile' : 'Desktop';
}

const DESTINATION = 'contacto@dimoe.cl';
const FROM = 'DiMOE <contacto@dimoe.cl>';
const LOGO_URL = 'https://dimoe.cl/images/logo-transparent.png';
const LOGO_HEADER = `<tr><td style="background:#0D0B09;padding:28px 40px;text-align:center"><img src="${LOGO_URL}" alt="DiMOE" height="42" style="display:block;margin:0 auto;height:42px;width:auto"></td></tr>`;

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, c => HTML_ESCAPES[c]);
}

function notificationHtml(nombreRaw: string, emailRaw: string, telefonoRaw: string | null, mensajeRaw: string, marketing: boolean, tipo: ContactTipo, origen: ContactOrigen) {
  const nombre = escapeHtml(nombreRaw);
  const email = escapeHtml(emailRaw);
  const telefono = telefonoRaw ? escapeHtml(telefonoRaw) : null;
  const mensaje = escapeHtml(mensajeRaw);
  const fecha = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'full', timeStyle: 'short' });
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><style>:root{color-scheme:light}</style></head>
<body style="margin:0;padding:0;background:#F5F3F0;font-family:Georgia,'Times New Roman',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3F0;padding:40px 20px">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <!-- Header -->
        ${LOGO_HEADER}
        <!-- Subheader -->
        <tr><td style="padding:20px 40px 16px">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#9B8B7E;letter-spacing:0.08em;text-transform:uppercase">Nuevo mensaje desde dimoe.cl</p>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px"><div style="height:1px;background:#EDE8E2"></div></td></tr>
        <!-- Data -->
        <tr><td style="padding:24px 40px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:4px;width:100px">Nombre</td>
              <td style="font-family:Arial,sans-serif;font-size:15px;color:#1A1410;font-weight:600;padding-bottom:4px">${nombre}</td>
            </tr>
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:4px">Email</td>
              <td style="padding-bottom:4px"><a href="mailto:${email}" style="font-family:Arial,sans-serif;font-size:15px;color:#C17A3B;text-decoration:none">${email}</a></td>
            </tr>
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:4px">Teléfono</td>
              <td style="font-family:Arial,sans-serif;font-size:15px;color:#1A1410;padding-bottom:4px">${telefono ? `<a href="https://wa.me/${telefono.replace(/\D/g,'')}" style="color:#C17A3B;text-decoration:none">${telefono}</a>` : '<span style="color:#9B8B7E">—</span>'}</td>
            </tr>
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:4px">Tipo</td>
              <td style="padding-bottom:4px"><span style="display:inline-block;font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#C17A3B;background:rgba(193,122,59,0.12);border-radius:100px;padding:3px 12px">${tipo}</span></td>
            </tr>
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:4px">Origen</td>
              <td style="font-family:Arial,sans-serif;font-size:13px;color:#5A4A3F;padding-bottom:4px">${origen}</td>
            </tr>
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em">Marketing</td>
              <td style="font-family:Arial,sans-serif;font-size:13px;color:${marketing ? '#2A7A4B' : '#9B8B7E'}">${marketing ? 'Sí, autoriza comunicaciones' : 'No autoriza'}</td>
            </tr>
          </table>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px"><div style="height:1px;background:#EDE8E2"></div></td></tr>
        <!-- Mensaje -->
        <tr><td style="padding:24px 40px">
          <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:11px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em">Mensaje</p>
          <div style="background:#FAF8F5;border-left:3px solid #C17A3B;border-radius:0 8px 8px 0;padding:16px 20px">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#3A2E28;line-height:1.7;white-space:pre-wrap">${mensaje}</p>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:0 40px 32px">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#BDB3AB">${fecha}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationHtml(nombreRaw: string, caso: boolean) {
  const nombre = escapeHtml(nombreRaw);
  const bodyHtml = caso
    ? `<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:18px;color:#1A1410;line-height:1.5">Hola, ${nombre}.</p>
       <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;color:#5A4A3F;line-height:1.7">Nuestro equipo de servicio al cliente ya está revisando tu mensaje personalmente y te responderemos dentro de las próximas 24-48 horas.</p>
       <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#5A4A3F;line-height:1.7">Gracias por tomarte el tiempo de contarnos — es justamente lo que nos ayuda a mejorar cada día.</p>`
    : `<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:18px;color:#1A1410;line-height:1.5">Hola, ${nombre}.</p>
       <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;color:#5A4A3F;line-height:1.7">Recibimos tu mensaje y te responderemos a la brevedad.</p>
       <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#5A4A3F;line-height:1.7">Si necesitas hablar con alguien más rápido, puedes escribirnos al WhatsApp.</p>`;

  const infoHtml = caso
    ? `<tr><td style="padding:28px 40px;text-align:center">
         <a href="https://wa.me/56973694101" style="display:inline-block;background:#25D366;color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:100px">¿Prefieres hablar directo? Escríbenos por WhatsApp</a>
       </td></tr>`
    : `<tr><td style="padding:28px 40px">
         <table width="100%" cellpadding="0" cellspacing="0">
           <tr>
             <td style="font-family:Arial,sans-serif;font-size:12px;color:#9B8B7E;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:12px" colspan="2">Horarios</td>
           </tr>
           <tr>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#5A4A3F;padding-bottom:6px;width:160px">Mar – Jue</td>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#1A1410;font-weight:600;padding-bottom:6px">12:30 – 22:30</td>
           </tr>
           <tr>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#5A4A3F;padding-bottom:6px">Vie – Sáb</td>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#1A1410;font-weight:600;padding-bottom:6px">13:00 – 00:00</td>
           </tr>
           <tr>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#5A4A3F">Dom</td>
             <td style="font-family:Arial,sans-serif;font-size:13px;color:#1A1410;font-weight:600">13:00 – 17:30</td>
           </tr>
         </table>
       </td></tr>
       <!-- CTA WhatsApp -->
       <tr><td style="padding:0 40px 32px;text-align:center">
         <a href="https://wa.me/56973694101" style="display:inline-block;background:#25D366;color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:100px">Escribinos por WhatsApp</a>
       </td></tr>`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><style>:root{color-scheme:light}</style></head>
<body style="margin:0;padding:0;background:#F5F3F0;font-family:Georgia,'Times New Roman',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3F0;padding:40px 20px">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <!-- Header -->
        ${LOGO_HEADER}
        <!-- Divider -->
        <tr><td style="padding:0 40px"><div style="height:1px;background:#EDE8E2"></div></td></tr>
        <!-- Body -->
        <tr><td style="padding:36px 40px">
          ${bodyHtml}
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px"><div style="height:1px;background:#EDE8E2"></div></td></tr>
        <!-- Info -->
        ${infoHtml}
        <!-- Footer -->
        <tr><td style="background:#FAF8F5;padding:20px 40px;border-top:1px solid #EDE8E2">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#BDB3AB;text-align:center;line-height:1.6">
            Darío Pavez 16, Champa, Paine · <a href="https://dimoe.cl" style="color:#C17A3B;text-decoration:none">dimoe.cl</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const allowed = await checkRateLimit('contact', clientIp(req) ?? 'unknown');
    if (!allowed) {
      return NextResponse.json({ error: 'Demasiadas solicitudes, intenta de nuevo en un minuto' }, { status: 429 });
    }

    const { nombre, email, telefono, mensaje, marketing_consent, tipo, origen } = await req.json();

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const tipoFinal: ContactTipo = TIPOS_VALIDOS.includes(tipo) ? tipo : 'Consulta';
    const origenFinal: ContactOrigen = ORIGENES_VALIDOS.includes(origen) ? origen : 'Home';

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurado — email no enviado');
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const [notif, confirm, _notion] = await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: DESTINATION,
        replyTo: email,
        subject: `[${tipoFinal}] Mensaje de ${nombre}${telefono ? ` · ${telefono}` : ''} — DiMOE`,
        html: notificationHtml(nombre, email, telefono ?? null, mensaje, !!marketing_consent, tipoFinal, origenFinal),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: origenFinal === 'Atención Cliente' ? 'Tu mensaje ya está siendo revisado — DiMOE' : 'Recibimos tu mensaje — DiMOE',
        html: confirmationHtml(nombre, origenFinal === 'Atención Cliente'),
      }),
      saveContact({
        nombre,
        email,
        telefono: telefono ?? null,
        mensaje,
        marketing: !!marketing_consent,
        tipo: tipoFinal,
        origen: origenFinal,
        ip: clientIp(req),
        dispositivo: deviceFromUserAgent(req),
      }),
    ]);

    if (notif.status === 'rejected' || confirm.status === 'rejected') {
      const reason = notif.status === 'rejected' ? (notif as PromiseRejectedResult).reason : (confirm as PromiseRejectedResult).reason;
      console.error('Resend error:', reason);
      return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
    }

    const notifVal = (notif as PromiseFulfilledResult<typeof notif extends PromiseFulfilledResult<infer T> ? T : never>).value;
    const confirmVal = (confirm as PromiseFulfilledResult<typeof confirm extends PromiseFulfilledResult<infer T> ? T : never>).value;

    if (notifVal.error || confirmVal.error) {
      console.error('Resend error:', notifVal.error ?? confirmVal.error);
      return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
    }

    if (_notion.status === 'rejected') {
      console.error('[Notion] saveContact error:', (_notion as PromiseRejectedResult).reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
