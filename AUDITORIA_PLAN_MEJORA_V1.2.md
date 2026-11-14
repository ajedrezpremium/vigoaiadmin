# VIGO AI ADMINISTRATION — Auditoría y Plan de Mejora v1.2

**Fecha:** 14 de noviembre de 2026  
**Versión auditada:** v1.0 (demo gratuita en producción)  
**URL:** https://vigo-ai-demo.vercel.app  
**Documento base:** `VIGO_AI_ADMINISTRATION_MEGAPROMPT_PRO_V1.md` + `VIGO_AI_ADMINISTRATION_Propuesta_CHESS_AI_AGENCY.md`

---

## 1. Resumen ejecutivo

La demo v1.0 está **funcional y desplegada** en producción (Vercel, capa gratuita). Cubre las fases 1–3 del megaprompt (descubrimiento, MVP, multi-agente) y parcialmente la fase 4 (panel interno). Las fases 5 (integración real) y 6 (testing/despliegue) están **bloqueadas** por falta de acceso al Concello de Vigo y por ausencia de suite de tests.

Se identifican **12 brechas** respecto al megaprompt y **8 mejoras** recomendadas para v1.2, agrupadas en 3 bloques: (A) corrección de brechas críticas, (B) mejoras de calidad/UX, (C) preparación para producción real.

---

## 2. Auditoría por entregable (Megaprompt §14)

| # | Entregable | Estado | Evidencia | Brecha |
|---|---|---|---|---|
| 1 | Arquitectura completa | 🟡 Parcial | README §Arquitectura (diagrama texto) | No existe documento de arquitectura dedicado |
| 2 | Aplicación web funcional | ✅ | Next.js 15, build OK, deploy READY | — |
| 3 | Asistente flotante ciudadano | ✅ | `components/AssistantWidget.tsx` | — |
| 4 | Master Agent | ✅ | `app/api/chat/route.ts` (orquestación) | — |
| 5 | Diez agentes especializados | ✅ | `lib/agents.ts` (10 agentes incl. History AI) | — |
| 6 | Capa seguridad y cumplimiento | ✅ | rate-limit, guardrails, audit, minimización | Falta RLS en Supabase (documentado) |
| 7 | Motor RAG con citas | ✅ | `lib/rag.ts` (léxico + abstención) | Sin embeddings/vector search (demo) |
| 8 | Panel interno (dashboard) | 🟡 Parcial | `/admin` con token simple | Sin auth real (Supabase Auth + RBAC) |
| 9 | Documentación API | ❌ | — | **No existe** (OpenAPI/Swagger) |
| 10 | Esquema de base de datos | ✅ | `supabase/schema.sql` (3 tablas + escalations) | Falta tabla `citas_solicitadas` |
| 11 | Archivos de configuración de agentes | ❌ | Agentes en código (`lib/agents.ts`) | No hay config externa (JSON/YAML) |
| 12 | Configuración de despliegue | ✅ | `vercel.json`, `.env.example` | — |
| 13 | Plantilla de variables sin secretos | ✅ | `.env.example` | — |
| 14 | Suite de tests | ❌ | — | **No existe** (ni unit ni E2E) |
| 15 | Documentación de usuario | 🟡 Parcial | README.md | Sin guía de usuario dedicada |
| 16 | Documentación técnica | 🟡 Parcial | README §Arquitectura | Sin docs de API ni de agentes |
| 17 | Entorno de demostración | ✅ | Vercel producción (pública) | — |
| 18 | Checklist de producción | ❌ | — | **No existe** |

**Puntuación de cobertura:** 12/18 completos · 3/18 parciales · 3/18 ausentes.

---

## 3. Auditoría por fase de desarrollo (Megaprompt §13)

| Fase | Estado | Notas |
|---|---|---|
| Fase 1 — Descubrimiento | ✅ | Análisis de web oficial (`hoxe.vigo.org`), fuentes identificadas, use cases definidos |
| Fase 2 — MVP | ✅ | Widget, Master Agent, Citizen/Admin/Language AI, RAG, citas |
| Fase 3 — Multi-agente | ✅ | 10 agentes, routing, permisos básicos, monitoring/eval |
| Fase 4 — Dashboard interno | 🟡 | `/admin` demo con token; falta auth real, gestión de conocimiento, analytics avanzados |
| Fase 5 — Integración | ⏳ | Bloqueada: sin credenciales/sandbox del Concello de Vigo |
| Fase 6 — Testing y despliegue | ⏳ | Sin tests, sin auditoría de seguridad, sin accesibilidad (UNE-EN 301 549) |

