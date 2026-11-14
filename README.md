# VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0

**Plataforma multiagente de IA para servicios públicos municipales**
Desarrollado por **CHESS AI AGENCY** · AI · Innovation · Execution

> ⚠️ **DEMO DE DEMOSTRACIÓN**: usa exclusivamente **datos sintéticos** (no oficiales del Concello de Vigo). El asistente se identifica como IA, no es un empleado municipal y no toma decisiones administrativas. Conforme al Megaprompt §2, §10, §11 y a la Propuesta Comercial §7.

---

## ¿Qué es?

Implementación de la **DEMO GRATUITA v1.0** descrita en `VIGO_AI_ADMINISTRATION_MEGAPROMPT_PRO_V1.md` (Fase 2 — MVP), **ampliada a nivel PRO** con las capacidades del XG AI AGENT ENGINE:

| Componente | Estado en demo |
|---|---|
| MASTER AGENT (orquestador) | ✅ clasificación de intención, idioma, enrutado, validación |
| 10 agentes especializados (01–10) | ✅ con prompt de sistema y guardrails dedicados (incl. History AI) |
| Widget flotante ciudadano | ✅ gl / es / en, sugerencias, fuentes, escalación |
| VOICE AI (agente 10) | ✅ STT + TTS con Web Speech API (opcional) |
| Motor RAG con citas [S1][S2] | ✅ recuperación léxica + abstención sin evidencia |
| Seguridad y cumplimiento (§3) | ✅ rate limiting, anti prompt-injection, auditoría, minimización de datos |
| Panel interno (§6) | ✅ versión demo en `/admin` (token simple) |
| Persistencia | ✅ opcional vía Supabase (conversaciones + audit_events + escalations) |
| **LLM Router PRO** | ✅ OpenRouter (free dinámico) → fallback → Gemini → modo local |
| **Tool Calling** | ✅ `search_knowledge` · `escalate_to_human` · `solicitar_cita_previa` |
| **Memoria persistente** | ✅ `conversationId` + historial entre turnos |
| **Human-in-the-Loop** | ✅ `/api/escalate` + integración en loop agéntico |
| **MCP** | ✅ `/api/mcp` (tools/list + tools/call) |
| **Workflow Engine** | ✅ `/api/workflow` (cita-previa, info-tramite) con trazabilidad |
| **Observabilidad** | ✅ Spans OTEL-style → Supabase + Langfuse opcional |
| **Eval RAG** | ✅ Golden set 13 casos · 100% hit rate · `/api/admin/eval` |

## Stack (todo en capa gratuita)

- **Next.js 15 + React 19 + Tailwind** — frontend y API
- **OpenRouter** — modelos gratuitos (`:free`), selección dinámica con fallback
- **Gemini API** (Google AI Studio) — proveedor de respaldo directo
- **Supabase** — PostgreSQL (conversaciones, auditoría, escalaciones) — opcional
- **GitHub + Vercel** — repositorio y despliegue gratuito

Si no hay ninguna API key configurada, la app sigue funcionando en **MODO DEMO LOCAL** (respuestas RAG por plantilla) — ideal para probar el flujo completo sin claves.

---

## 1. Configuración local

```bash
# dentro de la carpeta del proyecto
npm install

# variables de entorno
cp .env.example .env.local   # (Windows: copy .env.example .env.local)
# …edita .env.local con tus claves

npm run dev
# → http://localhost:3000
```

## 2. Obtener las claves (gratuitas)

| Servicio | Dónde | Variable |
|---|---|---|
| OpenRouter | https://openrouter.ai/keys | `OPENROUTER_API_KEY` |
| Gemini | https://aistudio.google.com/apikey | `GEMINI_API_KEY` |
| Supabase | https://supabase.com/dashboard → Settings → API | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Langfuse (opcional) | https://cloud.langfuse.com | `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST` |

Modelos free por defecto (selección dinámica en runtime):
- Principal: mejor modelo `:free` disponible en OpenRouter (caché 60s)
- Respaldo OpenRouter: `google/gemma-4-26b-a4b-it:free`
- Respaldo directo Gemini: `gemini-3.8-flash`

## 3. Base de datos Supabase

1. Crea un proyecto en Supabase (región europea, p. ej. `eu-west`).
2. Abre **SQL Editor** y ejecuta el contenido de `supabase/schema.sql` (tablas: `conversations`, `messages`, `audit_events`, `escalations`).
3. Copia las 3 claves al `.env.local`.
4. Sin Supabase la demo funciona igualmente (sin persistencia; `/admin` mostrará el aviso correspondiente).

> La persistencia usa la clave `service_role` **solo en servidor** (route handlers). Nunca se expone al navegador. Para producción real: RLS, RBAC, retención y evaluación RGPD/ENS/AI Act.

## 4. Subir a GitHub

```bash
git init
git add .
git commit -m "VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0"
git branch -M main
# crea el repo vacío en github.com y:
git remote add origin https://github.com/TU-USUARIO/vigo-ai-demo.git
git push -u origin main
```

El `.gitignore` excluye `.env.local` y secretos. Solo sube `.env.example` (sin valores).

