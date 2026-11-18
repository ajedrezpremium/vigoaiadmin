# VIGO AI ADMINISTRATION — Mejoras para v2.0

**Fecha de revisión:** 18 de noviembre de 2026
**Base:** 19 documentos markdown + código v1.2 (commit `544d394`)
**Objetivo:** convertir la demo comercial en una plataforma mantenible, con documentación viva y un proceso de venta repetible.

---

## 1. Estado actual (lo que ya está bien)

- ✅ Demo funcional desplegada en 2 dominios (vigo-ai-demo + ia-administracion-local).
- ✅ 57 tests unitarios pasando, build OK.
- ✅ Campaña fase 1 enviada a 10 concellos (Vigo + tramo A), todos `delivered`.
- ✅ Infografía de 10 razones, guion de llamada, checklist de licitación.
- ✅ Documentación de seguridad/compliance (GDPR/ENS/AI Act) y accesibilidad (WCAG).
- ✅ Presupuesto v2.0 (90.000 €) y dosier de licitación para Vigo.

**Problema:** la documentación creció de forma orgánica. Hay solapamientos, inconsistencias de cifras y ningún documento de "cómo operar el día a día".

---

## 2. Inconsistencias detectadas (corregir primero)

| # | Inconsistencia | Dónde | Acción |
|---|---|---|---|
| 1 | **Dos ofertas distintas sin relación explícita**: piloto 12.500 € (6 sem) vs. producción 90.000 € (6–8 sem + 3 meses). No se explica que el piloto es el primer tramo del proyecto completo. | `PILOTO_12500_VIGO.md` vs `COMERCIAL_PRESUPUESTO_V2.md` | Añadir una sección "Relación entre ofertas" en ambos: el piloto es el tramo A (12.500 €) y la producción es el total (90.000 €) con los mismos tramos A–D. |
| 2 | **README desactualizado** (auditado en B11): dice 9 agentes (son 10), modelos `llama-3.3-70b-instruct:free` y `gemini-2.0-flash` que ya no existen, escalación "simulada" (ahora real). | `README.md` | Reescribir secciones de stack, agentes y escalación. |
| 3 | **COMERCIAL_EMAIL_TEMPLATE.md** probablemente desactualizado respecto a `lib/email-templates.ts` (que ya tiene `finalEmail` y `firstContactEmail`). | `COMERCIAL_EMAIL_TEMPLATE.md` | Sincronizar o marcar como "fuente de verdad: código". |
| 4 | **Nombre del producto inconsistente**: "VIGO AI ADMINISTRATION" (demo), "VIGO DOCS AI" (piloto), "IA para la Administración Local" (campaña). | Varios | Crear `NAMING.md` con la guía de nombres por contexto. |
| 5 | **Las 5 métricas de `/campana`** no están en ningún documento de producto. | `components/CampanaLanding.tsx` | Añadir a `PUBLICOS_Y_ALCANCE.md` y a `COMERCIAL_PROPUESTA.md`. |
| 6 | **Infografía de 10 razones** no referenciada en ningún doc comercial. | `public/infografia-10-razones.html` | Añadir al índice de materiales en `COMERCIAL_RESUMEN_EJECUTIVO.md`. |

---

## 3. Brechas de documentación (v2.0)

### 🔴 Críticas

| # | Brecha | Impacto | Solución propuesta |
|---|---|---|---|
| D1 | **Sin guía de demo (30 min)**. No existe un guion para la demostración que se ofrece en la campaña. | El comercial improvisa y pierde credibilidad. | Crear `DEMO_SCRIPT.md` con flujo minuto a minuto, datos sintéticos a usar y preguntas de calificación. |
| D2 | **Sin plantilla de toque 4 (día 14)**. El plan de campaña define 4 toques pero solo hay plantilla para el 1 y el 3. | El cierre de cortesía no está redactado; se improviza. | Añadir plantilla en `CAMPANA_PONTEVEDRA.md` §8.4. |
| D3 | **Sin onboarding playbook**. No hay documento de "qué pasa después de firmar". | El cliente no sabe qué esperar; riesgo de abandono. | Crear `ONBOARDING_PLAYBOOK.md` (semana 1–8: carga de corpus, configuración, formación, medición). |
| D4 | **Sin changelog ni versionado**. No hay `CHANGELOG.md`. | Imposible saber qué cambió entre versiones. | Crear `CHANGELOG.md` con semver, empezando por v1.0 → v1.2 → v2.0. |