---

## 4. Brechas identificadas (priorizadas)

### 🔴 Críticas (bloquean producción real)

| ID | Brecha | Impacto | Esfuerzo |
|---|---|---|---|
| B1 | **Sin suite de tests** — no hay tests unitarios ni E2E para RAG, router, agentes ni API | Calidad no verificable, regresiones silenciosas | Medio |
| B2 | **Sin documentación de API** — endpoints `/api/chat`, `/api/mcp`, `/api/workflow`, `/api/escalate`, `/api/admin/*` sin OpenAPI | Integración externa imposible | Bajo |
| B3 | **Sin RLS en Supabase** — la persistencia usa service_role sin Row Level Security | Riesgo de seguridad en producción | Medio |
| B4 | **Sin auth real en panel admin** — token simple en header, sin Supabase Auth ni RBAC | Acceso no controlado | Medio |
| B5 | **Sin checklist de producción** — no existe documento de readiness | No se puede validar go-live | Bajo |

### 🟡 Importantes (mejoran calidad y mantenibilidad)

| ID | Brecha | Impacto | Esfuerzo |
|---|---|---|---|
| B6 | **Agentes en código** — no hay archivos de configuración externos (JSON/YAML) | Difícil modificar agentes sin redeploy | Medio |
| B7 | **Sin embeddings/vector search** — RAG es solo léxico (TF) | Precisión limitada en consultas complejas | Alto |
| B8 | **Sin multiagente colaborativo** — el router clasifica a un solo agente; no hay delegación/handoff | No se aprovecha la especialización cruzada | Medio |
| B9 | **Sin gestión de conocimiento en panel** — no se pueden añadir/editar documentos desde `/admin` | Dependencia de desarrollador para actualizar corpus | Medio |
| B10 | **Sin accesibilidad (UNE-EN 301 549)** — no se ha evaluado WCAG 2.1 AA | Riesgo legal para administración pública | Medio |
| B11 | **README desactualizado** — menciona modelos `llama-3.3-70b-instruct:free` y `gemini-2.0-flash` que ya no existen; menciona 9 agentes (ahora 10); menciona escalación simulada (ahora real) | Confusión para desarrolladores | Bajo |
| B12 | **Sin documentación de usuario** — no hay guía de uso del widget ni del panel admin | Barrera de adopción | Bajo |

---

## 5. Plan de mejora v1.2

### Bloque A — Corrección de brechas críticas (prioridad 1)

| # | Tarea | Brecha | Esfuerzo | Entregable |
|---|---|---|---|---|
| A1 | Crear suite de tests (Vitest + Playwright) | B1 | Medio | `tests/` con tests de RAG, router, API chat, eval |
| A2 | Generar documentación OpenAPI (Swagger) | B2 | Bajo | `/api/docs` o archivo `openapi.yaml` |
| A3 | Implementar RLS en Supabase | B3 | Medio | Políticas RLS en `schema.sql` + migración |
| A4 | Supabase Auth + RBAC en panel admin | B4 | Medio | `/admin` con login real, roles (admin/editor/viewer) |
| A5 | Crear checklist de producción | B5 | Bajo | `PRODUCTION_READINESS_CHECKLIST.md` |

### Bloque B — Mejoras de calidad y UX (prioridad 2)

