# VIGO AI ADMINISTRATION — Presupuesto v2.0

**CHESS AI AGENCY** · AI · Innovation · Execution  
**Versión:** v2.0 · **Fecha:** 14 de noviembre de 2026  
**Importe total:** 90.000 € (sin IVA)  
**Duración:** 6-8 semanas (piloto) + 3 meses de soporte

---

## 0. Relación con el piloto de 12.500 €

El presupuesto de 90.000 € es el **proyecto completo de producción**. El **piloto de 12.500 €** (tramo A, 6 semanas) es la primera fase de este mismo proyecto, con alcance reducido para validar el modelo antes de invertir el total.

| Fase | Precio | Qué incluye | Cuándo |
|---|---|---|---|
| **Piloto (tramo A)** | 12.500 € | 1 área real, 100 documentos, 6 semanas, formación básica | Primero: valida el modelo |
| **Producción completa** | 90.000 € | Todo lo del piloto + embeddings, integración Sede Electrónica, panel admin RBAC, seguridad y cumplimiento, testing, formación completa | Después, si el piloto cumple objetivos |

**Decisión:** el Concello firma primero el piloto (contrato menor, < 15.000 €). Si cumple los objetivos acordados (60 % reducción en consultas, 100 % respuestas con fuente, 20 borradores validados), firma el proyecto completo por 90.000 € (licitación ordinaria). Si no cumple, se queda con el informe y sin compromiso de continuidad.

Los tramos B (7.900 €), C (4.900 €) y D (2.900 €) son versiones reducidas del piloto para concellos de menor tamaño, no del proyecto completo.

---

## 1. Desglose por fase

| Fase | Descripción | Horas | Tarifa/h | Importe |
|---|---|---|---|---|
| **F1. Descubrimiento** | Análisis del Concello, corpus autorizado, criterios de aceptación, mapa de procesos, evaluación de datos, diseño funcional | 80 h | 75 €/h | 6.000 € |
| **F2. Desarrollo core** | Master Agent, 10 agentes especializados, prompts dedicados, guardrails, router, widget ciudadano (gl/es/en), voz (STT/TTS) | 200 h | 75 €/h | 15.000 € |
| **F3. Motor RAG + embeddings** | Migración a búsqueda híbrida (léxico + vector), Supabase/pgvector, corpus autorizado del Concello, evaluación de calidad (hit rate ≥ 90%) | 160 h | 75 €/h | 12.000 € |
| **F4. Integración Sede Electrónica** | Adapter real, gestor de citas, identidad digital (certificado/DNIe), registro municipal, APIs autorizadas | 160 h | 75 €/h | 12.000 € |
| **F5. Panel admin + RBAC** | Supabase Auth, roles (admin/editor/viewer), gestión de conocimiento (CRUD), analytics avanzados, auditoría | 120 h | 75 €/h | 9.000 € |
| **F6. Seguridad y cumplimiento** | RLS en Supabase, revisión GDPR/ENS/AI Act, auditoría de accesibilidad (WCAG 2.1 AA), pentest básico | 120 h | 75 €/h | 9.000 € |
| **F7. Testing y QA** | Suite de tests (unit + E2E), eval RAG ampliado (≥ 50 casos), pruebas de aceptación con usuarios | 80 h | 75 €/h | 6.000 € |
| **F8. Formación y despliegue** | Formación a funcionarios, documentación de usuario, rollout controlado, acompañamiento 3 meses | 100 h | 75 €/h | 7.500 € |
| **F9. Infraestructura y soporte** | Supabase Pro (6 meses), Vercel Pro (6 meses), dominio propio, monitorización (Langfuse), backup | — | — | 4.500 € |
| **F10. Gestión de proyecto** | Coordinación, seguimiento semanal, reporting, gestión de riesgos | 60 h | 75 €/h | 4.500 € |
| | | **Total horas** | **~980 h** | **90.000 €** |

---

## 2. Desglose por perfil profesional

