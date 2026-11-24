# CAMPAÑA PROVINCIA DE PONTEVEDRA — EJECUCIÓN

> Secuencia de contacto, embudo, presupuesto, legal, riesgos, registro de envíos y próximos pasos.

## 7. Secuencia de contacto (4 toques)

| Toque | Cuándo | Canal | Contenido |
|---|---|---|---|
| 1 | Día 0 | Correo | Presentación + demo + oferta de diagnóstico |
| 2 | Día 3 | Teléfono | Confirmar recepción, buscar la persona correcta |
| 3 | Día 7 | Correo | Caso de uso concreto para su tamaño de concello |
| 4 | Día 14 | Correo | Cierre de cortesía: "¿lo dejo para el próximo trimestre?" |

Si no responden a los cuatro, se archiva y se reintenta en tres meses. Sin excepciones.

---


## 9. Objeciones y respuestas

| Objeción | Respuesta |
|---|---|
| "Xa temos Vigo25 AI" | "Vigo25 é un buscador e chatbot de cara ao cidadán. Isto é distinto: asistente interno para o persoal, con borradores e normativa. Non compite, complementa." |
| "Non temos orzamento" | "Por iso o piloto é contrato menor. 4.900 € nun concello pequeno, con informe de resultados. Se non hai partida, axúdoche a xustificala." |
| "Isto é seguro?" | "Os datos quedan na UE, con acordo de encargado de tratamento e análise RGPD, ENS e AI Act. Podo ensinarte o documento." |
| "Como sei que funciona?" | "A demo está aberta. E o piloto mídese: horas aforradas, respostas con fonte, borradores validados. Se non se cumpre, non continúas." |
| "Vou consultalo" | "Perfecto. Mándoche a hoja de una página e o venres volvo chamar. ¿Parece ben?" |

---


## 10. Embudo y objetivos

| Etapa | Volumen | Conversión |
|---|---|---|
| Concellos contactados | 61 | — |
| Respuestas | 18 | 30 % |
| Conversaciones telefónicas | 12 | 20 % |
| Demos realizadas | 8 | 13 % |
| Propuestas enviadas | 5 | 8 % |
| Pilotos firmados | 3 | 5 % |

**Ingreso esperado:** 3 pilotos × 10.000 € de media = 30.000 € en 90 días.
**Cartera 2027:** 10 municipios en implantación anual = 120.000–180.000 € recurrentes.

---

### 10.1 Circuito del lead (ya funcionando)

```
Landing /ayuntamientos → POST /api/leads → tabla public.leads
                                        ↘ aviso interno a chessagencyai@gmail.com
                                        ↘ acuse de recibo al concello, en su idioma
```

| Paso | Dónde | Qué ocurre |
|---|---|---|
| 1 | `/ayuntamientos` | El concello rellena el formulario (tramo A–D, interés, mensaje) con consentimiento |
| 2 | `/api/leads` | Validación, honeypot y límite de 10 solicitudes/minuto por IP |
| 3 | Supabase | Fila en `leads` con `estado = 'novo'` |
| 4 | Correo | Aviso interno (responder va al concello) + acuse automático con la promesa de 24 h |
| 5 | `/admin` | Botón «🏘️ Ver contactos de concellos»: email, teléfono, tramo e interés |

**Estados del lead:** `novo` → `contactado` → `reunion` → `proposta` → `pechado` / `descartado`.

**Regla de respuesta:** el acuse ya promete 24 horas laborables. Si un lead entra un viernes, se contesta el lunes antes de las 10:00. Es la única promesa que no se puede incumplir.

**Higiene:** un lead que no encaja se marca `descartado` el mismo día. No se deja en `novo` para que no ensucie las métricas.

---


## 11. Presupuesto de campaña

| Concepto | Importe |
|---|---|
| Landing en Vercel (proyecto existente) | 0 € |
| Vídeo de 30 s grabado con la demo | 0 € |
| Correo (buzón profesional existente) | 0 € |
| LinkedIn Premium ocasional | 60 €/mes |
| Publicidad local en medios digitales | 200 € |
| **Total primeros 90 días** | **≈ 380 €** |

