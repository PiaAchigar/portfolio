import { useLang } from '../context/LanguageContext'

interface ExpItem {
  period: string
  company: string
  role_es: string
  role_en: string
  bullets_es: string[]
  bullets_en: string[]
  tags: string[]
}

const experiences: ExpItem[] = [
  {
    period: 'Mar 2026',
    company: 'Piubella',
    role_es: 'Automatización & Full Stack',
    role_en: 'Automation & Full Stack',
    bullets_es: [
      'Desarrollo de Sistema Central (ERP) completo con facturación AFIP, CRM avanzado para gestión de clientes, agenda inteligente y automatización WhatsApp potenciada con IA',
      'Migración de base de datos Microsoft Access a Supabase PostgreSQL.',
      'Confección de workflow de automatización de respuestas de WhatsApp con RAG en Supabase y Agent IA (OpenAI).',
      'Desarrollo de CRM conectado al workflow de n8n (self-hosted).',
    ],
    bullets_en: [
      'ERP development, with AFIP invoicing, an advanced CRM for customer management, intelligent scheduling, and WhatsApp automation powered by AI.',
      'Database migration from Microsoft Access to Supabase PostgreSQL.',
      'WhatsApp auto-response workflow with RAG on Supabase and AI Agent (OpenAI).',
      'CRM development integrated with self-hosted n8n workflow.',
    ],
    tags: ['n8n', 'Supabase', 'OpenAI', 'CRM'],
  },
  {
    period: 'Jul 2025',
    company: 'Desarrolladora Full Stack',
    role_es: 'Freelance',
    role_en: 'Full Stack Developer',
    bullets_es: [
      'E-commerce Rodyna: Frontend con Vite.js, React, TypeScript. Backend con Node.js, Express y JWT. Deploy en Vercel. (www.rodynafarmacias.com.ar)',
      'Sistema de Gestión de Inventario Complexa: React.js, Chakra UI, Redux Toolkit, Node.js, Express, MongoDB. Principios SOLID.',
    ],
    bullets_en: [
      'Rodyna E-commerce: Frontend with Vite.js, React, TypeScript. Backend with Node.js, Express and JWT. Deployed on Vercel. (www.rodynafarmacias.com.ar)',
      'Complexa Inventory Management System: React.js, Chakra UI, Redux Toolkit, Node.js, Express, MongoDB. SOLID principles.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Vercel'],
  },
  {
    period: 'Jun 2025 - Actualmente',
    company: 'ITBA',
    role_es: 'Docente Full Stack',
    role_en: 'Full Stack Instructor',
    bullets_es: [
      'Dictado de clases de desarrollo Full Stack a alumnos del ITBA.',
      'Enseñanza práctica del desarrollo de un E-commerce completo desde cero.',
    ],
    bullets_en: [
      'Full Stack development classes for ITBA students.',
      'Hands-on teaching of end-to-end E-commerce development from scratch.',
    ],
    tags: ['React', 'Node.js', 'E-commerce', 'Full Stack'],
  },
  {
    period: 'Jul 2022 — Jun 2025',
    company: 'DigitalHouse Schools',
    role_es: 'Mentor SSR JavaScript',
    role_en: 'SSR JavaScript Mentor',
    bullets_es: [
      'Desarrollo de proyectos educativos: Motor de juego de laberintos, 3 Workspaces Blockly y Símil Replit.',
      'Testing con Mocha y Chai: validaciones automáticas de ejercicios en la plataforma Playground.',
      'Dictado de clases, coaching a docentes, corrección de entregables y mantenimiento de contenidos.',
    ],
    bullets_en: [
      'Educational project development: Maze game engine, 3 Blockly Workspaces and Replit-like IDE.',
      'Testing with Mocha & Chai: automated exercise validations on the Playground platform.',
      'Class teaching, teacher coaching, grading deliverables and content maintenance.',
    ],
    tags: ['Vite.js', 'Vanilla JS', 'Blockly.js', 'Mocha', 'Chai'],
  },
  {
    period: 'Jul 2021 — Jul 2022',
    company: 'CoderHouse',
    role_es: 'Tutora de Desarrollo Web & JavaScript',
    role_en: 'Web Development & JavaScript Tutor',
    bullets_es: [
      'Soporte a estudiantes en clases en vivo y fuera de horario.',
      'Dictado de After Class semanal y corrección de entregables.',
      'Seguimiento y motivación de estudiantes en su proceso de aprendizaje.',
    ],
    bullets_en: [
      'Student support during live classes and outside class hours.',
      'Weekly After Class sessions and grading of deliverables.',
      'Student follow-up and motivation throughout their learning journey.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    period: 'Mar — Jun 2021',
    company: 'CRESI',
    role_es: 'Colaboradora Frontend',
    role_en: 'Frontend Contributor',
    bullets_es: [
      'Maquetación y estilos del Footer, componente "Visitas a Escuelas" y "Políticas de Privacidad".',
      'Trabajo en equipo con diseñador UX/UI y otros frontends.',
    ],
    bullets_en: [
      'Layout and styling of Footer, "School Visits" and "Privacy Policy" components.',
      'Team collaboration with UX/UI designer and frontend developers.',
    ],
    tags: ['HTML', 'CSS', 'React'],
  },
  {
    period: '2010 — 2011',
    company: 'GSOFT',
    role_es: 'Pasantía Desarrollo Web',
    role_en: 'Web Development Internship',
    bullets_es: ['Maquetación y estilado. Trabajo en equipo.'],
    bullets_en: ['Layout and styling. Teamwork.'],
    tags: ['HTML', 'CSS'],
  },
]

export default function Experience() {
  const { t, lang } = useLang()

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">{t.experience.title}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t.experience.subtitle}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-transparent ml-4 md:ml-0" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0
              const bullets = lang === 'es' ? exp.bullets_es : exp.bullets_en
              const role = lang === 'es' ? exp.role_es : exp.role_en

              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#0a0a0c] -translate-x-1/2 z-10 shadow-lg shadow-indigo-500/50" />

                  {/* Period label (desktop) */}
                  <div className={`hidden md:flex flex-1 items-start ${isLeft ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                    <span className="text-indigo-400 text-sm font-mono font-medium pt-5">{exp.period}</span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 ml-10 md:ml-0 md:px-10">
                    <div className="glow-card rounded-2xl p-6">
                      {/* Mobile period */}
                      <span className="md:hidden text-indigo-400 text-xs font-mono block mb-1">{exp.period}</span>

                      <div className="mb-3">
                        <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {exp.company}
                        </h3>
                        <p className="text-gray-400 text-sm">{role}</p>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {bullets.map((b, j) => (
                          <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-indigo-400 mt-1 flex-shrink-0">▸</span>
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-full border border-indigo-500/20 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
