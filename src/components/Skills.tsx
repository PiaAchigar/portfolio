import { useLang } from '../context/LanguageContext'

const skillGroups = [
  {
    key: 'frontend' as const,
    color: 'indigo',
    skills: ['HTML / CSS / JS', 'React.js', 'TypeScript', 'Vite.js', 'Tailwind CSS', 'Sass / Bootstrap', 'Chakra UI'],
  },
  {
    key: 'backend' as const,
    color: 'purple',
    skills: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'Supabase', 'PostgreSQL', 'JWT / Auth'],
  },
  {
    key: 'tools' as const,
    color: 'pink',
    skills: ['Git / GitHub', 'Figma', 'Notion', 'Whimsical', 'VSCode', 'Vercel', 'Claude Code'],
  },
  {
    key: 'automation' as const,
    color: 'violet',
    skills: ['n8n', 'Supabase RAG', 'OpenAI API', 'Workflows', 'CRM Integration'],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  indigo: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/20',
    dot: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    dot: 'bg-purple-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    dot: 'bg-pink-500',
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    dot: 'bg-violet-500',
  },
}

export default function Skills() {
  const { t } = useLang()

  const labels: Record<string, string> = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
    automation: t.skills.automation,
  }

  return (
    <section id="skills" className="py-24 relative">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">{t.skills.title}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t.skills.subtitle}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map(group => {
            const c = colorMap[group.color]
            return (
              <div key={group.key} className="glow-card rounded-2xl p-6">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border ${c.bg} ${c.text} ${c.border}`}>
                  {labels[group.key]}
                </div>
                <ul className="space-y-3">
                  {group.skills.map(skill => (
                    <li key={skill} className="flex items-center gap-3 text-gray-300 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
