import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './icons'
// Fase 2: reactivar guardado en Supabase (tabla contact_messages)
// import { supabase } from '../lib/supabase'
import { useLang } from '../context/LanguageContext'
import type { ContactForm } from '../types'

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
                { icon: <GithubIcon size={20} />, label: 'github.com/PiaAchigar', href: 'https://github.com/PiaAchigar' },
                { icon: <LinkedinIcon size={20} />, label: 'linkedin.com/in/pia-achigar', href: 'https://www.linkedin.com/in/pia-achigar/' },
                { icon: <InstagramIcon size={20} />, label: '@piadeveloper', href: 'https://www.instagram.com/piadeveloper/' },
                { icon: <WhatsAppIcon size={20} />, label: 'whatsapp', href: 'https://wa.me/5491130317884' },
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