El coste real es tu tiempo: 4 horas al día durante dos semanas para la prospección inicial.

---


## 12. Legal y buenas prácticas

- **RGPD:** los correos de alcaldía, secretaría e intervención son datos profesionales de cargos públicos. Base jurídica: interés legítimo (art. 6.1.f). Minimiza, no almacenes más de lo necesario y atiende cualquier oposición.
- **LSSI:** incluye siempre forma de darse de baja y evita envíos masivos sin relación previa.
- **Sin listas compradas.** Los contactos se obtienen de sedes electrónicas, portales de transparencia y del directorio de la FEGAMP.
- **Contratación:** los pilotos por debajo de 15.000 € son contrato menor. No los presentes como licitación ni prometas adjudicaciones.
- **Publicidad:** no uses escudos ni logotipos municipales sin autorización. No afirmes que un concello es cliente si no lo es.

---


## 13. Riesgos

| Riesgo | Mitigación |
|---|---|
| Buzón marcado como spam | 10 correos/día, dominio con SPF/DKIM, texto personalizado |
| Baja tasa de respuesta | Llamada al tercer día; el correo solo no vende |
| "Non hai orzamento" | Escalón micro de 2.900 € y reparto en dos anualidades |
| Competencia de grandes integradores | Velocidad, trato directo y precio de contrato menor |
| Dependencia de un único concello | Cartera de 10 municipios, no de uno |

---


## 14. Próximos cinco pasos

1. ~~Publicar la landing `/ayuntamientos` con la oferta y el formulario.~~ **Hecho:** https://vigo-ai-demo.vercel.app/ayuntamientos
2. Cerrar la lista de los 25 concellos de los segmentos A y B con contacto verificado. **Base lista:** `CONTACTOS_PONTEVEDRA.csv` + `CONTACTOS_PONTEVEDRA.pdf`.
3. Grabar el vídeo de 30 segundos con la demo real.
4. Enviar los 10 primeros correos el martes por la mañana.
5. Revisar métricas el viernes y ajustar el mensaje.

**Documento preparado por CHESS AI AGENCY · VIGO AI ADMINISTRATION · 15/11/2026**

---


## 15. Registro de envíos y criterio de buzón

### 15.1 A qué dirección se escribe

| Buzón | Cuándo | Motivo |
|---|---|---|
| `alcaldia@` / `gabinete.alcaldia@` | Primera opción | Decide o influye en el contrato menor; el correo llega a quien tiene la llave del presupuesto. |
| `contacto@` / `info@` | Solo si no hay alcaldía verificada | Buzón general del concello: sirve, pero se mezcla con el registro de entrada ciudadano. |
| `010@` (atención ciudadana) | Evitar salvo que sea el único | Enruta como solicitud ciudadana y suele morir en la cola de quejas. |
| Informática / TI | Nunca en fase 1 | No decide compra; sirve en fase 3, cuando ya hay interés político. |

Regla: un solo destinatario por concello en el primer contacto. Nada de enviar a tres buzones a la vez.

### 15.2 Envío del 17/11/2026 (día 1)

Remitente: `CHESS AI AGENCY <leads@ajedrezpremium.com>` · responder a `chessagencyai@gmail.com`.

| Concello | Destinatario | Asunto | Resend |
|---|---|---|---|
| Vigo | 010@vigo.org | Proposta de piloto | 01a1e907 |
| Pontevedra | contacto@pontevedra.gal | Proposta de demostración | 01a1e910-d65e |
| Vilagarcía de Arousa | alcaldia@vilagarcia.es | Proposta de demostración | 01a1e910-f394 |
| Redondela | alcaldia@redondela.gal | Proposta de demostración | 01a1e911-106b |
| Cangas de Morrazo | alcaldia@cangas.gal | Proposta de demostración | 01a1e911-2d66 |
| Marín | alcaldia@concellodemarin.es | Proposta de demostración | 01a1e911-4a4d |
| Ponteareas | info@ponteareas.es | Proposta de demostración | 01a1e911-671d |
| O Porriño | gabinete.alcaldia@oporrino.org | Proposta de demostración | 01a1e911-83f8 |
| Lalín | lalin@lalin.org | Proposta de demostración | 01a1e911-a0d0 |
| A Estrada | info@aestrada.gal | Proposta de demostración | 01a1e911-bdc8 |

