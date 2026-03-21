import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-bold text-white tracking-tighter">
            piaDev<span className="text-indigo-500">.</span>
          </span>

          <p className="text-gray-600 text-sm">
            © {year} María Pía Achigar. {t.footer.rights}
          </p>

          <div className="flex items-center gap-5">
            {[
              { href: 'https://github.com/PiaAchigar', icon: <Github size={18} /> },
              { href: 'https://www.linkedin.com/in/pia-achigar/', icon: <Linkedin size={18} /> },
              { href: 'https://www.instagram.com/piadeveloper/', icon: <Instagram size={18} /> },
              { href: 'mailto:achigarpia@gmail.com', icon: <Mail size={18} /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-400 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
