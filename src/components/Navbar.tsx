import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects', label: t.nav.projects },
  ]

  return (
    <nav className={`fixed w-full z-50 nav-glass transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold text-white tracking-tighter">
            piaDev<span className="text-indigo-500">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-medium uppercase tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white border border-white/10 hover:border-indigo-500 rounded-full px-3 py-1.5 transition-all"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <a
              href="#contact"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 text-sm"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 border border-white/10 rounded-full px-3 py-1.5"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-white p-1"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0c]/95 border-t border-white/5 px-4 py-6 flex flex-col gap-5">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white text-sm font-medium uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold text-center text-sm"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </nav>
  )
}
