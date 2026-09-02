import { MapPin, GraduationCap, BookOpen, Globe } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const courses = [
  'CoderHouse — Frontend 2020–2021',
  'CoderHouse — Metodologías Ágiles 2020',
  'CoderHouse — Community Manager 2021',
  'CoderHouse — Diseño UX/UI 2021–2022',
  'CoderHouse — Backend 2022',
  'UTN — Python 2023',
  'DigitalHouse — Data Science 2024'
]

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">{t.about.title}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t.about.subtitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: photo + text */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/piaDev.jpeg"
                alt="Pía trabajando"
                width={2560}
                height={1440}
                loading="lazy"
                className="w-full h-72 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} className="text-indigo-400" />
              {t.about.location}
            </div>

            <p className="text-gray-400 leading-relaxed">{t.about.p1}</p>
            <p className="text-gray-400 leading-relaxed">{t.about.p2}</p>
            <p className="text-gray-300 leading-relaxed font-medium">{t.about.p3}</p>
          </div>

          {/* Right: cards */}
          <div className="space-y-5">

            {/* Education */}
            <div className="glow-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <GraduationCap size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t.about.education}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">▸</span>
                  {t.about.edu_cyber}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">▸</span>
                  {t.about.edu_systems}
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div className="glow-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-purple-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t.about.courses}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-400 text-sm">
                {courses.map(c => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="glow-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Globe size={20} className="text-pink-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t.about.languages}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-pink-400 mr-2">▸</span>
                {t.about.lang_english}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
