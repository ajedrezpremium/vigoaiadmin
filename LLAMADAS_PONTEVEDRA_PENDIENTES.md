# Llamadas pendientes de Pontevedra — 30/11, 1/12 y 2/12

**Qué es:** toque 2 (teléfono) de los tres lotes de Pontevedra que la pausa del 24–27/11 ha desplazado.
**Guion base:** `GUION_LLAMADA_CONCELLOS.md`.
**Ventana:** 09:30–11:30 y 13:00–14:00.
**Datos de marcado:** `CONTACTOS_PONTEVEDRA.csv` (fuente única).

---

## 1. Reparto

| Día | Lote | Correo enviado | Concellos |
|---|---|---|---|
| **lun 30/11** | 23/11 | 23/11 | Vilaboa, Valga, Cerdedo-Cotobade, Ponte Caldelas, Meaño, Ribadumia, Vila de Cruces, A Cañiza, A Illa de Arousa, Meis |
| **mar 01/12** | 18/11 | 18/11 | Moaña, Nigrán, Sanxenxo, Tui, Poio, Mos, Gondomar, Tomiño, Cambados, Baiona |
| **mié 02/12** | 19/11 | 19/11 | Bueu, O Grove, Vilanova, Salvaterra, A Guarda, Caldas, Salceda, Silleda, Soutomaior, O Rosal |

**Importante:** el 30/11, el 1/12 y el 2/12 también hay envío (10, 3 y 4 correos). Se envía a las 08:30 y se empieza a llamar a las 09:30. No se pospone el envío.

---

## 2. Apertura (30 segundos)

> «Buenos días. Soy [nombre], de CHESS AI AGENCY. Les enviamos un correo la semana pasada sobre una demostración de inteligencia artificial para la administración local. ¿Con quién podría hablar del área de atención ciudadana o de administración electrónica?»

No empieces con «¿recibió el correo?». Si preguntan de qué va:

> «No venimos a sustituir nada. Trabajamos con la información pública del concello para que un asistente responda con fuentes oficiales y derive a una persona cuando no pueda resolver. La demostración se hace con vuestros propios contenidos, sin tocar sistemas ni datos personales.»

---

## 3. Tres preguntas que valen más que el discurso

1. «¿Cuántas consultas ciudadanas os llegan que ya están respondidas en la web?»
2. «¿Quién lleva hoy la atención ciudadana y la administración electrónica?»
3. «Si hiciéramos una prueba con tres tipos de consulta, ¿quién tendría que autorizarla?»

---

## 4. Cierre

> «Le propongo 30 minutos, en persona o por videollamada, para enseñarle la demostración con información pública de [concello] y que ustedes decidan si merece la pena seguir. ¿Qué día le encaja?»

Si piden precio:

> «La primera fase depende del alcance y del número de fuentes. Prefiero que vean la demostración antes de poner una cifra.»

No hables de piloto salvo que lo pregunten. No menciones Vigo.

---

## 5. Después de cada llamada

- [ ] Nombre y cargo de la persona.
- [ ] Correo directo (no el general).
- [ ] Fecha y hora de la demo, o motivo del no.
- [ ] Actualizar `CONTACTOS_PONTEVEDRA.csv`: `estado`, `toque`, `resposta`, `seguinte_paso`.
- [ ] Si no localizas a nadie, deja un mensaje y reintenta al día siguiente a primera hora. Máximo dos mensajes.

---

## 6. Avisos

- **Caldas de Reis** rebotó el 19/11 y se reenvió el 20/11 a `concello@caldasdereis.gal` (`delivered`). Si vuelve a rebotar, no gastes la llamada: corrige el buzón.
- **A Illa de Arousa** y **Meis** entraron el 23/11; su llamada es el 30/11, no el 26/11.
- **Moaña** y **Nigrán** son los dos concellos que más han tardado en responder al primer correo; insiste en localizar a la persona, no en dejar recado.
- Si un concello pide que no se le llame más, anótalo en el CSV y no vuelvas a marcar.

---

**CHESS AI AGENCY** · 23/11/2026