### 🟡 Importantes

| # | Brecha | Impacto | Solución propuesta |
|---|---|---|---|
| D5 | **CAMPANA_PONTEVEDRA.md es monolítico** (17k, 330 líneas). Mezcla estrategia, secuencia, plantillas y métricas. | Difícil de mantener y de encontrar información. | Dividir en 3: `CAMPANA_ESTRATEGIA.md`, `CAMPANA_EJECUCION.md`, `CAMPANA_PLANTILLAS.md`. |
| D6 | **LICITACION_CHECKLIST_VIGO.md es muy largo** (24k). Útil pero denso. | El comercial no lo lee entero. | Extraer un "resumen de 1 página" (go/no-go + 5 pasos) al inicio. |
| D7 | **Sin índice de materiales comerciales**. Hay infografía, video 30s, presupuesto, propuesta, resumen ejecutivo… pero no hay un índice que diga cuándo usar cada uno. | Se pierde tiempo buscando el material adecuado. | Crear `MATERIALES_COMERCIALES.md` con tabla: material → cuándo usarlo → archivo. |
| D8 | **Sin documentación de API** (OpenAPI). El audit lo marcó como brecha B2. | Integración externa imposible; el panel admin no puede gestionar conocimiento. | Generar `openapi.yaml` desde los routes existentes o documentar en `API.md`. |
| D9 | **Sin guía de accesibilidad con resultados**. `ACCESIBILIDAD_WCAG.md` es corto (1.7k) y no tiene auditoría real. | Riesgo legal para administración pública. | Ampliar con resultados de auditoría (axe-core) y plan de corrección. |
| D10 | **Sin métricas de campaña automatizadas**. El seguimiento es manual en CSV. | No se sabe la tasa de respuesta real. | Añadir un dashboard simple en `/admin` con métricas de leads (ya hay `/api/admin/stats` y `/api/admin/leads`). |

---

## 4. Propuesta de estructura de documentación v2.0

```
docs/
├── PRODUCTO/
│   ├── PUBLICOS_Y_ALCANCE.md          (existente, actualizar métricas)
│   ├── COMERCIAL_PROPUESTA.md         (existente)
│   ├── COMERCIAL_PRESUPUESTO_V2.md    (existente, añadir relación piloto↔producción)
│   ├── COMERCIAL_RESUMEN_EJECUTIVO.md (existente)
│   ├── COMERCIAL_EMAIL_TEMPLATE.md    (sincronizar con código)
│   ├── MATERIALES_COMERCIALES.md      (NUEVO: índice de materiales)
│   ├── NAMING.md                      (NUEVO: guía de nombres)
│   └── PILOTO_12500_VIGO.md           (existente, añadir relación)
├── VENTA/
│   ├── CAMPANA_ESTRATEGIA.md          (extraer de CAMPANA_PONTEVEDRA)
│   ├── CAMPANA_EJECUCION.md           (extraer: secuencia, límites, CSV)
│   ├── CAMPANA_PLANTILLAS.md          (extraer: emails toque 1-4)
│   ├── GUION_LLAMADA_CONCELLOS.md     (existente)
│   ├── DEMO_SCRIPT.md                 (NUEVO: guion de demo 30 min)
│   └── CONTACTOS_PONTEVEDRA.md        (existente)
├── TECNICO/
│   ├── README.md                      (actualizar)
│   ├── AUDITORIA_PLAN_MEJORA_V1.2.md  (existente, actualizar a v2.0)
│   ├── PRODUCTION_READINESS_CHECKLIST (existente)
│   ├── SEGURIDAD_GDPR_ENS_AIACT.md    (existente)
│   ├── ACCESIBILIDAD_WCAG.md          (ampliar)
│   ├── GUIA_USUARIO.md                (existente)
│   ├── API.md / openapi.yaml          (NUEVO)
│   └── ONBOARDING_PLAYBOOK.md         (NUEVO)
├── LICITACION/
│   └── LICITACION_CHECKLIST_VIGO.md   (existente, añadir resumen 1 pág)
└── CHANGELOG.md                       (NUEVO)
```