| # | Tarea | Brecha | Esfuerzo | Entregable |
|---|---|---|---|---|
| B1 | Externalizar configuración de agentes (JSON) | B6 | Medio | `config/agents.json` + loader |
| B2 | Implementar multiagente colaborativo | B8 | Medio | Delegación/handoff entre agentes en `lib/router.ts` + `lib/agents.ts` |
| B3 | Gestión de conocimiento en panel admin | B9 | Medio | CRUD de documentos en `/admin` |
| B4 | Auditoría de accesibilidad (WCAG 2.1 AA) | B10 | Medio | Informe + correcciones ARIA/contraste/teclado |
| B5 | Actualizar README.md | B11 | Bajo | README con modelos actuales, 10 agentes, escalación real |
| B6 | Crear guía de usuario | B12 | Bajo | `GUIA_USUARIO.md` |
| B7 | Añadir embeddings + búsqueda híbrida (pgvector) | B7 | Alto | `lib/rag.ts` con vector search + Supabase pgvector |

### Bloque C — Preparación para producción real (prioridad 3)

| # | Tarea | Dependencia | Esfuerzo |
|---|---|---|---|
| C1 | Integración real Sede Electrónica | Credenciales del Concello de Vigo | Alto |
| C2 | Revisión de seguridad (GDPR/ENS/AI Act) | Auditoría externa | Alto |
| C3 | Dominio propio (DNS + Vercel) | Dominio del cliente | Bajo |
| C4 | Documentación técnica completa | — | Medio |

---

## 6. Roadmap v1.2 (estimado)

```
Semana 1 (17–21 nov 2026):
  ├── A1: Suite de tests (Vitest unit + Playwright E2E)
  ├── A2: OpenAPI docs
  ├── A5: Checklist de producción
  └── B5: Actualizar README

Semana 2 (24–28 nov 2026):
  ├── A3: RLS en Supabase
  ├── A4: Supabase Auth + RBAC en /admin
  ├── B1: Externalizar config de agentes (JSON)
  └── B3: CRUD de conocimiento en /admin

Semana 3 (1–5 dic 2026):
  ├── B2: Multiagente colaborativo (handoff)
  ├── B4: Auditoría de accesibilidad
  └── B6: Guía de usuario

Semana 4 (8–12 dic 2026):
  ├── B7: Embeddings + búsqueda híbrida (pgvector)
  ├── C1: Integración Sede Electrónica (si hay credenciales)
  └── C4: Documentación técnica completa

Semana 5 (15–19 dic 2026):
  ├── C2: Revisión de seguridad
  ├── C3: Dominio propio
  └── Cierre v1.2 + demo final
```

---

## 7. Métricas de éxito v1.2

| Métrica | v1.0 (actual) | Objetivo v1.2 |
|---|---|---|
| Cobertura de tests | 0% | ≥ 70% (unit + E2E) |
| Hit rate RAG | 100% (13/13 léxico) | ≥ 90% (con embeddings) |
| Agentes | 10 (sin colaboración) | 10 (con handoff) |
| Documentación API | No existe | OpenAPI completo |
| Auth panel admin | Token simple | Supabase Auth + RBAC |
| RLS Supabase | No | Sí (todas las tablas) |
| Accesibilidad | No evaluada | WCAG 2.1 AA |
| Dominio | vercel.app (flagged) | Dominio propio |
| Integración Sede Electrónica | Simulada | Real (si credenciales) |

---

## 8. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Sin credenciales del Concello → integración bloqueada | Alta | Alto | Preparar adapter (interfaz + mock) para enchufar cuando lleguen |
| Safe Browsing flag persiste | Media | Medio | Dominio propio + reporte (ya hecho) |
| Tests revelan regresiones | Media | Medio | Corregir antes de v1.2 release |
| Embeddings aumentan coste/latencia | Media | Bajo | Usar modelos free de OpenRouter para embeddings |
| Accesibilidad requiere refactor UI | Alta | Medio | Planificar desde el diseño, no al final |

---

## 9. Conclusión

La demo v1.0 cumple **12 de 18 entregables** del megaprompt y cubre las **fases 1–3** completas. Las fases 4–6 están parcialmente implementadas o bloqueadas. El plan v1.2 propone **14 tareas** en 5 semanas para alcanzar una versión production-ready, con foco en tests, seguridad (RLS/auth), documentación y calidad (embeddings, accesibilidad, multiagente colaborativo).

La **integración real con la Sede Electrónica** sigue bloqueada por falta de acceso al Concello de Vigo — se recomienda preparar la capa de adapter (interfaz + mock) para que se active en minutos cuando lleguen las credenciales.

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
