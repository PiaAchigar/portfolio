import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail, Github, Linkedin, Instagram } from 'lucide-react'
// Fase 2: reactivar guardado en Supabase (tabla contact_messages)
// import { supabase } from '../lib/supabase'
import { useLang } from '../context/LanguageContext'
import type { ContactForm } from '../types'

// lucide-react no incluye íconos de marcas (WhatsApp, etc.)
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState<ContactForm>({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState(false)

  const isPhoneValid = (phone: string) => phone.trim() === '' || /^[\d\s()+-]{6,20}$/.test(phone.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPhoneValid(form.phone)) {
      setPhoneError(true)
      return
    }
    setPhoneError(false)
    setStatus('sending')

    try {
      // Fase 2: reactivar guardado en Supabase (tabla contact_messages)
      // const { error: dbError } = await supabase
      //   .from('contact_messages')
      //   .insert([{ name: form.name, phone: form.phone, message: form.message }])
      // if (dbError) throw dbError

      // Enviar email vía Vercel Function (Resend)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setStatus('success')
      setForm({ name: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">{t.contact.title}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t.contact.subtitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: info */}
          <div className="space-y-8">
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-4">
              {[
                { icon: <Mail size={20} />, label: 'achigarpia@gmail.com', href: 'mailto:achigarpia@gmail.com' },
                { icon: <Github size={20} />, label: 'github.com/PiaAchigar', href: 'https://github.com/PiaAchigar' },
                { icon: <Linkedin size={20} />, label: 'linkedin.com/in/pia-achigar', href: 'https://www.linkedin.com/in/pia-achigar/' },
                { icon: <Instagram size={20} />, label: '@piadeveloper', href: 'https://www.instagram.com/piadeveloper/' },
                { icon: <WhatsAppIcon size={20} />, label: 'whatsapp', href: 'https://wa.me/1530317884' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glow-card rounded-xl group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="glow-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">{t.contact.name}</label>
                <input
                  type="text"
                  required
                  placeholder={t.contact.name_ph}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input-tech"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">{t.contact.phone}</label>
                <input
                  type="tel"
                  placeholder={t.contact.phone_ph}
                  value={form.phone}
                  onChange={e => {
                    setForm(f => ({ ...f, phone: e.target.value }))
                    setPhoneError(false)
                  }}
                  className={`input-tech ${phoneError ? 'border-red-500' : ''}`}
                />
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1.5">{t.contact.phone_error}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">{t.contact.message}</label>
                <textarea
                  required
                  rows={5}
                  placeholder={t.contact.message_ph}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="input-tech resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t.contact.send}
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                  <CheckCircle size={16} />
                  {t.contact.success}
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle size={16} />
                  {t.contact.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
