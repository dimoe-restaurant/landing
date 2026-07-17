import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Sin autenticación a propósito: solo desactiva Draft Mode en el navegador
 * que la invoca (borra la cookie __prerender_bypass propia), no expone ni
 * modifica nada del lado del servidor.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const draft = await draftMode()
  draft.disable()

  return NextResponse.redirect(new URL('/es/carta', req.url))
}
