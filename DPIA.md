# Evaluación de Impacto (DPIA) — VIGO AI ADMINISTRATION

**Artículo 27 del Reglamento (UE) 2024/1689 (AI Act) y art. 35 RGPD**
**CHESS AI AGENCY · 18/11/2026**

---

## 1. Descripción del sistema

**VIGO AI ADMINISTRATION** es una plataforma multiagente de inteligencia artificial para servicios públicos municipales. Proporciona:

- Asistente conversacional ciudadano (información municipal, trámites, normativa, cultura, historia).
- Asistente interno para personal municipal (búsqueda documental, borradores, transcripción).
- Motor RAG con citas verificables sobre corpus documental autorizado.

**Roles:**
- **Responsable del tratamiento:** Concello de Vigo (o el concello cliente).
- **Encargado del tratamiento:** CHESS AI AGENCY (art. 28 RGPD).

## 2. Finalidad y base jurídica

| Finalidad | Base jurídica |
|---|---|
| Información ciudadana | Interés público (art. 6.1.e RGPD) |
| Asistencia a personal municipal | Interés legítimo del responsable (art. 6.1.f RGPD) |
| Auditoría y mejora del servicio | Interés legítimo (art. 6.1.f RGPD) |

## 3. Datos tratados

| Dato | ¿Se trata? | Justificación |
|---|---|---|
| Contenido de consultas ciudadanas | Sí (minimizado) | Necesario para responder |
| Historial de conversación | Sí (con TTL) | Contexto multi-turno |
| Datos personales (DNI, cuentas, salud) | **No** | El sistema los rechaza (guardrail §7) |
| Metadatos de uso (agente, proveedor, latencia) | Sí | Auditoría y mejora |
| IP del usuario | Sí (rate limiting) | Seguridad |

**Minimización:** el widget avisa explícitamente de no enviar datos personales. El sistema no solicita ni almacena PII.

## 4. Riesgos identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Respuesta incorrecta (alucinación) | Media | Alto | RAG con citas + abstención sin evidencia + supervisión humana |
| Exposición de datos sensibles | Baja | Alto | Minimización, RLS, alojamiento UE, no PII |
| Sesgo en respuestas | Media | Medio | Corpus autorizado, guardrails, revisión humana |
| Dependencia de proveedor externo | Media | Medio | Multi-proveedor con fallback automático |
| Acceso no autorizado al panel admin | Media | Alto | Supabase Auth + RBAC (en implementación) |
| Prompt injection | Baja | Alto | Guardrails + separación datos/instrucciones |

## 5. Medidas técnicas y organizativas

- **Alojamiento:** UE (Vercel + Supabase, región europea).
- **Cifrado:** HTTPS (HSTS), datos en reposo cifrados por Supabase.
- **Control de acceso:** RBAC (admin/editor/viewer), RLS en todas las tablas.
- **Auditoría:** registro de eventos (audit_events), spans OTEL-style, Langfuse opcional.
- **Retención:** TTL configurable para conversaciones y mensajes.
- **Derecho de supresión:** endpoint para borrar conversación por ID (pendiente de implementar).
- **Transparencia:** el asistente se identifica como IA, no como empleado municipal.
- **Abstención:** no inventa datos sin evidencia.

## 6. Clasificación AI Act

- **Riesgo:** Limitado (art. 50 — transparencia). No es alto riesgo (no toma decisiones administrativas, no afecta derechos fundamentales).
- **Obligaciones:** transparencia (identificarse como IA), registro de sistemas de IA (art. 49, si aplica), supervisión humana.

## 7. Conclusión

El sistema **no presenta riesgo alto** según el AI Act. Las medidas técnicas y organizativas son adecuadas para el nivel de riesgo limitado. Se recomienda:

1. Completar RLS y Supabase Auth antes de producción real.
2. Implementar derecho de supresión (endpoint de borrado).
3. Definir política de retención de datos.
4. Realizar auditoría de seguridad externa antes del go-live.

---

**CHESS AI AGENCY** · AI · Innovation · Execution · 18/11/2026
*Documento preliminar — pendiente de revisión por asesoría jurídica.*
