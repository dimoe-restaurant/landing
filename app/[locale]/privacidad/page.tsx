import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad — DiMOE',
  description: 'Política de privacidad de DiMOE Pizzería y Restobar conforme a la Ley 21.719 de Chile.',
  robots: { index: false, follow: false },
};

const LAST_UPDATED = '1 de junio de 2025';

export default function PrivacidadPage() {
  const section = (title: string, content: React.ReactNode) => (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 16px', borderBottom: '1px solid #2A2520', paddingBottom: '12px' }}>
        {title}
      </h2>
      {content}
    </section>
  );

  const p = (text: React.ReactNode) => (
    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#9B8B7E', margin: '0 0 12px' }}>{text}</p>
  );

  const li = (text: React.ReactNode) => (
    <li style={{ fontSize: '15px', lineHeight: 1.75, color: '#9B8B7E', marginBottom: '8px' }}>{text}</li>
  );

  return (
    <main style={{ background: '#0D0B09', minHeight: '100vh', paddingTop: '96px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 96px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#C17A3B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
            ← Volver al inicio
          </Link>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#F2EDE4', margin: '0 0 12px', lineHeight: 1.15 }}>
            Política de Privacidad
          </h1>
          <p style={{ fontSize: '13px', color: '#9B8B7E', margin: 0 }}>Última actualización: {LAST_UPDATED}</p>
        </div>

        {section('1. Responsable del tratamiento', <>
          {p(<>El responsable del tratamiento de los datos personales recopilados a través de este sitio web es <strong style={{ color: '#F2EDE4' }}>DiMOE Pizzería Napolitana y Restobar</strong>, RUT disponible previa solicitud, con domicilio en Darío Pavez 16, Champa, Paine, Región Metropolitana, Chile.</>)}
          {p(<>Contacto: <a href="mailto:contacto@dimoe.cl" style={{ color: '#C17A3B' }}>contacto@dimoe.cl</a> · +56 9 7369 4101</>)}
        </>)}

        {section('2. Datos que recopilamos', <>
          {p('Podemos recopilar los siguientes datos personales:')}
          <ul style={{ paddingLeft: '20px', margin: '0 0 12px' }}>
            {li('Datos de contacto: nombre y correo electrónico, cuando envías un mensaje a través de nuestro formulario de contacto.')}
            {li('Datos de navegación: dirección IP, tipo de navegador, páginas visitadas y tiempo de sesión, recopilados a través de herramientas de analítica web (Google Analytics 4) cuando aceptas las cookies analíticas.')}
            {li('Datos de interacción: clics en botones de WhatsApp e Instagram, con fines estadísticos internos.')}
          </ul>
          {p('No recopilamos datos sensibles ni datos de pago. No usamos formularios con datos de menores de 14 años.')}
        </>)}

        {section('3. Finalidad del tratamiento', <>
          {p('Los datos recopilados se utilizan para:')}
          <ul style={{ paddingLeft: '20px', margin: '0 0 12px' }}>
            {li('Responder consultas, reservas y solicitudes enviadas a través del formulario de contacto.')}
            {li('Mejorar el funcionamiento y contenido del sitio web mediante análisis estadístico anónimo.')}
            {li('Gestionar campañas publicitarias en redes sociales (Meta Pixel) cuando el usuario otorga su consentimiento.')}
          </ul>
        </>)}

        {section('4. Base legal del tratamiento', <>
          {p('El tratamiento de tus datos se basa en:')}
          <ul style={{ paddingLeft: '20px', margin: '0 0 12px' }}>
            {li('Tu consentimiento explícito, para cookies analíticas y publicitarias.')}
            {li('El interés legítimo del responsable, para responder mensajes de contacto y mejorar el servicio.')}
          </ul>
        </>)}

        {section('5. Conservación de datos', <>
          {p('Los datos de formularios de contacto se conservan por un máximo de 12 meses desde la última comunicación. Los datos analíticos son gestionados por Google según sus propias políticas de retención.')}
        </>)}

        {section('6. Cookies', <>
          {p('Este sitio utiliza cookies propias (esenciales para el funcionamiento) y de terceros (analíticas y publicitarias, sujetas a tu consentimiento). Puedes gestionar tus preferencias en cualquier momento mediante el banner de cookies o eliminándolas desde la configuración de tu navegador.')}
          {p('Cookies analíticas: Google Analytics 4 (Google LLC, EE.UU.).')}
          {p('Cookies publicitarias: Meta Pixel (Meta Platforms, Inc., EE.UU.).')}
        </>)}

        {section('7. Tus derechos', <>
          {p('Conforme a la Ley N° 19.628 y Ley N° 21.719 de Chile, tienes derecho a:')}
          <ul style={{ paddingLeft: '20px', margin: '0 0 12px' }}>
            {li('Acceder a los datos que tenemos sobre ti.')}
            {li('Rectificar datos inexactos o incompletos.')}
            {li('Solicitar la eliminación de tus datos (derecho al olvido).')}
            {li('Oponerte al tratamiento de tus datos con fines de marketing.')}
            {li('Solicitar la portabilidad de tus datos en formato estructurado.')}
          </ul>
          {p(<>Para ejercer estos derechos, escríbenos a <a href="mailto:contacto@dimoe.cl" style={{ color: '#C17A3B' }}>contacto@dimoe.cl</a>.</>)}
        </>)}

        {section('8. Transferencia internacional de datos', <>
          {p('Al utilizar Google Analytics y Meta Pixel, datos anónimos o pseudonimizados pueden ser procesados en servidores ubicados en Estados Unidos, sujetos a las garantías de adecuación establecidas por la normativa aplicable.')}
        </>)}

        {section('9. Cambios en esta política', <>
          {p('Podemos actualizar esta política periódicamente. La fecha de última actualización se indica al inicio del documento. El uso continuado del sitio web tras la publicación de cambios implica la aceptación de la nueva versión.')}
        </>)}

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #2A2520' }}>
          <Link href="/" style={{ fontSize: '14px', color: '#C17A3B', textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
