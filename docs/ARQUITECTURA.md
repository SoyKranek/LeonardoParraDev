# Arquitectura — LeonardoParraDev

Sitio personal desplegado en Netlify. Stack: React 19, TypeScript, Vite, Tailwind v4, Framer Motion y Three.js solo en el hero.

## Estructura

```
src/
  app/              App, layout, providers (tema + datos)
  content/          portfolio.data.ts — textos y catálogos
  features/         Una carpeta por sección visible
  shared/
    hooks/          Media queries, scroll, mouse
    repositories/   Lectura de datos (hoy local, mañana API si hace falta)
    types/          Contratos TypeScript
    ui/             Componentes reutilizables y efectos visuales
public/documents/   PDFs servidos estáticos (CV, carta, diplomas)
```

## Flujo de datos

1. `portfolio.data.ts` exporta `portfolioData`.
2. `LocalPortfolioRepository` devuelve ese objeto (async para mantener la misma firma si luego hay API).
3. `PortfolioProvider` lo carga al montar la app.
4. Cada sección consume `usePortfolio()`.

Para cambiar copy, proyectos o certificaciones: editar `src/content/portfolio.data.ts`. No hace falta tocar componentes salvo que cambie el diseño.

## Secciones (`features/`)

| Carpeta | Responsabilidad |
|---------|-----------------|
| `hero/` | Presentación, stats, fondo 3D (lazy) |
| `about/` | Bio, cita, valores |
| `projects/` | Carrusel horizontal + tilt en tarjetas |
| `skills/` | Chips de stack |
| `certifications/` | CV, carta, diplomas + `VisorDocumentoModal` |
| `contact/` | Métodos de contacto y CTAs |

## Efectos pesados

- Hero 3D: `HeroBackground.tsx`, desactivado en móvil o con `prefers-reduced-motion`.
- Cursor custom y tilt: `shared/ui/effects.tsx`.
- Secciones bajo el fold: `lazy()` en `AppLayout.tsx`.

## Documentos PDF

- CV y carta: `public/documents/cv/`
- Diplomas: `public/documents/certifications/`
- En `certificationsCatalog`, `pdfPath` apunta a la ruta pública; `credentialUrl` para credenciales externas (freeCodeCamp, etc.).

Detalle de altas: [`public/documents/README.md`](../public/documents/README.md).

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción → dist/
npm run preview  # revisar build local
npm run lint     # eslint
```

## Despliegue

`netlify.toml` en la raíz. Build command: `npm run build`, publish: `dist`.

## Diseño visual

Paleta, tipografías y criterios UX en [`DESIGN_DIRECTION.md`](./DESIGN_DIRECTION.md).

---

Autor del proyecto: **Henry Leonardo Parra Velandia** · [GitHub](https://github.com/SoyKranek/LeonardoParraDev)
