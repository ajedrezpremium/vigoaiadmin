# VIGO AI ADMINISTRATION — Checklist de Readiness para Producción

**Versión:** v1.2  
**Fecha:** 14 de noviembre de 2026  
**Demo actual:** https://vigo-ai-demo.vercel.app (capa gratuita, datos sintéticos)

---

## 1. Seguridad

- [ ] **RLS habilitado** en todas las tablas de Supabase (`conversations`, `messages`, `audit_events`, `escalations`)
- [ ] **Supabase Auth** configurado (email/password o SSO municipal)
- [ ] **RBAC** implementado en panel admin (roles: admin, editor, viewer)
- [ ] **ADMIN_TOKEN** rotado y almacenado en gestor de secretos (no en `.env.local` plano)
- [ ] **Rate limiting** validado bajo carga (actual: 20 req/min por IP)
- [ ] **Anti prompt-injection** validado con corpus de ataque
- [ ] **Headers de seguridad** configurados (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- [ ] **HTTPS** forzado en todos los endpoints
- [ ] **Secrets** no expuestos en bundle del cliente (verificar `NEXT_PUBLIC_*`)

## 2. Privacidad y cumplimiento (RGPD / ENS / AI Act)

- [ ] **Minimización de datos** verificada (sin PII en conversaciones)
- [ ] **Retención de datos** definida (TTL para conversaciones y audit_events)
- [ ] **Derecho de supresión** implementado (endpoint para borrar conversación por ID)
- [ ] **Consentimiento** informado en el widget (aviso de uso de IA)
- [ ] **Transparencia** — el asistente se identifica como IA (✅ ya implementado)
- [ ] **Abstención** — no inventa datos sin evidencia (✅ ya implementado)
- [ ] **Evaluación de impacto** (DPIA) para sistemas de IA (AI Act, art. 27)
- [ ] **Registro de sistemas de IA** (AI Act, art. 49) si aplica
- [ ] **Accesibilidad** UNE-EN 301 549 / WCAG 2.1 AA evaluada y corregida

## 3. Calidad y rendimiento

- [ ] **Suite de tests** ejecutada (unit + E2E) con cobertura ≥ 70%
- [ ] **Eval RAG** con golden set ampliado (≥ 50 casos) y hit rate ≥ 90%
- [ ] **Latencia p95** del endpoint `/api/chat` < 5 segundos
- [ ] **Disponibilidad** verificada (uptime ≥ 99.5%)
- [ ] **Carga** validada (≥ 50 usuarios concurrentes)
- [ ] **Embeddings + búsqueda híbrida** implementados (pgvector)

## 4. Contenido y datos

- [ ] **Corpus autorizado** del Concello de Vigo cargado (no sintético)
- [ ] **Documentos con metadatos completos** (título, dept, tipo, fecha, vigencia)
- [ ] **Versionado de documentos** implementado (histórico de cambios)
- [ ] **Permisos por documento** (qué agente puede acceder a qué fuente)
- [ ] **Actualización periódica** del corpus automatizada

## 5. Integración

- [ ] **Credenciales de Sede Electrónica** obtenidas del Concello
- [ ] **Adapter real** implementado (sustituye mock)
- [ ] **Gestor de citas** integrado (si disponible)
- [ ] **Identidad digital** (certificado/DNIe/clave) integrada
- [ ] **Registro Municipal** integrado (si API disponible)

## 6. Operaciones

- [ ] **Dominio propio** configurado (DNS + Vercel)
- [ ] **SSL/TLS** válido en dominio propio
- [ ] **Monitoring** configurado (Vercel Analytics + Langfuse)
- [ ] **Alertas** configuradas (errores, latencia, rate limits)
- [ ] **Backup** de Supabase configurado (automático diario)
- [ ] **Plan de rollback** documentado
- [ ] **Staff training** completado (funcionarios del Concello)

## 7. Legal y contractual

- [ ] **Contrato de encargo de tratamiento** (art. 28 RGPD) firmado
- [ ] **Acuerdo de nivel de servicio** (SLA) definido
- [ ] **Propiedad intelectual** del código y datos clarificada
- [ ] **Términos de uso** publicados en `/aviso-legal`
- [ ] **Política de privacidad** publicada
- [ ] **Cookie banner** (si se usan cookies analíticas)

## 8. Demo → Producción (transición)

- [ ] **Migración de datos sintéticos** a datos reales autorizados
- [ ] **Revisión de prompts** con contenido real
- [ ] **Re-evaluación RAG** con corpus real (hit rate ≥ 90%)
- [ ] **Pruebas de aceptación** con usuarios del Concello
- [ ] **Go-live controlado** (piloto con un departamento)
- [ ] **Plan de escalado** (nuevos departamentos)

---

**Estado actual (v1.0 demo):** 8/32 items completados (25%).  
**Objetivo v1.2:** ≥ 20/32 items completados (62%).  
**Producción real:** 32/32 (100%) tras Fase 6.

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
