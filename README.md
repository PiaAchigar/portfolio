# Portfolio — María Pía Achigar

Portfolio personal de María Pía Achigar, FullStack Developer. SPA con diseño dark mode, toggle de idioma ES/EN, proyectos consumidos desde Supabase y formulario de contacto con envío de email.

🔗 **[Ver en producción](https://www.vercel.app)** 

---

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend/DB:** Supabase (proyectos + mensajes de contacto)
- **Email:** Supabase Edge Functions + Resend
- **Deploy:** Vercel

## Secciones

- Hero con foto y links sociales
- Sobre mí — descripción, educación y cursos
- Habilidades — Frontend, Backend, Herramientas, Automatización & IA
- Experiencia — timeline cronológico
- Proyectos — consumidos desde Supabase con fallback local
- Contacto — formulario que guarda en Supabase y envía email a achigarpia@gmail.com

## Correr localmente

```bash
npm install
npm run dev
```

Crear un archivo `.env` en la raíz con:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## Configurar Supabase

1. Ejecutar `../supabase/schema.sql` en el SQL Editor de Supabase
2. Deploy de la Edge Function:
   ```bash
   supabase functions deploy send-contact-email
   supabase secrets set RESEND_API_KEY=tu-resend-key
   ```


Gracias por leer...
