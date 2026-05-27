# LeonardoParraDev

Portafolio personal — [leonardoparradev.netlify.app](https://leonardoparradev.netlify.app)

Desarrollado por **Henry Leonardo Parra Velandia**. React, TypeScript, Vite, Tailwind, Framer Motion; hero con Three.js.

## Inicio rápido

```bash
npm install
npm run dev
```

Build de producción: `npm run build`

## Dónde editar qué

| Necesitas cambiar… | Archivo |
|--------------------|---------|
| Textos, proyectos, skills, certs | `src/content/portfolio.data.ts` |
| PDFs (CV, diplomas) | `public/documents/` |
| Estilos globales / animaciones CSS | `src/index.css` |
| Layout, nav, lazy load | `src/app/AppLayout.tsx` |

Documentación técnica: [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md)  
Dirección visual: [`docs/DESIGN_DIRECTION.md`](docs/DESIGN_DIRECTION.md)

## Estructura resumida

```
src/app/          → shell de la app
src/content/      → datos del portafolio
src/features/     → secciones (hero, about, projects…)
src/shared/       → hooks, tipos, UI compartida
public/documents/ → PDFs públicos
```

## Certificaciones nuevas

1. PDF en `public/documents/certifications/`
2. Entrada en `certificationsCatalog` dentro de `portfolio.data.ts`

Ver [`public/documents/README.md`](public/documents/README.md).

## Nota sobre `Insumos/`

Carpeta local en `.gitignore` (copias de trabajo). Lo que se publica en la web va en `public/documents/`.
