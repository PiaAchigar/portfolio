export const config = { runtime: 'edge' }

const RESEND_API_KEY = process.env.RESEND_API_KEY!
const TO_EMAIL = 'achigarpia@gmail.com'

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const { name, phone, message } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Pía <porfolioPia@resend.dev>',
        to: [TO_EMAIL],
        subject: `Pia: Nuevo mensaje desde tu portfolio de: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Nuevo mensaje desde tu portfolio</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Nombre:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Teléfono:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Mensaje:</td>
                <td style="padding: 8px 0; color: #111827;">${message}</td>
              </tr>
            </table>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
