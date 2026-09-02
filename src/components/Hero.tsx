import { Github, Linkedin, Instagram, Mail, ChevronDown } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="hero-mesh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold mb-8 border border-indigo-500/20 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
              {t.hero.available}
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
              {t.hero.title1}{' '}
              <span className="tech-gradient-text">{t.hero.title2}</span>
            </h1>

            <p className="text-gray-400 text-lg lg:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a
                href="#contact"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 text-sm"
              >
                {t.hero.cta_contact}
              </a>
              <a
                href="#projects"
                className="border border-white/10 text-white px-8 py-3.5 rounded-full font-semibold hover:border-indigo-500 hover:bg-indigo-500/5 transition-all text-sm"
              >
                {t.hero.cta_projects}
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 justify-center lg:justify-start">
              {[
                { href: 'https://github.com/PiaAchigar', icon: <Github size={20} /> },
                { href: 'https://www.linkedin.com/in/pia-achigar/', icon: <Linkedin size={20} /> },
                { href: 'https://www.instagram.com/piadeveloper/', icon: <Instagram size={20} /> },
                { href: 'mailto:achigarpia@gmail.com', icon: <Mail size={20} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-400 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative z-10 flex-shrink-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 blur-2xl opacity-30 scale-110" />
              <div className="relative w-full h-full rounded-full border-2 border-indigo-500/30 overflow-hidden shadow-2xl">
                <img
                  src="/pia.jpeg"
                  alt="María Pía Achigar"
                  width={800}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-indigo-400 transition-colors animate-bounce z-10"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
