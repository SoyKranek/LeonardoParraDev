# Documentos publicados en el sitio

## CV y carta

Ubicación: `public/documents/cv/`

- `CV_Leo_ES.pdf`
- `Carta_Presentacion_Leonardo_Parra.pdf`

Referencias en `portfolio.data.ts` → `documentsCatalog`.

## Certificaciones

1. Guardar el PDF en `public/documents/certifications/`
2. Agregar objeto en `certificationsCatalog` (`src/content/portfolio.data.ts`)

```ts
{
  id: 'mi-cert',
  title: 'Nombre del curso',
  issuer: 'Platzi',
  date: '2025',
  category: 'tecnologia',
  pdfPath: '/documents/certifications/mi-cert.pdf',
  featured: true,
}
```

Credencial solo web (sin PDF local): usar `credentialUrl` en lugar de `pdfPath`.

Los botones «Ver diploma» / «Ver credencial» abren el visor embebido (`VisorDocumentoModal`).
