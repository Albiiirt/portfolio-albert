# Portfolio — Albert Canadés

Portfolio profesional de Albert Canadés, diseñador Web / UI-UX en Barcelona.
Sitio en producción: [portfolio-albert-six.vercel.app](https://portfolio-albert-six.vercel.app).

## Stack

- **[Next.js](https://nextjs.org)** (App Router) + **TypeScript**
- **React 19** + **Framer Motion** para animaciones y scroll interactions
- Sin CSS-in-JS ni Tailwind: los estilos viven sobre todo como objetos de estilo inline en JSX, complementados con clases utilitarias y reglas responsive en `app/globals.css`
- Multi-idioma (ES/EN/CA) mediante un `LanguageContext` propio, sin librería de i18n
- Despliegue automático en **Vercel**: cada push a `main` va directo a producción — no hay entorno de staging

## Estructura

```
app/                    Rutas (App Router)
  layout.tsx            Layout raíz: fuentes, metadata global, schema.org
  page.tsx               Home
  proyectos/             Listado de proyectos (+ layout.tsx con su propia metadata)
  proyectos/[id]/        Página de caso de estudio por proyecto (+ generateMetadata)
  cv/                     Página de CV (+ layout.tsx con su propia metadata)
  sitemap.ts / robots.ts  SEO: rutas dinámicas generadas a partir de data/projects.ts

components/             Componentes de UI compartidos (Navigation, Hero, WorkSection,
                        About, Timeline, Contact, Footer, CustomCursor, PlanetOrbit...)
components/proyectos/   Una página de caso de estudio por proyecto (ElBulliPage.tsx,
                        MadridPage.tsx, JaenPage.tsx, CastelleraPage.tsx, GnossPage.tsx,
                        LaRiojaPage.tsx, MirazurPage.tsx) + NextProjectCard.tsx

data/
  projects.ts           Fuente de verdad de los proyectos: título, categoría, año,
                        descripción, problem/process/result y tags, todo en ES/EN/CA
  translations.ts       Todos los textos de la UI (nav, hero, about, contact, cv...)
                        en ES/EN/CA, consumidos vía el hook useLang()

lib/
  LanguageContext.tsx    Contexto + hook useLang() para el idioma activo
  animations.ts          Utilidades de animación compartidas (EASE, hooks de scroll)

public/
  covers/                 Imágenes/vídeos de portada de cada proyecto (.webp/.svg/.mp4)
  albert-canadas-cv.pdf   CV descargable desde /cv
```

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run lint      # eslint
```

## Añadir un proyecto nuevo al portfolio

1. **Añade la entrada en `data/projects.ts`**: `id`, `num`, `title`, `category`, `year`,
   `description`, `problem`, `process`, `result` y `tags` — todo en `en`/`es`/`ca`.
   Añade también `gradient`, `accentColor` y, si aplica, `cover` (imagen en
   `public/covers/`) o `video`.
2. **Crea la página de caso de estudio** en `components/proyectos/<Nombre>Page.tsx`,
   usando cualquiera de las páginas existentes como plantilla (hero con imagen/vídeo
   de fondo, overview, secciones de reto/proceso/resultado, aprendizajes). Usa
   `useLang()` y los campos `problem`/`process`/`result` del proyecto en vez de texto
   hardcodeado, para que la página funcione en los 3 idiomas.
3. **Regístrala en `app/proyectos/[id]/page.tsx`**: añade el `id` al mapa `pages` con
   el componente correspondiente. `generateStaticParams` y `generateMetadata` ya
   generan la ruta y el SEO automáticamente a partir de `data/projects.ts`.
4. Si el proyecto debe aparecer en la portada, añade su `id` al array `FEATURED_IDS`
   de `components/WorkSection.tsx`.
5. `npm run build` para comprobar que compila antes de hacer push (recuerda: cada
   push a `main` despliega directo a producción).

## Despliegue

El sitio se despliega automáticamente en Vercel en cada push a `main`
(`portfolio-albert-six.vercel.app`). No hay variables de entorno necesarias: el
dominio canónico usado en metadata/sitemap/robots es la propia URL de Vercel, con
fallback hardcodeado en el código (`NEXT_PUBLIC_SITE_URL` es opcional, solo por si
en el futuro se quiere sobreescribir).
