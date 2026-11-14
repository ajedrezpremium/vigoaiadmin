# VIGO AI ADMINISTRATION — Resumen Ejecutivo

**CHESS AI AGENCY** · AI · Innovation · Execution  
**Versión:** v2.0 · **Fecha:** 14 de noviembre de 2026  
**Demo en vivo:** https://vigo-ai-demo.vercel.app

---

## 1. El problema

Los ayuntamientos gestionan miles de consultas ciudadanas diarias (horarios, trámites, ordenanzas, subvenciones, cultura, historia). La atención presencial y telefónica consume recursos, genera colas y no escala. La información está dispersa en múltiples webs y documentos, y la ciudadanía no sabe dónde encontrarla.

## 2. La solución: VIGO AI ADMINISTRATION

Una **plataforma multiagente de IA** que actúa como asistente inteligente para la ciudadanía y los funcionarios municipales:

- **Asistente conversacional 24/7** en galego, español e inglés.
- **10 agentes especializados** (Ciudadano, Trámites, Normativa, Documentos, Urbanismo, Empresa, Social, Cultura, Idiomas, Historia) coordinados por un Master Agent.
- **RAG con citas verificables** [S1][S2]: cada respuesta se fundamenta en documentos oficiales, con abstención cuando no hay evidencia.
- **Human-in-the-Loop**: escalación a personal municipal cuando se requiere revisión humana.
- **Memoria persistente**: conversaciones continuas entre turnos.
- **MCP + Workflow Engine**: integración con sistemas externos y flujos multi-paso.
- **Observabilidad**: trazas OTEL + Langfuse, evaluación de calidad RAG (100% hit rate en demo).

## 3. Valor diferencial

| Aspecto | VIGO AI ADMINISTRATION | Soluciones tradicionales |
|---|---|---|
| **Multi-agente** | 10 agentes especializados con guardrails | Chatbot genérico único |
| **Trazabilidad** | Citas [S1][S2] verificables por documento | Respuestas sin fuente |
| **Abstención** | No inventa: se abstiene sin evidencia | Alucinaciones frecuentes |
| **Multilingüe** | gl / es / en nativo | Solo español |
| **Seguridad** | RGPD/ENS/AI Act by design, minimización de datos | Sin controles |
| **Escalabilidad** | Nuevos departamentos en días, no meses | Reconfiguración costosa |
| **Coste operativo** | Modelos IA gratuitos/abiertos, infraestructura municipal | Licencias por usuario/mes |

## 4. Demo en vivo

- **URL:** https://vigo-ai-demo.vercel.app (pública, capa gratuita)
- **10 agentes** con prompts dedicados y guardrails
- **RAG** con 18 documentos sintéticos, 100% hit rate
- **Human-in-the-Loop** real (escalación a Supabase)
- **Memoria persistente** entre turnos
- **MCP** (tools/list + tools/call) para integración externa
- **Workflow Engine** (cita-previa, info-trámite)
- **Observabilidad** (spans OTEL + Langfuse opcional)
- **Tests**: 27 tests (Vitest), cobertura RAG + router + eval
- **Accesibilidad**: skip link, focus-visible, prefers-reduced-motion, ARIA

## 5. Potencial de crecimiento

- **Fase piloto** (6-8 semanas): corpus autorizado del Concello, embeddings + búsqueda híbrida, Supabase/pgvector, formación.
- **Escalado**: nuevos departamentos (Urbanismo, Social, Cultura, Business) en días.
- **Integraciones**: Sede Electrónica, Registro Municipal, gestor documental, identidad digital (certificado/DNIe).
- **Multi-tenant**: adaptable a otros ayuntamientos, mancomunidades, diputaciones.
- **Modelo de negocio**: licencia por municipio + soporte + actualizaciones de corpus.
- **Potencial de mercado**: 8.000+ ayuntamientos en España, muchos sin asistente IA.

## 6. Inversión solicitada

**90.000 €** (sin IVA) para el piloto completo (6-8 semanas), desglosado en `PRESUPUESTO_V2.md`.

Incluye: descubrimiento, desarrollo, integración, testing, formación y soporte post-lanzamiento.

## 7. Contacto

**CHESS AI AGENCY** — AI · Innovation · Execution  
Web: https://vigo-ai-demo.vercel.app  
Aviso legal: https://vigo-ai-demo.vercel.app/aviso-legal

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