---

## 5. Quick wins (1–2 días, alto impacto)

1. **Actualizar README.md** (modelos, 10 agentes, escalación real). Esfuerzo: 2 h.
2. **Sincronizar COMERCIAL_EMAIL_TEMPLATE.md** con `lib/email-templates.ts`. Esfuerzo: 1 h.
3. **Crear `NAMING.md`** con la guía de nombres. Esfuerzo: 30 min.
4. **Crear `MATERIALES_COMERCIALES.md`** (índice). Esfuerzo: 1 h.
5. **Añadir plantilla de toque 4** al plan de campaña. Esfuerzo: 30 min.
6. **Añadir `CHANGELOG.md`** con v1.0 → v1.2 → v2.0. Esfuerzo: 1 h.

## 6. Mejoras de medio plazo (1–2 semanas)

7. **Dividir `CAMPANA_PONTEVEDRA.md`** en 3 documentos. Esfuerzo: 3 h.
8. **Crear `DEMO_SCRIPT.md`** (guion de demo 30 min). Esfuerzo: 2 h.
9. **Crear `ONBOARDING_PLAYBOOK.md`** (qué pasa después de firmar). Esfuerzo: 3 h.
10. **Ampliar `ACCESIBILIDAD_WCAG.md`** con resultados de axe-core. Esfuerzo: 4 h.
11. **Documentar API** (OpenAPI o `API.md`). Esfuerzo: 4 h.
12. **Añadir dashboard de métricas de leads** en `/admin`. Esfuerzo: 1 día.

## 7. Mejoras estratégicas (1 mes)

13. **Implementar las brechas técnicas** del audit (RLS, Supabase Auth, embeddings, multiagente colaborativo).
14. **Crear `DPIA` (evaluación de impacto)** para AI Act art. 27.
15. **Dominio propio** + reporte a Safe Browsing.
16. **Integración real** con Sede Electrónica (cuando haya credenciales).

---

## 8. Métricas de éxito para v2.0

| Métrica | v1.2 (actual) | Objetivo v2.0 |
|---|---|---|
| Documentos markdown | 19 (sin índice) | 25+ (con índice y sin duplicados) |
| README actualizado | No | Sí |
| Guía de demo | No | Sí (30 min, con guion) |
| Onboarding playbook | No | Sí |
| Plantillas de email | 2 (toque 1 y Vigo) | 4 (toques 1–4) |
| API documentada | No | OpenAPI o API.md |
| Changelog | No | Sí (semver) |
| Nombres de producto | 3 inconsistentes | 1 guía de naming |
| Cobertura de tests | 57 unit | + E2E (Playwright) |

---

## 9. Lo que NO cambiaría

- **La estrategia comercial de 3 fases** (primer contacto → demo → reunión). Funciona.
- **El límite de 10 emails/día**. Es correcto para no caer en spam.
- **El dominio neutro** `ia-administracion-local.vercel.app`. Es la solución correcta para la campaña.
- **La regla de "un solo destinatario por concello en fase 1"**. Evita ser marcado como spam.
- **El enfoque en contratos menores** (< 15.000 €). Es el camino realista para un concello pequeño.

---

**Documento preparado por CHESS AI AGENCY · VIGO AI ADMINISTRATION · 18/11/2026**
