# Guion de llamada — Toque 2 (Día 3)

**Cuándo:** 20/11/2026 (jueves). **Duración objetivo:** 5–8 minutos.
**Objetivo único:** confirmar recepción del correo + encontrar la persona correcta + acordar una demostración de 30 min.
**No es una venta:** no se cierra nada por teléfono. El teléfono vende la reunión, no el proyecto.

---

## 0. Antes de marcar (30 segundos)

- Abre el correo enviado (Resend / copia en gmparamos) para recordar el asunto exacto.
- Ten a mano: `CONTACTOS_PONTEVEDRA.csv` (teléfono, correo, estado).
- Si llamas a Vigo: tel. **986 810 159** (Oficina de Informática) o **986 810 100** (central). Si no contesta, prueba **986 220 341\***.
- Si llamas a los del tramo A: usa el teléfono del CSV (alcaldía). Llama entre 09:30 y 11:30.

## 1. Apertura (20 s)

> «Buenos días, mi nombre es Roberto Páramos, de CHESS AI AGENCY. Llamo porque el martes enviamos un correo a [nombre del concello] sobre un asistente de inteligencia artificial para la Administración Local. ¿Le llegó?»

**Si dice "sí":** pasa al bloque 2.
**Si dice "no / no sé":**
> «No hay problema. Se lo reenvío ahora mismo. ¿A qué correo se lo mando para que le llegue a quien corresponda?»

→ anota el correo real y reenvía (con `/campana`).

**Si dice "estoy ocupado":**
> «Perfecto, no le quito más tiempo. ¿Me dice un buen momento para llamar mañana o pasado?» → anota y cuelga.

## 2. Encontrar la persona correcta (60 s)

> «¿Quién en el concello suele decidir sobre herramientas de gestión y nuevas tecnologías? ¿La alcaldía, la secretaría, informática?»

- **Vigo:** ya está en la Oficina de Informática (`informatica@vigo.org`). Pregunta por el responsable de la oficina.
- **Otros:** si te pasan con alcaldía/secretaría, perfecto. Si te pasan con informática, también perfecto (pero la decisión de compra es política — informática valida, no decide).
- Si te dicen "eso es para el alcalde/la alcaldesa": pide el correo de alcaldía y el mejor momento.

**Pregunta clave (calificación):**
> «¿Tienen hoy algún sistema de asistencia o búsqueda sobre vuestra documentación municipal, o se hace todo a mano?»

Esto te dice si hay dolor (y por tanto interés).

## 3. Lo que ofrecemos (45 s, sin tecnicismos)

> «Es un asistente que trabaja con la documentación del propio concello. El personal municipal pregunta en lenguaje natural y el sistema responde citando el documento de donde sale la información. También redacta borradores de informes y transcribe reuniones. En gallego y castellano. Los datos se quedan en Europa, bajo control del concello.»

**Si preguntan "¿y qué diferencia hay con ChatGPT?":**
> «ChatGPT no conoce vuestras ordenanzas ni vuestros expedientes, y los datos salen fuera. Este sistema solo responde con vuestra documentación, cita la fuente y no envía nada fuera de la UE. Y la persona siempre revisa y firma.»

## 4. Garantías (30 s, solo si preguntan)

- RGPD, adecuación al ENS y al Reglamento Europeo de IA según el caso.
- Supervisión humana: la IA analiza, asiste y propone; las personas supervisan, validan y deciden.
- Sin permanencia: la continuidad es decisión del concello.

## 5. Manejo de objeciones

| Objeción | Respuesta |
|---|---|
| «No hay presupuesto» | «Entiendo. Por eso el primer paso es una demostración de 30 minutos sin compromiso, con datos sintéticos. Así valoráis si merece la pena antes de hablar de dinero. Si encaja, el proyecto se puede tramitar como contrato menor de servicios (por debajo de 15.000 €) y repartir en dos anualidades.» |
| «Ya tenemos proveedor / software municipal» | «Perfecto, no es para sustituirlo. Es una capa por encima que busca en toda vuestra documentación y redacta borradores. Convive con lo que ya tenéis.» |
| «¿Y la protección de datos?» | «Los datos se alojan en la UE y el sistema se configura con criterios RGPD, ENS y AI Act. Os envío la ficha técnica y el aviso legal.» |
| «No es buen momento / hay elecciones» | «Totalmente comprensible. ¿Le parece si le escribo en enero para retomarlo? Mientras tanto le dejo el enlace por si quiere echar un vistazo: ia-administracion-local.vercel.app/campana» |
| «¿Cuánto cuesta?» | «Depende del tamaño del concello y del alcance. Para un concello de vuestro tamaño el rango está entre 2.900 y 12.500 € para la fase inicial. Pero prefiero que veáis la demostración antes de hablar de cifras, para que tenga sentido.» |
| «Mándame un correo y lo miramos» | «Por supuesto. ¿A qué correo se lo envío y a quién le pongo en copia?» → anota y envía el toque 3 ese mismo día. |

## 6. Cierre (30 s)

**Si hay interés:**
> «¿Le parece si agendamos una demostración de 30 minutos esta semana o la próxima? Puede ser en línea. Le envío un correo con dos propuestas de fecha.»

→ anota nombre, correo, fecha preferida. Envía el correo de seguimiento (toque 3) ese mismo día.

**Si no hay interés claro:**
> «De acuerdo. Le dejo el enlace por si en el futuro le encaja: ia-administracion-local.vercel.app/campana. Muchas gracias por su tiempo.»

## 7. Checklist post-llamada (obligatorio)

- [ ] Actualizar `CONTACTOS_PONTEVEDRA.csv`: `estado`, `toque=2`, `resposta`, `seguinte_paso`.
- [ ] Si acordó demo: enviar correo de confirmación ese mismo día (propón 2 fechas).
- [ ] Si pidió más info: enviar ficha técnica / aviso legal.
- [ ] Si no contestó: marcar `sen_resposta` y programar reintento en 3 meses.
- [ ] Commit + push del CSV actualizado.

## 8. Lo que el agente IA puede hacer por ti

- **Redactar** el correo de seguimiento (toque 3, día 7) personalizado por concello y enviarlo con `scripts/send-email.mjs`.
- **Actualizar** el CSV tras cada llamada (estado, toque, respuesta, siguiente paso).
- **Preparar** la demo (entorno con datos sintéticos, guion de 30 min).
- **Buscar** contactos adicionales en el directorio municipal de cada concello (como el de Vigo).
- **Registrar** objeciones recurrentes para ajustar el mensaje.
- **Generar** un resumen semanal de métricas (enviados, respondidos, demos agendadas).

---

## Plantilla de correo — Toque 3 (Día 7, "Re:")

**Asunto:** `Re: Proposta de demostración · Concello de [nome]`

> Bo día [nome]:
>
> Falo de novo por se non tivo tempo de ver o correo da semana pasada. Quería engadir un detalle concreto: a demostración que propoñemos non é unha presentación comercial, senón unha proba de 30 minutos coa documentación do seu concello (ou datos sintéticos, se prefiren).
>
> Se lle encaixa, propoñolles dúas datas: [data 1] ou [data 2]. Se prefiren outro momento, díganmo e adapto.
>
> Quedo á súa disposición.
>
> Atentamente,
> Roberto Páramos · CHESS AI AGENCY · 607 869 278 · chessagencyai@gmail.com
> https://ia-administracion-local.vercel.app/campana

---

**Regla de oro:** nunca dar el precio en la primera llamada si no lo piden. Si lo piden, dar el rango y cerrar con la demo. El precio se cierra en la reunión, no por teléfono.
