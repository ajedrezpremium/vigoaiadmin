# VIGO AI ADMINISTRATION — Stack Técnico

**CHESS AI AGENCY** · AI · Innovation · Execution  
**Versión:** v2.0 · **Fecha:** 14 de noviembre de 2026

---

## 1. Arquitectura general

```
┌─────────────────────────────────────────────────────────────┐
│                    CIUDADANÍA / FUNCIONARIOS                 │
│              (navegador, móvil, voz STT/TTS)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────────────┐
│                   FRONTEND (Next.js 15)                      │
│  React 19 · Tailwind CSS · TypeScript · i18n (gl/es/en)     │
│  Widget flotante · Portada · Panel admin · Aviso legal       │
└──────────────────────┬──────────────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────────────┐
│                   API LAYER (Next.js Route Handlers)         │
│  /api/chat · /api/escalate · /api/mcp · /api/workflow       │
│  /api/admin/* · /api/docs · /api/admin/eval                 │
│  Rate limiting · Validación · Auditoría · Observabilidad     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   AI LAYER (lib/llm.ts)                      │
│  LLM Router: OpenRouter (free dinámico) → fallback → Gemini  │
│  Tool Calling: search_knowledge · escalate_to_human ·        │
│                solicitar_cita_previa · delegate_to_agent     │
│  Loop agéntico (max 3 iteraciones) · Fallback local RAG      │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   AGENT LAYER (lib/agents.ts)                │
│  Master Agent → 10 agentes especializados                   │
│  Config externalizada: config/agents.json                    │
│  Guardrails comunes (10 reglas absolutas)                    │
│  buildSystemPrompt() con evidencia RAG                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   RAG ENGINE (lib/rag.ts)                    │
│  Recuperación léxica (TF + sinónimos + scoring)             │
│  Abstención sin evidencia · Citas [S1][S2]                  │
│  Corpus: data/demo-corpus.ts (18 docs sintéticos)           │
│  v1.2: embeddings + búsqueda híbrida (pgvector)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   DATA LAYER (Supabase)                      │
│  PostgreSQL: conversations, messages, audit_events,          │
│              escalations, user_roles                          │
│  RLS habilitado · Supabase Auth · RBAC                      │
│  Opcional: sin Supabase la demo funciona (modo local)       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   INFRAESTRUCTURA                            │
│  Vercel (deploy) · GitHub (CI/CD) · Supabase (DB)           │
│  OpenRouter (LLM free) · Gemini (fallback) · Langfuse (obs)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stack tecnológico detallado

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 15.x | Framework React + API routes |
| React | 19.x | UI components |
| Tailwind CSS | 3.4.x | Estilos (tema claro/oscuro) |
| TypeScript | 5.7.x | Tipado estático |

### Backend / API
| Tecnología | Uso |
|---|---|
| Next.js Route Handlers | API REST (/api/chat, /api/mcp, /api/workflow, etc.) |
| Node.js runtime | Ejecución server-side |
| Supabase (PostgreSQL) | Persistencia, auditoría, auth |
| Supabase Auth | Autenticación + RBAC |

### IA / LLM
| Proveedor | Modelo | Uso |
|---|---|---|
| OpenRouter | Mejor modelo `:free` (dinámico) | Principal |
| OpenRouter (fallback) | `google/gemma-4-26b-a4b-it:free` | Respaldo |
| Gemini (Google AI Studio) | `gemini-3.8-flash` | Respaldo directo |
| Groq (opcional) | `llama-3.3-70b-versatile` | Inferencia LPU |

### Observabilidad
| Herramienta | Uso |
|---|---|
| Spans OTEL-style | Trazas por request (chat, classify, retrieve, llm) |
| Supabase audit_events | Persistencia local de spans |
| Langfuse (opcional) | Exportación de trazas a cloud |
| Eval RAG | Golden set (13 casos), hit rate, abstención |

### Testing
| Herramienta | Uso |
|---|---|
| Vitest | Tests unitarios (27 tests) |
| Playwright (pendiente) | Tests E2E |

### Despliegue
| Servicio | Uso |
|---|---|
| Vercel | Hosting + CI/CD |
| GitHub | Repositorio + versionado |
| Supabase | Base de datos + Auth |

---

## 3. Endpoints API

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/chat` | POST | Consulta al agente IA (orquestación principal) |
| `/api/escalate` | POST | Escalación a personal municipal (HIT) |
| `/api/mcp` | POST/GET | Fachada MCP (tools/list, tools/call) |
| `/api/workflow` | GET/POST | Workflow Engine (cita-previa, info-tramite) |
| `/api/admin/auth` | POST | Autenticación (token o Supabase Auth) |
| `/api/admin/stats` | GET | Estadísticas del panel admin |
| `/api/admin/knowledge` | GET/POST/DELETE | CRUD de documentos del corpus |
| `/api/admin/eval` | GET | Evaluación de calidad RAG |
| `/api/docs` | GET | Documentación OpenAPI 3.0 |

---

## 4. Agentes especializados (10)

| Código | Nombre | Dominio |
|---|---|---|
| AGENT 01 | Citizen AI | Información ciudadana, horarios, servicios |
| AGENT 02 | Admin AI | Trámites, documentación, procedimientos |
| AGENT 03 | Legal AI | Ordenanzas, normativa, regulaciones |
| AGENT 04 | Document AI | Resúmenes, clasificación, extracción |
| AGENT 05 | Urban AI | Urbanismo, licencias de obra |
| AGENT 06 | Business AI | Empresas, subvenciones, aperturas |
| AGENT 07 | Social AI | Servicios sociales, asistencia |
| AGENT 08 | Culture AI | Cultura, turismo, agenda, bibliotecas |
| AGENT 09 | Language AI | Traducción multilingüe |
| AGENT 10 | History AI | Historia de Vigo, hitos, patrimonio |

---

## 5. Seguridad y cumplimiento

- **Rate limiting**: 20 req/min por IP
- **Anti prompt-injection**: contenido recuperado es DATA, no instrucciones
- **Minimización de datos**: sin PII en conversaciones
- **Auditoría**: todos los eventos en `audit_events`
- **Abstención**: no inventa datos sin evidencia
- **Guardrails**: 10 reglas absolutas en todos los agentes
- **RLS**: Row Level Security en Supabase (v1.2)
- **RBAC**: roles admin/editor/viewer (v1.2)
- **RGPD/ENS/AI Act**: evaluación pendiente para producción

---

## 6. Accesibilidad (WCAG 2.1 AA)

- Skip-to-content link
- Focus-visible styles
- `prefers-reduced-motion` respetado
- ARIA labels en botones e iconos
- Contraste ≥ 4.5:1 (verificado en modo claro y oscuro)
- Navegación por teclado (Tab, Enter, Escape)
- Imágenes con `alt` descriptivo

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
