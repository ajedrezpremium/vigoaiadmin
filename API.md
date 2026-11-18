# API — VIGO AI ADMINISTRATION

**Base URL:** `https://vigo-ai-demo.vercel.app` (producción) · `http://localhost:3000` (local)
**Formato:** JSON. Todos los endpoints aceptan y devuelven `application/json`.
**Autenticación:** panel admin requiere `x-admin-key: <ADMIN_TOKEN>` o Bearer token de Supabase Auth.

---

## Endpoints públicos

### `POST /api/chat`
Orquestación principal del asistente ciudadano.

**Body:**
```json
{ "message": "string (max 2000)", "history": [{ "role": "user|assistant", "content": "string" }], "language": "gl|es|en", "conversationId": "uuid (opcional)" }
```

**Respuesta 200:**
```json
{ "reply": "string", "agent": "string", "agentLabel": "string", "sources": [...], "provider": "string", "model": "string" }
```

**Rate limit:** 20 req/min por IP.

---

### `POST /api/leads`
Registro de solicitudes de demostración desde las landings.

**Body:**
```json
{ "concello": "string", "nome": "string", "email": "string", "cargo": "string (opc)", "telefono": "string (opc)", "tramo": "A|B|C|D (opc)", "interese": "string (opc)", "mensaxe": "string (opc)", "idioma": "gl|es", "consent": true, "orixe": "landing_ayuntamientos|landing_campana (opc)", "website": "honeypot (debe estar vacío)" }
```

**Respuesta 200:** `{ "ok": true, "stored": "leads|none", "notified": true|false }`

---

### `POST /api/escalate`
Escalación humana (Human-in-the-Loop). Persiste en Supabase y envía notificación.

**Body:** `{ "conversationId": "uuid", "summary": "string", "reason": "string" }`

**Respuesta 200:** `{ "id": "uuid", "status": "pending" }`

---

### `POST /api/mcp`
Protocolo MCP (tools/list + tools/call).

**Body:** `{ "jsonrpc": "2.0", "method": "tools/list|tools/call", "params": {...}, "id": 1 }`

---

### `POST /api/workflow`
Motor de workflows (cita-previa, info-tramite).

**Body:** `{ "flowId": "cita-previa|info-tramite", "input": { ... } }`

**Respuesta 200:** resultado del flujo con trazabilidad por paso.

---

## Endpoints de administración (requieren auth)

### `GET /api/admin/eval`
Ejecuta el golden set (13 casos) y devuelve hit rate, abstención y detalles.

**Query:** `?token=<ADMIN_TOKEN>` (si configurado).

**Respuesta 200:** `{ "hitRate": 1.0, "cases": [...], "abstention": ... }`

---

### `GET /api/admin/stats`
Estadísticas del panel: volumen de mensajes, distribución por agente, proveedor IA usado.

**Header:** `x-admin-key: <ADMIN_TOKEN>`

**Respuesta 200:** `{ "messages": N, "agents": {...}, "providers": {...} }`
**Respuesta 503:** Supabase no configurado.

---

### `GET /api/admin/leads`
Lista de leads registrados (paginado).

**Header:** `x-admin-key: <ADMIN_TOKEN>`

**Respuesta 200:** `{ "leads": [...], "total": N }`

---

### `POST /api/admin/knowledge`
Gestión de documentos del corpus (CRUD). Requiere auth.

---

### `POST /api/admin/email-test`
Envío de copia de plantillas de correo para revisión. **Cerrado en producción (503)** si `ADMIN_TOKEN` no está configurado.

**Header:** `x-admin-key: <ADMIN_TOKEN>`
**Body:** `{ "to": "email", "kind": "ack|alert|final|first|both", "concello": "string (opc)", "idioma": "gl|es" }`

---

### `POST /api/admin/auth`
Autenticación del panel admin (token simple o Supabase Bearer).

---

## Documentación interactiva

La especificación OpenAPI 3.0 está disponible en:
- `GET /api/docs` → sirve `public/openapi.json`
- Archivo fuente: `public/openapi.json`

---

**CHESS AI AGENCY** · AI · Innovation · Execution
