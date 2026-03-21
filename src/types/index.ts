export interface Project {
  id: string
  title: string
  description_es: string
  description_en: string
  image_url: string
  live_url?: string
  github_url?: string
  tags: string[]
  wip: boolean
  order: number
}

export interface ContactForm {
  name: string
  phone: string
  message: string
}
