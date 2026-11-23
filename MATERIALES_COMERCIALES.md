# Materiales comerciales — Índice de uso

**CHESS AI AGENCY · 18/11/2026**

## Cuándo usar cada material

| Material | Archivo | Cuándo usarlo | Audiencia |
|---|---|---|---|
| **Correo de primer contacto** | `lib/email-templates.ts` → `firstContactEmail` | Fase 1, día 0. Sin producto, sin precio, sin piloto. | Los 61 concellos |
| **Correo de propuesta (Vigo)** | `lib/email-templates.ts` → `finalEmail` | Fase 3, cuando hay interés. Incluye piloto 12.500 €. | Concello de Vigo |
| **Infografía 10 razones** | `public/infografia-10-razones.html` | Adjunto en toque 3 (día 7) o en la llamada. | Todos |
| **Landing de campaña** | `ia-administracion-local.vercel.app/campana` | Enlace en los correos de fase 1. Sin marca Vigo. | Todos |
| **Landing comercial** | `vigo-ai-demo.vercel.app/ayuntamientos` | Fase 2, cuando piden ver la oferta completa. | Todos |
| **Demo en vivo** | `vigo-ai-demo.vercel.app` | Fase 2, tras el formulario. | Todos |
| **Presupuesto v2.0** | `COMERCIAL_PRESUPUESTO_V2.md` | Fase 3, con la propuesta formal. | Concello de Vigo |
| **Piloto 12.500 €** | `PILOTO_12500_VIGO.md` | Fase 3, propuesta de piloto. | Concello de Vigo |
| **Resumen ejecutivo** | `COMERCIAL_RESUMEN_EJECUTIVO.md` | Reunión comercial, anexo. | Todos |
| **Propuesta completa** | `COMERCIAL_PROPUESTA.md` | Reunión comercial, anexo. | Todos |
| **Dossier de licitación** | `LICITACION_CHECKLIST_VIGO.md` | Solo si se abre licitación pública (Vigo). | Concello de Vigo |
| **Guion de llamada** | `GUION_LLAMADA_CONCELLOS.md` | Toque 2 (día 3), llamada telefónica. | Interno |
| **Hoja de llamadas del día** | `LLAMADAS_2026-11-20.md` | Primera tanda: Vigo (piloto) + 9 concellos del lote A. | Interno |
| **Hoja de llamadas pendientes** | `LLAMADAS_PONTEVEDRA_PENDIENTES.md` | Lotes del 18, 19 y 23/11 desplazados al 30/11, 1/12 y 2/12. | Interno |
| **Hoja de llamadas G20** | `LLAMADAS_2026-12-03.md` | Ciudades + A Coruña, con guion adaptado (3/12). | Interno |
| **Hoja de llamadas G20-B** | `LLAMADAS_2026-12-04.md` | Culleredo, Ribeira y Cambre (4/12). | Interno |
| **Hoja de llamadas extensión** | `LLAMADAS_2026-12-10.md` | O Carballiño, Verín, O Barco y Barbadás (10/12). | Interno |
| **Agenda diaria** | `AGENDA_CAMPANA.md` | Qué toca cada día del 23/11 al 15/01: envíos, llamadas y enlaces. | Interno |
| **Lotes de envío** | `campaign/batches/` | JSON de cada tanda de 10 correos, con su registro. | Interno |
| **Campaña 2 (ciudades y G20)** | `CAMPANA_2_OURENSE_SANTIAGO_LUGO.md` | Ciudades, A Coruña >20k y extensión: contactos, calendario y discurso. | Interno |
| **Contactos campaña 2** | `CONTACTOS_CAMPANA_2.csv` | Tres ciudades + extensión, con buzón y teléfono verificados. | Interno |
| **Contactos Galicia >20k** | `CONTACTOS_GALICIA_20K.csv` | Diez municipios de A Coruña con buzón, teléfono y alcalde. | Interno |
| **Campaña España >50k** | `CAMPANA_ESPANA_50K.md` | Top 30, fases y calendario. | Interno |
| **Infografía comercial** | `COMERCIAL_INFOGRAFIA.html` | Presentación en reunión. | Todos |
| **Video 30s** | `COMERCIAL_VIDEO_30S.md` | Redes sociales, email. | Todos |
| **Firma Gmail** | `FIRMA_GMAIL.html` | Configuración de Gmail (una sola vez). | Interno |

## Regla de oro

> En fase 1 (primer contacto): solo `firstContactEmail` + enlace a `/campana`. Nada más.
> En fase 2 (demo): landing `/ayuntamientos` + demo en vivo.
> En fase 3 (reunión): presupuesto + piloto + infografía + resumen ejecutivo.

## Dónde está cada cosa

- **Código de plantillas de correo:** `lib/email-templates.ts` (fuente de verdad).
- **Código de la landing de campaña:** `components/CampanaLanding.tsx`.
- **Código de la landing comercial:** `components/AyuntamientosLanding.tsx`.
- **Contactos verificados:** `CONTACTOS_PONTEVEDRA.csv`.
- **Plan de campaña:** `CAMPANA_PONTEVEDRA.md`.