Los 10 con estado `delivered` en Resend. Copia de control a `gmparamos@gmail.com` (BCC en cada envío + copia del correo de Vigo).

Límite del día consumido: 10/10. Mañana no se envía nada a estos concellos; toca teléfono el 20/11 (toque 2).

### 15.3 Dominio neutro de campaña

Los correos de fase 1 enlazan a `https://ia-administracion-local.vercel.app/campana`, no a `vigo-ai-demo.vercel.app`.

Es un proyecto Vercel gemelo con el mismo codigo y las mismas variables. Hay que desplegar en los dos.

**Decisión 20/11/2026: se conserva este enlace.** Se evaluó `https://agency.ajedrezpremium.com/` y se descartó. Es la web corporativa de la agencia (CNAME a otro proyecto de Vercel, título «Chess Agency IA - Inteligencia Artificial para Ajedrez y Deportes») y su ruta `/campana` devuelve la portada, no la demo: meterlo en los correos dejaría al destinatario fuera de la campaña. Reapuntarlo tumbaría la web de la agencia. Tampoco se crea un subdominio nuevo, porque los 31 correos ya enviados enlazan a esta URL y hay que evitar dos canónicos. No hay cambios en `lib/email-templates.ts` ni despliegue derivado.

La pagina `/campana` es la variante neutra de `/ayuntamientos`: sin marca de Vigo, sin precios, sin "piloto" ni plazos comerciales.
El formulario registra el lead con `orixe = landing_campana` para distinguirlo del trafico organico.

**21/11/2026 — Proveedor Groq activado.** La clave `Vigo_AI_Admin` de `console.groq.com` estaba guardada como `GROK_API_KEY` (nombre equivocado: Groq no es Grok/xAI), asi que el router nunca la veia y la consola marcaba *Last Used: Never*. Renombrada a `GROQ_API_KEY` en los dos entornos locales y en los dos proyectos Vercel, con `GROQ_MODEL=openai/gpt-oss-120b`. Entra como cuarto intento de la cadena: OpenRouter (3 intentos) → Groq → Gemini. Verificado con `GET /v1/models` y `POST /chat/completions` (200, respuesta "OK") y con despliegue `READY` de `vigo-ai-demo` e `ia-administracion-local`. Sin cambios en `lib/llm.ts`: el proveedor ya estaba implementado en `lib/providers.ts`.

### 15.2b Envío del 18/11/2026 (día 2)

Mismo remitente y misma plantilla neutra (`firstContactEmail`, gallego) que el día 1. Destinatarios del **segmento B**, los diez de mayor población.

| Concello | Destinatario | Resend |
|---|---|---|
| Moaña | alcaldia@concellodemoana.org | 01a1edf2-60b4 |
| Nigrán | info@nigran.org | 01a1edf2-65ff |
| Sanxenxo | info@sanxenxo.org | 01a1edf2-6b3e |
| Tui | concellotui@concellotui.org | 01a1edf2-707d |
| Poio | poio@concellopoio.gal | 01a1edf2-75c5 |
| Mos | informacion@concellomos.es | 01a1edf2-7b07 |
| Gondomar | alcaldia@concellodegondomar.com | 01a1edf2-8044 |
| Tomiño | comunicacion@tomino.gal | 01a1edf2-8573 |
| Cambados | alcaldia@cambados.es | 01a1edf2-8ab6 |
| Baiona | secretaria@baiona.org | 01a1edf2-8ff4 |

