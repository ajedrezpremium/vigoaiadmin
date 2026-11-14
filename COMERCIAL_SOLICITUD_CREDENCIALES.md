# Solicitud de credenciales — Sede Electrónica del Concello de Vigo

**CHESS AI AGENCY** · AI · Innovation · Execution  
**Versión:** v2.0 · **Fecha:** 14 de noviembre de 2026

---

## Carta de solicitud (borrador)

---

**De:** CHESS AI AGENCY  
**Para:** Concellería de Comercio, Industria, Turismo e Pemes — Concello de Vigo  
**Asunto:** Solicitud de acceso a entorno de pruebas (sandbox) de la Sede Electrónica para piloto de integración

---

Estimado/a responsable,

En el marco de la colaboración propuesta para el desarrollo de un asistente de IA para servicios públicos municipales (VIGO AI ADMINISTRATION), solicitamos acceso a un **entorno de pruebas (sandbox)** de la Sede Electrónica del Concello de Vigo para preparar la integración real del sistema.

### Datos solicitados

| Dato | Descripción | Uso |
|---|---|---|
| **URL base del sandbox** | Endpoint de pruebas de la Sede Electrónica | Configuración del adapter de integración |
| **Token / credenciales de acceso** | Token de autenticación para el entorno de pruebas | Autenticación del adapter (mode=real) |
| **Documentación de la API** | Especificación OpenAPI/Swagger del servicio de cita previa | Implementación del adapter |
| **Endpoints disponibles** | URLs de los servicios (cita previa, registro, consulta de estado) | Configuración del adapter |
| **Límites de rate** | Límites de peticiones por minuto/hora | Configuración del cliente HTTP |
| **Datos de prueba** | Conjunto de datos sintéticos autorizados para pruebas | Validación del flujo completo |
| **Contacto técnico** | Persona de contacto en el equipo de informática/administración electrónica | Soporte durante la integración |

### Alcance de la integración solicitada

1. **Solicitud de cita previa** — registro simulado → real
2. **Consulta de estado** de expedientes (solo lectura)
3. **Presentación de escritos** en el Registro Municipal (solo vía electrónica autorizada)
4. **Verificación de identidad** (certificado digital, DNIe, clave)

### Compromisos de CHESS AI AGENCY

- Las credenciales se usarán **exclusivamente** en el entorno de pruebas.
- No se accederá a datos reales de ciudadanos.
- No se modificarán registros oficiales.
- Se firmará un **acuerdo de confidencialidad** si el Concello lo requiere.
- Las credenciales se almacenarán en un gestor de secretos cifrado.

### Estado actual

La integración está **preparada en modo simulado** (mock). El adapter está diseñado con una interfaz abstracta (`SedeElectronicaAdapter`) que permite cambiar de `mode=mock` a `mode=real` sin modificar el agente, el chat ni la UI. Solo se necesita configurar las credenciales.

### Petición

Solicitamos una reunión técnica con el equipo de informática/administración electrónica para:
1. Validar el alcance de la integración.
2. Obtener las credenciales del sandbox.
3. Definir el calendario de integración (estimado: 2-3 semanas).

Quedamos a su disposición.

Un cordial saludo,

**CHESS AI AGENCY** — AI · Innovation · Execution  
[Tu email] · [Tu teléfono]

---

## Checklist de preparación (interna)

- [ ] Interfaz `SedeElectronicaAdapter` creada en `lib/sede-electronica/adapter.ts`
- [ ] Implementación mock en `lib/sede-electronica/mock.ts`
- [ ] Implementación real en `lib/sede-electronica/real.ts` (pendiente de credenciales)
- [ ] Variables de entorno: `SEDE_ELECTRONICA_BASE_URL`, `SEDE_ELECTRONICA_TOKEN`, `SEDE_ELECTRONICA_MODE`
- [ ] Tests de integración (mock) passing
- [ ] Documentación de la API del Concello recibida
- [ ] Acuerdo de confidencialidad firmado

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
