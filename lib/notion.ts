const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  }
}

interface ContactPayload {
  nombre: string
  email: string
  telefono?: string | null
  mensaje: string
  marketing: boolean
}

export async function saveContact(data: ContactPayload): Promise<void> {
  const dbId = process.env.NOTION_DB_CONTACTOS
  if (!dbId || !process.env.NOTION_ACCESS_TOKEN) return

  const mensajeCompleto = [
    data.mensaje,
    data.telefono ? `\n📞 ${data.telefono}` : null,
    data.marketing ? '\n✅ Autoriza comunicaciones de marketing' : '\n❌ No autoriza marketing',
  ]
    .filter(Boolean)
    .join('')

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        Nombre: { title: [{ text: { content: data.nombre } }] },
        Email: { email: data.email },
        Mensaje: { rich_text: [{ text: { content: mensajeCompleto } }] },
        Fecha: { date: { start: new Date().toISOString() } },
        Estado: { select: { name: 'Nuevo' } },
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    console.error('[Notion] saveContact error:', err)
  }
}