Los 10 con estado `delivered` en Resend (verificado el mismo día) y copia de control a `gmparamos@gmail.com` (BCC). Límite del día consumido: 10/10.

### 15.2c Envío del 19/11/2026 (día 3)

5 restantes del segmento B y 5 del segmento C, por orden de población.

| Concello | Destinatario | Resend | Estado |
|---|---|---|---|
| Bueu | concello@concellodebueu.gal | 01a1f30d-6eeb | delivered |
| O Grove | alcaldia@concellodogrove.es | 01a1f30d-7439 | delivered |
| Vilanova de Arousa | rexistroxeral@vilanovadearousa.com | 01a1f30d-79b5 | delivered |
| Salvaterra de Miño | rexistro@concellodesalvaterra.org | 01a1f30d-7fc9 | delivered |
| A Guarda | alcaldia@aguarda.es | 01a1f30d-8533 | delivered |
| Caldas de Reis | concello@caldasdereis.com | 01a1f30d-8b0b | **bounced** |
| Salceda de Caselas | alcaldia@salcedadecaselas.es | 01a1f30d-90c7 | delivered |
| Silleda | info@silleda.gal | 01a1f30d-966e | delivered |
| Soutomaior | alcaldia@soutomaior.com | 01a1f30d-9cb8 | delivered |
| O Rosal | orosal@concellodorosal.es | 01a1f30d-a2b1 | delivered |

9 de 10 entregados. **Caldas de Reis rebotó**: el dominio `caldasdereis.com` usa un buzón que ya no acepta correo. El aviso legal y la sede electrónica del concello publican `concello@caldasdereis.gal`, que es la dirección de reenvío del 20/11.

**Reenvío del 20/11:** enviado a `concello@caldasdereis.gal` con el mismo asunto y plantilla (Resend `01a1f838-16bc-7943-846d-7ae81566b537`), `delivered`. El CSV pasa a `contactado` y la llamada se mantiene el 24/11.

**Calendario de llamadas resultante:**

| Lote | Envío | Toque 2 (teléfono) |
|---|---|---|
| 10 primeros (segmento A) | 17/11 | **viernes 20/11** |
| 10 siguientes (segmento B) | 18/11 | **lunes 23/11** (el día 3 cae en sábado) |
| 10 del día 3 (B y C) | 19/11 | **martes 24/11** (el día 3 cae en domingo) |

Así las 20 llamadas no se acumulan en la misma jornada: 10 el viernes y 10 el lunes.

### 15.2d Envío del 23/11/2026 (día 5)

Lote C/D: los 8 primeros del segmento C más A Illa de Arousa y Meis (segmento D). Primer contacto con la plantilla neutra en gallego y enlace `/campana`.

| Concello | Destinatario | Resend | Estado |
|---|---|---|---|
| Vilaboa | info@vilaboa.org | 01a207f1-dea0 | delivered |
| Valga | concello.valga@eidolocal.es | 01a207f1-e3e7 | delivered |
| Cerdedo-Cotobade | concello@cerdedo-cotobade.gal | 01a207f1-e935 | delivered |
| Ponte Caldelas | alcaldia@pontecaldelas.org | 01a207f1-ee74 | delivered |
| Meaño | concellodemeano@concellodemeano.com | 01a207f1-f3ba | delivered |
| Ribadumia | concello@ribadumia.org | 01a207f1-f8fc | delivered |
| Vila de Cruces | info@viladecruces.es | 01a207f1-fe3a | delivered |
| A Cañiza | info@caniza.org | 01a207f2-0377 | delivered |
| A Illa de Arousa | concello@ailladearousa.es | 01a207f2-08bd | delivered |
| Meis | correo@meis.gal | 01a207f2-0dfb | delivered |

**10/10 `delivered`** (verificado en Resend el mismo día). Cupo del día consumido: 10/10. Toque 2 (teléfono) desplazado al **lunes 30/11** por la pausa del 24–27/11; hoja: `LLAMADAS_PONTEVEDRA_PENDIENTES.md`.

### 15.4 Herramienta de envío por lote