| Perfil | Horas | Tarifa/h | Importe |
|---|---|---|---|
| Arquitecto de soluciones / Tech Lead | 200 h | 90 €/h | 18.000 € |
| Desarrollador Full-Stack (Next.js/React) | 320 h | 75 €/h | 24.000 € |
| Especialista IA / RAG | 160 h | 85 €/h | 13.600 € |
| Especialista seguridad / cumplimiento | 80 h | 90 €/h | 7.200 € |
| Diseñador UX/UI | 60 h | 70 €/h | 4.200 € |
| Formador / documentador | 60 h | 65 €/h | 3.900 € |
| Gestor de proyecto | 100 h | 75 €/h | 7.500 € |
| Infraestructura y soporte | — | — | 11.600 € |
| | **Total** | | **90.000 €** |

---

## 3. Desglose por bloque funcional

| Bloque | Descripción | Importe |
|---|---|---|
| **IA y agentes** | Master Agent, 10 agentes especializados, prompts, guardrails, tool calling, multiagente colaborativo | 22.000 € |
| **RAG y conocimiento** | Motor de recuperación, embeddings, pgvector, corpus autorizado, evaluación de calidad | 15.000 € |
| **Frontend y UX** | Widget ciudadano, portada, panel admin, accesibilidad WCAG 2.1 AA, responsive | 12.000 € |
| **Backend y API** | Next.js API routes, rate limiting, validación, MCP, workflow engine | 10.000 € |
| **Seguridad y cumplimiento** | RLS, Supabase Auth, RBAC, GDPR/ENS/AI Act, auditoría | 9.000 € |
| **Integración** | Sede Electrónica, registro, identidad digital, gestor documental | 8.000 € |
| **Testing y QA** | Suite de tests, eval RAG, pruebas de aceptación, pentest | 6.000 € |
| **Formación y despliegue** | Formación funcionarios, documentación, rollout controlado | 4.500 € |
| **Infraestructura** | Supabase Pro, Vercel Pro, dominio, monitorización, backup | 3.500 € |
| | **Total** | **90.000 €** |

---

## 4. Modelo de licenciamiento post-piloto

| Concepto | Importe anual |
|---|---|
| Licencia de uso (por municipio) | 12.000–24.000 €/año |
| Soporte y mantenimiento | 6.000–12.000 €/año |
| Actualización de corpus | 3.000–6.000 €/año |
| Nuevos departamentos / agentes | 2.000–5.000 €/agente |
| Integraciones adicionales | 3.000–8.000 €/integración |

---

## 5. Condiciones

- **Importes sin IVA.**
- **No incluyen:** hardware, licencias de terceros, adecuaciones de infraestructura ni integraciones de gran complejidad salvo inclusión expresa en el alcance.
- **Forma de pago:** 30% al inicio · 40% a la entrega del piloto · 30% tras aceptación.
- **Duración:** 6-8 semanas de piloto + 3 meses de soporte post-lanzamiento.
- **Garantía:** 3 meses de corrección de defectos sin coste adicional.
- La contratación pública exige definir prestaciones, solvencia, criterios y presupuesto conforme al procedimiento aplicable.

---

## 6. Comparativa con alternativas

| Aspecto | VIGO AI ADMINISTRATION | Chatbot genérico | Desarrollo a medida |
|---|---|---|---|
| **Coste inicial** | 90.000 € (piloto) | 15.000–30.000 € | 150.000–300.000 € |
| **Multi-agente** | 10 agentes especializados | 1 agente genérico | A medida |
| **RAG con citas** | ✅ verificables | ❌ sin fuentes | A medida |
| **Multilingüe** | gl/es/en nativo | Solo es | A medida |
| **Abstención** | ✅ no inventa | ❌ alucinaciones | Depende |
| **Escalación humana** | ✅ integrada | ❌ no | A medida |
| **Tiempo de despliegue** | 6-8 semanas | 2-4 semanas | 6-12 meses |
| **Mantenimiento anual** | 12.000–24.000 € | 6.000–12.000 € | 30.000–60.000 € |

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