## 5. Desplegar en Vercel

1. https://vercel.com → **Add New Project** → importa el repo de GitHub.
2. Framework: **Next.js** (autodetectado). Build sin cambios.
3. En **Environment Variables** añade las mismas variables del `.env.example`.
4. Deploy → tu demo quedará en `https://TU-PROYECTO.vercel.app`.

## 6. Panel interno de demo

- Ruta: `/admin`
- Introduce el valor de `ADMIN_TOKEN` (defínelo en `.env.local`/Vercel).
- Muestra: volumen de mensajes, distribución por agente, proveedor IA usado y últimas consultas.
- Eval RAG: `/api/admin/eval` (golden set, hit rate, abstención).

---

## Escenarios de demostración (Megaprompt §15)

| # | Pregunta sugerida | Qué demuestra |
|---|---|---|
| 1 | «¿Cuál es el horario de atención al público?» | CITIZEN AI + cita [S1] |
| 2 | «¿Qué documentación necesito para abrir un comercio?» | ADMIN AI + BUSINESS AI (trámite DOC-003) |
| 3 | «¿Qué dice la ordenanza de terrazas sobre los horarios?» | LEGAL AI + referencia a artículos |
| 4 | «¿Qué ayudas hay para emprendedores?» | BUSINESS AI + subvenciones |
| 5 | «¿Cuándo abre la biblioteca?» | CULTURE AI (multi-idioma) |
| 6 | «¿Cómo presento un escrito en el registro?» | CITIZEN/ADMIN AI (sede electrónica) |
| 7 | «¿Puedo hacer obras en la fachada?» | URBAN AI (obra mayor vs menor) |
| 8 | Pregunta en galego | detección de idioma + respuesta en galego |
| 9 | «¿Cuánto cuesta la licencia para un cohete a Marte?» | **Abstención** (sin evidencia, no inventa) |
| 10 | Botón 🙋 «Ayuda humana» | escalación real (Human-in-the-Loop) |
| 11 | «¿Cuál fue la batalla de Rande?» | HISTORY AI (sabelotodo de Vigo) |
| 12 | Workflow `cita-previa` | Orquestación multi-paso (recuperación → registro → escalada) |

## Arquitectura de la demo

```
CIUDADANÍA ──► Widget flotante (React)
                 │  POST /api/chat  (rate-limit + validación)
                 ▼
              MASTER AGENT (route.ts)
                 ├─► detectLanguage + classify (lib/router.ts)
                 ├─► retrieve() RAG léxico (lib/rag.ts) ──► corpus sintético (data/demo-corpus.ts)
                 ├─► buildSystemPrompt(agent) (lib/agents.ts)  ← guardrails §3/§10/§11
                 ├─► chatLLM(): OpenRouter (free dinámico) → OpenRouter(fallback) → Gemini (lib/llm.ts)
                 │        └─ Tool Calling: search_knowledge, escalate_to_human, solicitar_cita_previa
                 │        └─ (si todo falla) respuesta plantilla RAG local
                 ├─► validación de salida
                 ├─► Memoria: conversationId + historial (lib/supabase.ts)
                 ├─► Supabase: conversations/messages/audit_events/escalations (opcional)
                 ├─► Observabilidad: spans OTEL-style (lib/observability.ts)
                 ▼
              Respuesta con agente asignado + fuentes [S1][S2] + avisos

ENDPOINTS PRO:
  POST /api/chat       → orquestación principal
  POST /api/escalate   → Human-in-the-Loop
  POST /api/mcp        → MCP (tools/list + tools/call)
  POST /api/workflow   → Workflow Engine (cita-previa, info-tramite)
  GET  /api/admin/eval → Eval RAG (golden set, hit rate)
  GET  /api/admin/stats → Panel interno (token)
```

## Límites de la demo (transparencia)

- Datos 100% sintéticos; **no** hay conexión con sistemas municipales reales.
- RAG léxico simple (no embeddings/vector search); producción: búsqueda híbrida.
- Clasificación por reglas; producción: clasificador semántico con evaluación.
- Panel admin con token simple; producción: Supabase Auth + RBAC + auditoría completa.
- Escalación humana persiste en Supabase (real, no simulada).
- **No apto para producción pública sin evaluación de seguridad** (RGPD, ENS, Reglamento (UE) 2024/1689, accesibilidad UNE-EN 301 549): ver Propuesta Comercial §6 y §7.

## Roadmap hacia el piloto real (VIGO DOCS AI)

1. **Descubrimiento** (3.000–6.000 €): proceso, corpus autorizado, criterios de aceptación.
2. **Piloto** (18.000–35.000 €): embeddings + búsqueda híbrida, Supabase/pgvector, gestor documental, evaluación de calidad, formación.
3. **Ampliación**: nuevos departamentos, integraciones autorizadas, ENS/RLS completo, modelo según política de la entidad.

Contacto comercial: **CHESS AI AGENCY** — ver `VIGO_AI_ADMINISTRATION_Propuesta_CHESS_AI_AGENCY.md`.

Ver también: `AUDITORIA_PLAN_MEJORA_V1.2.md` (auditoría completa + plan de mejora).

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