`scripts/send-batch.mjs` envía hasta 10 correos desde un JSON y se detiene si el lote los supera.

```powershell
# simulación (no envía nada)
node --experimental-strip-types scripts/send-batch.mjs --file tmp/batch-2026-11-18.json

# envío real
node --experimental-strip-types scripts/send-batch.mjs --file tmp/batch-2026-11-18.json --commit
```

- BCC de control por defecto: `gmparamos@gmail.com` (`--bcc ""` para desactivarlo).
- Pausa de 1,2 s entre envíos y registro en `tmp/batch-<fecha>.json`.
- El límite de 10/día es una regla de campaña, no del proveedor: el script la aplica para que no se olvide.

Los lotes viven en `campaign/batches/` (versionados, no en `tmp/`). Un archivo por día; ver el `README.md` de esa carpeta.

### 15.5 Base de contactos completa (61 concellos)

Fuente única: **directorio oficial de la Deputación de Pontevedra** — <https://www.depo.gal/es/datos-concellos-da-provincia-de-pontevedra> (consultado el 18/11/2026). De ahí salen el correo, el teléfono, el alcalde/alcaldesa y la comarca de cada concello.

`CONTACTOS_PONTEVEDRA.csv` tiene **62 filas**: los 61 concellos más una fila extra con la Oficina de Informática de Vigo.

| Tramo | Filas | Estado |
|---|---|---|
| A | 11 | contactados (Vigo + Oficina de Informática) |
| B | 15 | 15 contactados (18 y 19/11) |
| C | 13 | 13 contactados (19 y 23/11) |
| D | 23 | 2 contactados (23/11) · **21 aparcados hasta enero** |

- **Verificado:** concello, comarca, alcalde, correo y teléfono.
- **Pendiente:** la cifra de habitantes de C y D. El tramo ya está asignado por población; falta el dato exacto en la columna.
- **Buzones especiales** (no son `@concellox.gal`): Valga y Catoira usan `eidolocal.es` (servicio mancomunado); Covelo, `rexistro.covelo@fegamp.gal`; Portas, `@concellos.depontevedra.es`; Arbo, un Gmail.
- **Regla:** un destinatario por concello y por toque. Nada de enviar a varios buzones del mismo concello a la vez.

### 15.6 Pausa del 24 al 27/11 y nuevo calendario

El 23/11 se cierra el lote C/D con **10/10 `delivered`** y se decide **no enviar ni llamar del 24 al 27/11**. Los 21 concellos pequeños del segmento D quedan aparcados hasta enero; los lotes `2026-11-24.json`, `2026-11-25.json` y `2026-11-26.json` se conservan, pero no se envían en noviembre.

**Nuevo arranque:**

| Fecha | Acción | Cupo |
|---|---|---|
| 30/11 | 3 ciudades + 7 de A Coruña (G20) | 10/10 |
| 1/12 | Culleredo, Ribeira y Cambre | 3/10 |
| 2/12 | Extensión 10–20k de Ourense | 4/10 |
| 3/12 | Llamadas del lote del 30/11 | — |
| 4/12 | Llamadas de Culleredo, Ribeira y Cambre | — |

**Campaña de España >50.000:** fase 1 con el top 30 (sin Vigo ni A Coruña). Base: `CONTACTOS_ESPANA_50K.csv`; plan: `CAMPANA_ESPANA_50K.md`. De los 30, **solo 8 publican buzón de correo** (lotes `2026-12-09/10/11.json`, ya simulados); **15 van por formulario oficial** y **7 a teléfono primero** (Madrid, Santa Cruz de Tenerife, Terrassa, Almería, Barcelona, Valladolid y Gijón). Las 15 URLs de formulario están comprobadas y los 30 teléfonos verificados el 24/11. Hojas: `PLANTILLA_FORMULARIO_ESPANA.md` y `LLAMADAS_ESPANA_50K.md`.

Los envíos del 24–27/11 **no se recuperan**: se desplaza la secuencia entera, no se acumulan lotes.

