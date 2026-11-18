# Guía de nombres — VIGO AI ADMINISTRATION

**CHESS AI AGENCY · 18/11/2026**

## Regla principal

| Contexto | Nombre a usar | Ejemplo |
|---|---|---|
| **Vigo** (demo, portada, propuesta a Vigo) | **VIGO AI ADMINISTRATION** | «VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0» |
| **Resto de municipios** (campaña, correos, landing) | **IA para la Administración Local** | «IA para a Administración Local · CHESS AI AGENCY» |
| **Producto genérico / técnico** | **CHESS AI AGENCY** | Firma en correos, infografías, presupuestos |

## Lo que NO se usa

- ~~**VIGO DOCS AI**~~ — eliminado. Era un nombre interno del piloto que no aportaba nada y confundía con el producto de Vigo.
- ~~**VIGO AI ADMIN**~~ — abreviatura no oficial; usar siempre el nombre completo.

## Detalles

- **VIGO AI ADMINISTRATION** es el nombre de la demo y del producto para el Concello de Vigo. Aparece en la portada, el widget, el panel admin y la propuesta a Vigo.
- **IA para la Administración Local** es el nombre comercial para la campaña a los 61 concellos de Pontevedra. Es neutro y no revela que Vigo es el caso piloto.
- **CHESS AI AGENCY** es la firma de la empresa. Siempre aparece junto al nombre del producto en correos, infografías y presupuestos.
- En el código: el `landingTitle` en `lib/i18n.ts` es "VIGO AI ADMINISTRATION" (portada). La landing `/campana` usa "CHESS AI AGENCY" como marca principal. No mezclar.

## En el código

| Archivo | Nombre usado |
|---|---|
| `app/page.tsx` (portada) | VIGO AI ADMINISTRATION |
| `components/CampanaLanding.tsx` | CHESS AI AGENCY · IA para la Administración Local |
| `lib/email-templates.ts` (finalEmail) | VIGO AI ADMINISTRATION (solo para Vigo) |
| `lib/email-templates.ts` (firstContactEmail) | CHESS AI AGENCY · IA para la Administración Local |
| `lib/i18n.ts` | landingTitle: VIGO AI ADMINISTRATION |

## Regla de oro

> Si el destinatario es el Concello de Vigo, usa "VIGO AI ADMINISTRATION".
> Si el destinatario es cualquier otro concello, usa "IA para la Administración Local".
> Nunca uses "VIGO DOCS AI".
