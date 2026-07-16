const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  }
}

export type ContactTipo = 'Consulta' | 'Sugerencia' | 'Reclamo' | 'Felicitación'
export type ContactOrigen = 'Home' | 'Atención Cliente'
export type ContactDispositivo = 'Mobile' | 'Desktop'

interface ContactPayload {
  nombre: string
  email: string
  telefono?: string | null
  mensaje: string
  marketing: boolean
  tipo: ContactTipo
  origen: ContactOrigen
  ip?: string | null
  dispositivo: ContactDispositivo
}

export async function saveContact(data: ContactPayload): Promise<void> {
  const dbId = process.env.NOTION_DB_CONTACTOS
  if (!dbId || !process.env.NOTION_ACCESS_TOKEN) return

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        Nombre: { title: [{ text: { content: data.nombre } }] },
        Email: { email: data.email },
        Teléfono: data.telefono ? { phone_number: data.telefono } : { phone_number: null },
        Mensaje: { rich_text: [{ text: { content: data.mensaje } }] },
        Marketing: { checkbox: data.marketing },
        Tipo: { select: { name: data.tipo } },
        Origen: { select: { name: data.origen } },
        IP: data.ip ? { rich_text: [{ text: { content: data.ip } }] } : { rich_text: [] },
        Dispositivo: { select: { name: data.dispositivo } },
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
