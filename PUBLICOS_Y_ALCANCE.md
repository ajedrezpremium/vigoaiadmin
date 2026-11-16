# TRES PÚBLICOS, UNA PLATAFORMA

**Qué es VIGO AI ADMINISTRATION, para quién es y qué falta**
CHESS AI AGENCY · 16/11/2026

---

## 1. La respuesta corta

La plataforma tiene **dos puertas ya construidas y una tercera pendiente**:

| Puerta | Quién entra | Estado | Quién paga |
|---|---|---|---|
| **Ciudadanía** | Vecinos, contribuyentes, visitantes | ✅ Funcionando en la demo pública | Nadie: es el escaparate |
| **Personal municipal** | Funcionarios de secretaría, urbanismo, intervención, atención al público | ✅ Motor listo; el piloto lo configura con sus documentos | **El concello** (12.500 / 7.900 / 4.900 / 2.900 €) |
| **Proveedores y colaboradores** | Empresas que licitan, contratistas, asociaciones | ⚠️ Parcial: solo subvenciones y apertura de negocio | El concello, como módulo adicional |

**La clave comercial:** el ciudadano es el *usuario*, pero el concello es el *cliente*. Por eso la landing de venta habla de horas ahorradas al funcionario y no de "un chatbot para la web". Un chatbot ciudadano se vende como imagen; un asistente interno se vende como productividad, y la productividad se justifica en un contrato menor con un informe de horas.

---

## 2. Puerta 1 — Ciudadanía (lo que cualquiera puede probar hoy)

**Dónde:** la portada, chat abierto sin registro.

**Qué responde, con fuente citada:**

- Horarios, oficinas, registro y sede electrónica → agente **Cidadán AI**
- Trámites, requisitos, plazos, formularios → **Trámites AI**
- Ordenanzas, artículos, sanciones → **Normativa AI**
- Subvenciones, apertura de negocio, tasas, terrazas → **Empresa AI**
- Servicios sociales y emergencias → **Social AI**
- Cultura, biblioteca, museo, deporte, turismo → **Cultura AI**
- Urbanismo y licencias de obra menor → **Urbanismo AI**
- Historia de Vigo → **Historia AI**
- Traducción gl/es/en → **Idiomas AI**

**Lo que NO hace, y se dice en la demo:** no tramita, no resuelve expedientes, no da asesoramiento jurídico, no pide DNI ni datos bancarios, y si no encuentra la respuesta en el corpus lo dice y deriva a la OAC. Esa honestidad es el argumento de venta, no una debilidad: un asistente que inventa un plazo es un problema legal.

**Lo que ya funciona de verdad, no es maqueta:**

- RAG con citas `[S1] [S2]` sobre el corpus municipal
- Detección de idioma y respuesta en galego, castelán o inglés
- Lectura de respuestas en voz alta y dictado por micrófono (navegadores compatibles)
- Escalado a una persona cuando el caso lo requiere
- Panel interno con métricas, auditoría de eventos y control por roles

---

## 3. Puerta 2 — Personal municipal (donde está el dinero)

**Qué compra el concello en el piloto:**

| Necesidad real del funcionario | Qué hace la plataforma |
|---|---|
| "¿Qué dice la ordenanza de terrazas sobre la altura de la sombrilla?" | Respuesta con el artículo citado y enlace al documento |
| "Redáctame el informe de reparcelación" | Borrador con plantilla municipal, marcado **BORRADOR — revisión humana** |
| "Resume este expediente de 80 páginas" | Resumen y extracción de datos clave |
| "¿Cómo se hizo este trámite la última vez?" | Busca en el histórico y cita el expediente |
| "Transcribe la reunión de la mesa de contratación" | *Entregable del piloto*, no de la demo |
| "¿Quién ha usado el sistema y qué ha preguntado?" | Panel de métricas y auditoría |

**Por qué se vende así y no como chatbot:** el funcionario no necesita otra web; necesita dejar de buscar en 40 PDFs. Ese ahorro se mide en horas y se firma como contrato menor de servicios (< 15.000 €), sin licitación.

**Lo que la demo no incluye todavía:** transcripción de audio largo y OCR de documentos escaneados. Son entregables del piloto, con presupuesto y plazo, no funcionalidad ya desplegada. Si un concello pregunta, la respuesta honesta es: "el motor está; la digitalización de vuestro archivo se hace en las primeras dos semanas".

---

## 4. Puerta 3 — Proveedores, contratistas y colaboradores (el hueco)

Hoy solo está cubierto de refilón por **Empresa AI**: subvenciones, apertura de negocio, tasas y terrazas.

**No existe todavía:**

- Perfil del contratante: licitaciones abiertas, plazos, mesa de contratación, adjudicaciones
- Registro de proveedores y documentación para licitar
- Facturación electrónica y estado de pagos
- Asociaciones y voluntariado: subvenciones, cesión de espacios, convenios

**Por qué importa comercialmente:** cada licitación genera decenas de consultas repetidas ("¿qué documentación pido?", "¿hasta cuándo?", "¿dónde subo el sobre?"). Es el caso de uso con retorno más rápido y el que más se parece a lo que el concello ya paga a un técnico.

**Módulo propuesto: Agente de Contratación**

- Corpus: perfil del contratante + pliegos publicados + preguntas frecuentes de la mesa
- Respuestas con cita al pliego y fecha de publicación
- Aviso de que la respuesta no sustituye al pliego ni al órgano de contratación
- Precio orientativo: **3.900 €** como ampliación del piloto, o incluido en el tramo A

---

## 5. Tabla de honestidad (para no prometer de más)

| Función | Demo | Piloto | Roadmap |
|---|---|---|---|
| Chat ciudadano con citas | ✅ | ✅ | — |
| Multilingüe gl/es/en | ✅ | ✅ | — |
| Voz: leer y dictar | ✅ | ✅ | — |
| Panel, auditoría y roles | ✅ | ✅ | — |
| Corpus propio del concello | sintético | ✅ 40–150 docs | — |
| Borradores con plantilla | básico | ✅ | — |
| OCR de archivo escaneado | — | ✅ | — |
| Transcripción de reuniones | — | ✅ | — |
| Contratación y proveedores | — | — | módulo 3.900 € |
| Tributos (IBI, IVTM, tasas) | — | — | módulo 4.900 € |
| Integración sede electrónica real | simulada | con credenciales | — |

---

## 6. Cómo contestar la pregunta en una reunión

> "Es para los dos, pero empieza por dentro. El mismo motor atiende al vecino en la web y al funcionario en su escritorio. Le proponemos empezar por el funcionario porque ahí el ahorro se mide en horas y se justifica con un contrato menor de 12.500 €. Cuando el personal confíe en el sistema, abrimos la puerta al ciudadano con el mismo corpus ya validado. Y si quiere cubrir licitaciones, es un módulo aparte de 3.900 €."

Esa frase evita las dos objeciones que matan la venta: "ya tenemos un chatbot" y "esto es un juguete para la web".

---

## 7. Qué decidir esta semana

1. **¿Vendemos primero al funcionario o al ciudadano?** Recomendación: funcionario. Se mide, se justifica y no exige integrarse con la sede electrónica.
2. **¿Añadimos el módulo de contratación?** Es el que más consultas repetidas elimina y el que más se parece a un servicio que el concello ya paga.
3. **¿Ampliamos el corpus ciudadano a tributos?** IBI, IVTM y tasas son el 60 % de las preguntas reales de un ayuntamiento. Hoy no hay agente dedicado.

**Documento preparado por CHESS AI AGENCY · Roberto Páramos · 607 869 278 · chessagencyai@gmail.com**
