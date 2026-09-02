import { useEffect, useState } from 'react'
import { ExternalLink, Github, Clock } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Project } from '../types'
import { useLang } from '../context/LanguageContext'

// Fallback local projects while Supabase is being set up
const localProjects: Project[] = [
  {
  id: '1',
  title: 'Sistema central: migración BD (Access → Supabase), CRM, agenda, facturador, automatización WhatsApp con IA (OpenAI + n8n)',
  description_es:
    'Central Piubella es un sistema integral de gestión empresarial que centraliza operaciones de estética y pilates. Nació de la migración exitosa de una base de datos legacy (Access) hacia una arquitectura moderna en Supabase, eliminando limitaciones técnicas y escalabilidad.',
  description_en:
    'Central Piubella is a comprehensive business management system that centralizes operations for aesthetic and pilates studios. It emerged from a successful migration of a legacy database (Access) to a modern Supabase architecture, eliminating technical constraints and enabling scalability.',
  image_url: '/centralPiubella.png',
  live_url: 'https://central.piubellaesteticapilates.com.ar/',
  tags: ["Cloudflare Workers", "Hono", "Drizzle ORM", "Hyperdrive", "PostgreSQL 16", "Docker", "Wrangler", "Supabase", "Supabase Auth (JWT/JWKS/ES256)","pgvector", "JWKS","React", "Vite", "TypeScript", "Node.js", "n8n", "OpenAI (embeddings), Claude (generación)", "RAG", "MercadoPago", "ARCA (AFIP)", "Cloudflare R2"],
  wip: false,
  order: 1,
  github_url:'https://github.com/PiaAchigar/api-sistema-central',
  width: 1357,
  height: 644,
},
{
  id: '2',
  title: 'SaaS CRM',
  description_es:
    'CRM especializado para equipos comerciales. Incluye dashboard intuitivo, gestión de contactos, pipeline visual, reportes analíticos y control de usuarios. Optimiza tu flujo de ventas.',
  description_en:
    'CRM built for sales teams. Features intuitive dashboard, contact management, visual pipeline, analytics reports, and user access control. Streamline your sales workflow.',
  image_url: '/saas_crm_complexa.png',
  live_url: 'https://crm.complexa.com.ar/',
  tags: ['React', 'TypeScript', 'Node.js', 'Express', 'JWT', 'Vercel', 'Railway'],
  wip: true,
  order: 1,
  github_url:'https://github.com/PiaAchigar/saas-crm',
  width: 1357,
  height: 644,
},
{
  id: '3',
  title: 'Página PiuBella',
  description_es:
  'Página web de servicios con búsqueda inteligente potenciada por IA. Integra agenda de citas, catálogo de servicios y reservas online.',
  description_en:
  'Service website with AI-powered intelligent search. Integrates appointment scheduling, service catalog, and online booking.',
  image_url: '/pag_web_piu.png',
  live_url: 'https://www.piubellaesteticapilates.com.ar/',
  tags: ['React', 'TypeScript', 'Node.js', 'Express', 'JWT', 'Vercel'],
  wip: false,
  order: 1,
  github_url:'https://github.com/PiaAchigar/piubella_web',
  width: 1345,
  height: 641,
},
{
  id: '4',
  title: 'Album',
  description_es:
  'Sistema colaborativo para eventos: invitados inician sesión y suben fotos en tiempo real que se proyectan en pantalla durante la fiesta. Las imágenes se guardan automáticamente para los anfitriones, creando un álbum digital compartido de la celebración.',
  description_en:
  'Collaborative event photo gallery: guests log in and upload photos in real-time, instantly displayed on-screen during the party. Images are automatically saved for hosts, creating a shared digital album of the celebration—combining entertainment with permanent memories.',
  image_url: '/album.png',
  live_url: 'https://www.album.com.ar/login',
  tags: ['Cloudflare R2','React', 'TypeScript', 'Node.js', 'Express', 'JWT', 'Vercel'],
  wip: false,
  order: 1,
  github_url:'https://github.com/PiaAchigar/album',
  width: 1345,
  height: 641,
},
{
  id: '5',
  title: 'ChatBot IA con RAG',
  description_es:
    'ChatBot con OpenAI como Agent, alimentado por un RAG almacenado en Supabase. Automatización del flujo con n8n para respuestas inteligentes de WhatsApp.',
  description_en:
    'AI ChatBot using OpenAI as Agent, powered by a RAG stored in Supabase. n8n workflow automation for intelligent WhatsApp responses.',
  image_url: '/flow_n8n_chatBot.png',
  tags: ['OpenAI', 'Supabase', 'n8n', 'RAG', 'WhatsApp'],
  wip: false,
  order: 2,
  width: 1110,
  height: 612,
},
    {
    id: '6',
    title: 'E-commerce Rodyna',
    description_es:
      'Desarrollo integral de plataforma e-commerce para farmacia. Frontend con Vite.js, React y TypeScript. Backend con Node.js, Express y autenticación JWT. Deploy en Vercel.',
    description_en:
      'Full-stack e-commerce platform for a pharmacy. Frontend with Vite.js, React and TypeScript. Backend with Node.js, Express and JWT auth. Deployed on Vercel.',
    image_url: '/rodynaFarmacias.png',
    live_url: 'https://www.rodynafarmacias.com.ar',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'JWT', 'Vercel'],
    wip: true,
    order: 6,
    width: 1132,
    height: 612,
  },
    {
    id: '7',
    title: 'QR Generator',
    description_es:
      'Generador de códigos QR 100% local y sin límites. Alta calidad para impresión (300 DPI). Soporta WhatsApp, URLs, Google Maps, Instagram y Facebook.',
    description_en:
      'QR code generator 100% local and unlimited. High quality for printing (300 DPI). Supports WhatsApp, URLs, Google Maps, Instagram, and Facebook.',
    image_url: '/qr_generator.png',
    live_url: 'https://qr-generator-by-pia.streamlit.app/',
    tags: ['Python', 'Streamlit'],
    wip: false,
    order: 7,
    github_url:'https://github.com/PiaAchigar/qr_generator',
    width: 1352,
    height: 642,
  }
  //
]

export default function Projects() {
  const { t, lang } = useLang()
  const [projects, setProjects] = useState<Project[]>(localProjects)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order', { ascending: true })

      if (!error && data && data.length > 0) {
        setProjects(data)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">{t.projects.title}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t.projects.subtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map(project => (
            <div key={project.id} className="glow-card rounded-2xl overflow-hidden group">
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-[#0e0e12]">
                <img
                  src={project.image_url}
                  alt={project.title}
                  width={project.width}
                  height={project.height}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent" />
                {project.wip && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
                    <Clock size={12} />
                    {t.projects.wip}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {lang === 'es' ? project.description_es : project.description_en}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-full border border-indigo-500/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all"
                    >
                      <ExternalLink size={14} />
                      {t.projects.view}
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-white/10 text-gray-300 text-sm font-semibold rounded-full hover:border-indigo-500 hover:text-white transition-all"
                    >
                      <Github size={14} />
                      {t.projects.code}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
