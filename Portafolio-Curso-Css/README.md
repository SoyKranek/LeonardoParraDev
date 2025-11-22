# Portafolio – Henry Leonardo Parra Velandia

Sitio estático (HTML/CSS/JS) para mi hoja de vida/landing page.

## Contenido
- `index.html` y `styles.css`
- `netlify.toml` (seguridad/CSP)
- `404.html`, `robots.txt`, `sitemap.xml`
- `assets/favicon.svg`

## Deploy en Netlify
1) Sube este folder a un repo en GitHub.
2) En Netlify → “Add new site” → “Import an existing project” → GitHub → elige el repo.
3) Build command: (vacío) – Publish directory: raíz del proyecto.

## Git (rápido)
```powershell
git init
git add .
git commit -m "chore: setup repo + Netlify + SEO/seguridad"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

## SEO
- Metadatos: description, Open Graph y Twitter Cards
- `preconnect` a Google Fonts
- `favicon.svg`, `theme-color`
- `robots.txt` y `sitemap.xml` (actualiza el dominio)

## Seguridad
`netlify.toml` incluye HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy y CSP.

Si en el futuro extraes todo el JS inline a `assets/js/main.js`, podrás eliminar `'unsafe-inline'` de `script-src`.


