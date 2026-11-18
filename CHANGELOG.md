# Changelog — VIGO AI ADMINISTRATION

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [v2.0] — 2026-11-18

### Añadido
- Landing neutra `/campana` para la campaña (sin marca Vigo, sin precios, sin "piloto").
- Sección de objetivos medibles (5 métricas) en `/campana`.
- Infografía HTML con 10 razones objetivas (`public/infografia-10-razones.html`).
- Guion de llamada para toque 2 y plantilla de seguimiento toque 3 (`GUION_LLAMADA_CONCELLOS.md`).
- Proyecto Vercel gemelo `ia-administracion-local.vercel.app` (dominio neutro).
- Script de envío real con `--commit` (`scripts/send-email.mjs`).
- Script de despliegue del proyecto neutro (`scripts/deploy-neutral.ps1`).
- `NAMING.md` — guía de nombres por contexto.
- `MATERIALES_COMERCIALES.md` — índice de materiales.
- `MEJORA_V2_0.md` — plan de mejoras.

### Cambiado
- `code` y `mission` de agentes ahora son objetos localizados (gl/es/en) en `config/agents.json` y `lib/agents.ts`.
- Header de la portada: "Precios" → "Prezos" en gallego.
- Alt y nombres de las fotos del hero traducidos a 3 idiomas.
- Tarjeta de Vigo traducida a 3 idiomas.
- `/api/admin/email-test` ahora responde 503 en modo demo (seguridad).
- `Permissions-Policy`: `microphone=(self)` (antes `microphone=()` bloqueaba el micrófono).
- Errores de voz separados del error de chat en `AssistantWidget`.

### Corregido
- Asunto de `finalEmail` en castellano ("Proposta de pilot" → "Propuesta de piloto").
- Enlace canónico en emails: `/administracion-local` → `/ayuntamientos`.
- Footer de emails: dominio neutro en correos de fase 1.

## [v1.2] — 2026-11-17

### Añadido
- Campaña a 61 concellos de Pontevedra: `firstContactEmail` y `finalEmail`.
- FAQ expandido a 10 preguntas (gl + es) en `/ayuntamientos`.
- Rewrites neutros: `/administracion-local` → `/ayuntamientos`, `/demo` → `/`.
- `CAMPANA_PONTEVEDRA.md` §15 (registro de envíos, criterio de buzón, dominio neutro).
- Tests: 57 (incl. aserciones de ausencia de tarjeta de ciudad en finalEmail).

### Enviado
- 10 correos reales a Vigo + tramo A (todos `delivered` en Resend).

## [v1.1] — 2026-11-15

### Añadido
- Landing `/ayuntamientos` con formulario de leads.
- Panel admin `/admin` con token simple.
- Supabase: tabla `leads`, `conversations`, `audit_events`, `escalations`.
- Resend: aviso interno + acuse de recibo.

## [v1.0] — 2026-11-14

### Añadido
- Demo gratuita v1.0 desplegada en Vercel.
- Widget flotante ciudadano (gl/es/en).
- Master Agent + 10 agentes especializados.
- Motor RAG con citas [S1][S2].
- LLM Router multi-proveedor (OpenRouter, Groq, Gemini, Cohere, Cloudflare, OVHcloud).
- VOICE AI (STT + TTS).
- Tool Calling, Memoria persistente, Human-in-the-Loop, MCP, Workflow Engine.
- Observabilidad (spans OTEL-style + Langfuse).
- Eval RAG (golden set 13 casos, 100% hit rate).
- Datos sintéticos (DEMO_CORPUS).

---

**CHESS AI AGENCY** · AI · Innovation · Execution
