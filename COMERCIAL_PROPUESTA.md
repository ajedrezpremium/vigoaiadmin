# VIGO AI ADMINISTRATION — Propuesta Comercial para Licitación

**CHESS AI AGENCY** · AI · Innovation · Execution  
**Versión:** v2.0 · **Fecha:** 14 de noviembre de 2026  
**Demo en vivo:** https://vigo-ai-demo.vercel.app  
**Presupuesto:** 90.000 € (sin IVA) · **Duración:** 6-8 semanas (piloto)

---

## 1. Resumen ejecutivo

VIGO AI ADMINISTRATION es una **plataforma multiagente de inteligencia artificial** para la gestión eficiente e inteligente de servicios públicos municipales. Permite a la ciudadanía consultar información municipal (horarios, trámites, ordenanzas, subvenciones, cultura, historia) a través de un asistente conversacional multilingüe (galego, español, inglés), con respuestas fundamentadas en documentos oficiales y trazabilidad completa.

**Demo funcional en producción:** https://vigo-ai-demo.vercel.app (capa gratuita, datos sintéticos).

---

## 2. El problema

Los ayuntamientos gestionan miles de consultas ciudadanas diarias. La atención presencial y telefónica consume recursos, genera colas y no escala. La información está dispersa en múltiples webs y documentos. La ciudadanía no sabe dónde encontrarla.

## 3. La solución

Una plataforma con **10 agentes especializados** coordinados por un Master Agent:

| Agente | Dominio |
|---|---|
| Citizen AI | Información ciudadana, horarios, servicios |
| Admin AI | Trámites, documentación, procedimientos |
| Legal AI | Ordenanzas, normativa, regulaciones |
| Document AI | Resúmenes, clasificación, extracción |
| Urban AI | Urbanismo, licencias de obra |
| Business AI | Empresas, subvenciones, aperturas |
| Social AI | Servicios sociales, asistencia |
| Culture AI | Cultura, turismo, agenda, bibliotecas |
| Language AI | Traducción multilingüe |
| History AI | Historia de Vigo, hitos, patrimonio |

### Capacidades PRO
- **LLM Router** con fallback automático (OpenRouter → Gemini → modo local)
- **Tool Calling**: búsqueda en conocimiento, escalación, registro de cita
- **RAG con citas verificables** [S1][S2]: cada respuesta se fundamenta en documentos oficiales
- **Abstención**: no inventa datos sin evidencia
- **Human-in-the-Loop**: escalación a personal municipal
- **Memoria persistente**: conversaciones continuas entre turnos
- **MCP**: integración con sistemas externos (tools/list, tools/call)
- **Workflow Engine**: flujos multi-paso (cita-previa, info-trámite)
- **Observabilidad**: trazas OTEL + Langfuse, eval RAG (100% hit rate)
- **Multilingüe**: galego, español, inglés

## 4. Valor diferencial

| Aspecto | VIGO AI | Chatbot genérico | Desarrollo a medida |
|---|---|---|---|
| Multi-agente | 10 agentes especializados | 1 agente genérico | A medida |
| RAG con citas | ✅ verificables | ❌ sin fuentes | A medida |
| Multilingüe | ✅ gl/es/en nativo | ❌ solo es | A medida |
| Abstención | ✅ no inventa | ❌ alucinaciones | Depende |
| Escalación humana | ✅ integrada | ❌ no | A medida |
| Tiempo de despliegue | 6-8 semanas | 2-4 semanas | 6-12 meses |
| Coste inicial | 90.000 € (piloto) | 15.000–30.000 € | 150.000–300.000 € |
| Mantenimiento anual | 12.000–24.000 € | 6.000–12.000 € | 30.000–60.000 € |

## 5. Seguridad y cumplimiento

- RGPD, ENS, AI Act by design
- Minimización de datos (sin PII)
- Rate limiting, anti prompt-injection
- Auditoría completa (audit_events)
- RLS en Supabase (v1.2)
- RBAC (roles admin/editor/viewer)
- Abstención obligatoria sin evidencia
- Revisión de seguridad pendiente para producción real

## 6. Potencial de crecimiento

- **Fase piloto** (6-8 semanas): corpus autorizado del Concello, embeddings + búsqueda híbrida, formación.
- **Escalado**: nuevos departamentos en días, no meses.
- **Integraciones**: Sede Electrónica, Registro Municipal, gestor documental, identidad digital.
- **Multi-tenant**: adaptable a otros ayuntamientos, mancomunidades, diputaciones.
- **Potencial de mercado**: 8.000+ ayuntamientos en España.

## 7. Presupuesto

**90.000 €** (sin IVA) — ver `COMERCIAL_PRESUPUESTO_V2.md` para desglose detallado.

Forma de pago: 30% al inicio · 40% a la entrega del piloto · 30% tras aceptación.

## 8. Documentación adjunta

| Documento | Descripción |
|---|---|
| `COMERCIAL_RESUMEN_EJECUTIVO.md` | Resumen ejecutivo (1-2 páginas) |
| `COMERCIAL_PRESUPUESTO_V2.md` | Presupuesto detallado (90.000 €) |
| `COMERCIAL_STACK_TECNICO.md` | Stack técnico y arquitectura |
| `COMERCIAL_INFOGRAFIA.md` | Descripción de infografía para diseño |
| `COMERCIAL_VIDEO_30S.md` | Script de video de 30 segundos |
| `AUDITORIA_PLAN_MEJORA_V1.2.md` | Auditoría y plan de mejora v1.2 |
| `PRODUCTION_READINESS_CHECKLIST.md` | Checklist de 32 items para go-live |
| `GUIA_USUARIO.md` | Guía de usuario de la plataforma |
| `ACCESIBILIDAD_WCAG.md` | Mejoras de accesibilidad WCAG 2.1 AA |

## 9. Demo en vivo

- **URL:** https://vigo-ai-demo.vercel.app (pública, capa gratuita)
- **Aviso legal:** https://vigo-ai-demo.vercel.app/aviso-legal
- **API docs:** https://vigo-ai-demo.vercel.app/api/docs
- **Panel admin:** https://vigo-ai-demo.vercel.app/admin

## 10. Contacto

**CHESS AI AGENCY** — AI · Innovation · Execution  
Web: https://vigo-ai-demo.vercel.app

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
