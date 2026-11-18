# Reunión con el Concello de Vigo — 12 temas estratégicos

**Base:** `INFORME_EJECUTIVO_VIGO_AI_ADMINISTRATION_CHESS_AI_AGENCY_NOVIEMBRE_2026.md` y `De web estática a web dinámica con IA agéntica.md` (ambos 18/11/2026).
**Objetivo de la reunión:** no vender la transformación. Conseguir autorización para auditar Vigo25 y demostrar tres casos de uso.
**Duración sugerida:** 40 minutos. Ocho temas son de conversación; cuatro se mencionan y se dejan por escrito.

---

## Antes de empezar: coherencia entre los dos informes

Los dos documentos se refuerzan, pero hoy no son intercambiables. Si el Concello los compara, estas diferencias restan credibilidad:

| Punto | Informe A (hoxe.vigo.org) | Informe B (VIGO AI ADMINISTRATION) | Qué hacer |
|---|---|---|---|
| Fases | Fase 0 auditoría 2–3 semanas → piloto 6–8 semanas | Auditoría 2 semanas → prototipo 3–4 → piloto 3–4 | Unificar en un solo calendario: auditoría 2–3 semanas, prototipo 4, piloto 4 |
| Nombre | «Informe ejecutivo sobre hoxe.vigo.org» | «Transformación de la web oficial… VIGO AI ADMINISTRATION» | Usar A como diagnóstico y B como propuesta; no mandar los dos sin explicar la relación |
| Rendimiento | «~6 s de carga» según accessify.com, y avisa de que la portada no cargó en el análisis | No lo menciona | No citar los 6 s como dato propio: ofrecer medición en Fase 0 |
| Agentes | No los enumera | 12 agentes, 4 en el piloto | Mantener: 12 es el mapa, 4 es el piloto |

**Regla:** en la reunión se usa el informe A para el diagnóstico y el B para la propuesta. Nunca los dos a la vez sin decir cuál es cuál.

---

## 1. Vigo25 no es el adversario: es el punto de partida

**Gancho:** el Concello ya tiene buscador semántico, asistente, chatbot y recomendador, en gallego y castellano, con datos de Smart City.

**Qué plantear:** «No venimos a sustituir Vigo25. Venimos a proponer una auditoría conjunta para ver qué se reutiliza y qué falta.» La propuesta del informe B es explícita: evolucionar el motor actual, integrar un orquestador externo o desarrollar una capa complementaria, y decidirlo **después** de auditar.

**Decisión que buscas:** que acepten que la primera fase es analizar lo que ya tienen, no comprar nada.

> Si esta conversación se plantea como «vuestro chatbot es malo», se pierde la reunión en el primer minuto.

---

## 2. Definir «resuelto» antes de construir nada

**Gancho:** el informe A dice que el asistente actual «responde, pero no resuelve». Es una afirmación fuerte que hoy se apoya en una prueba manual.

**Qué plantear:** acordar qué cuenta como consulta resuelta (sin derivación, con fuente citada, sin reapertura en 7 días) y medirlo **antes** de tocar el sistema. Matomo ya está instalado: permite el antes y el después sin cambiar de herramienta.

**Decisión que buscas:** línea base conjunta y definición escrita de «resuelto».

---

## 3. Las consultas del 010 son el mapa de prioridades

**Gancho:** el 010 (teléfono y 010@vigo.org) absorbe consultas que podrían resolverse en el momento.

**Qué plantear:** pedir datos **agregados** de los temas más consultados (sin datos personales). Eso convierte la priorización en evidencia: si el 40 % del volumen es padrón y cita previa, el piloto se ordena solo. Además genera el argumento interno que necesita el Concello: horas liberadas por tema.

**Decisión que buscas:** acceso a un extracto agregado de consultas del 010 y de Matomo.

---

## 4. Acotar el piloto a tres casos, no a doce agentes

**Gancho:** el informe B propone 12 agentes pero solo 4 en el piloto.

**Qué plantear:** los tres casos de la recomendación final —**empadronamiento, subvenciones y movilidad**— tienen algo en común: alto volumen, información pública ya existente y bajo riesgo jurídico. Ninguno emite resoluciones ni mueve dinero.

**Decisión que buscas:** aceptación de los tres casos (o cambio razonado por parte del Concello).

> Ofrecer doce agentes en la primera reunión suena a catálogo. Ofrecer tres casos medibles suena a proyecto.

---

## 5. Arquitectura que se superpone, no que reconstruye

**Gancho:** la web es PHP con jQuery, jQuery UI, jquery-migrate, lightbox 0.5, Highcharts y Font Awesome; codificación WINDOWS-1252; idioma por parámetro `?lang=`.

**Qué plantear:** el agente entra como componente independiente sobre la web actual. No se toca el front-end heredado, no se migra la codificación, no se rehace nada. La modernización es una fase posterior y opcional.

**Decisión que buscas:** que el Departamento de Informática no sienta que le propones una obra.

> Aquí hay que ser humilde: el dato de los 6 s viene de una medición de terceros y la portada no cargó en el análisis. Propón medirlo juntos.

---

## 6. El contenido está repartido y caduca

**Gancho:** las secciones de hoxe.vigo.org enlazan a noticias alojadas en xornal.vigo.org; hay agenda, documentos y avisos en dominios distintos.

**Qué plantear:** una respuesta unificada exige indexar varias fuentes y saber **la fecha y el estado de cada documento**. Un asistente que cita una ordenanza derogada es peor que no tener asistente. El control de vigencia es parte del producto, no un extra.

**Decisión que buscas:** que el Concello identifique quién valida la vigencia de cada fuente.

---

## 7. El gallego de partida, no traducido después

**Gancho:** en las versiones `lang=en` los titulares de interfaz están en inglés pero parte del contenido sigue en gallego.

**Qué plantear:** el agente responde en gallego como lengua nativa y mantiene el idioma elegido durante toda la conversación. Eso cierra una brecha que la web actual no cubre, y es un argumento político y de normalización lingüística, no solo técnico.

**Decisión que buscas:** confirmar gallego como idioma principal y castellano/inglés como secundarios.

---

## 8. Integraciones: qué existe, quién autoriza, con qué permiso

**Gancho:** el valor real está en conectar con sede electrónica, cita previa, agenda, avisos y movilidad. Sin APIs, el agente solo enlaza.

**Qué plantear:** hacer el inventario en la auditoría y separar tres niveles —leer información pública, consultar estado con identificación, ejecutar una acción—. Cada nivel tiene permisos, registro y responsable distintos. La Fase 0 debe responder: ¿qué APIs hay?, ¿quién las abre?, ¿en qué entorno se prueban?

**Decisión que buscas:** nombre de la persona que puede autorizar accesos y un entorno de pruebas.

> No prometas integraciones que no has visto. La frase correcta es «si existe API y nos la autorizan».

---

## 9. Cumplimiento: ENS, RGPD, AI Act y accesibilidad, desde el diseño

**Gancho:** el informe B cita RD 311/2022 (ENS), RGPD/LOPDGDD, RD 1112/2018 (accesibilidad) y el AI Act.

**Qué plantear:** no venderlo como trámite, sino como condición de continuidad. El Concello decide la categoría del sistema y hace la evaluación de impacto; nosotros aportamos la documentación técnica y el diseño. Transparencia obligatoria: el ciudadano sabe que habla con una IA. Y límite claro: la IA no emite resoluciones, no firma, no paga.

**Decisión que buscas:** saber quién en el Concello asume DPIA y clasificación ENS.

---

## 10. Derivar a una persona sin que el ciudadano repita todo

**Gancho:** el 010 absorbe lo que la web no resuelve.

**Qué plantear:** cuando el agente no pueda resolver, pasa al 010 o a la unidad competente **con el resumen de la conversación**. Eso es lo que convierte al asistente en aliado del personal, no en una carga más. Es también el argumento para el sindicato o el comité: la IA no quita la atención, la descarga.

**Decisión que buscas:** aceptar la derivación con contexto como requisito del piloto.

---

## 11. Gobierno del sistema y vía administrativa

**Gancho:** dos informes, una recomendación común: empezar por una auditoría acotada antes de comprometer una transformación.

**Qué plantear:**
- **Propiedad:** el corpus documental es del Concello; la configuración y los permisos también.
- **Portabilidad:** capa de abstracción de proveedor de modelos, para no quedar atados a uno.
- **Quién mantiene:** qué actualiza contenidos, quién aprueba respuestas sensibles, quién revisa métricas cada mes.
- **Vía:** la auditoría y el piloto encajan en contrato menor de servicios; la implantación anual no. No prometer adjudicaciones.

**Decisión que buscas:** interlocutor único por parte del Concello y encaje administrativo de la primera fase.

---

## 12. Métricas de aceptación y panel de demanda

**Gancho:** el informe B fija objetivos (≥90 % con respuesta fundamentada, ≥95 % con fuente, ≥99 % disponibilidad, ≥85 % satisfacción) y avisa de que son objetivos de diseño, no resultados.

**Qué plantear:** convertir esos números en criterios de aceptación del piloto, con la línea base del punto 2. Y añadir el subproducto que más valor tiene para el Concello: un **panel de inteligencia de demanda** —qué preguntan los vigueses y qué no cubre la web—. Eso es información para decidir presupuestos, no solo para medir un piloto.

**Decisión que buscas:** aprobar el cuadro de indicadores y quién lo revisa.

---

## Agenda de 40 minutos

| Min | Tema | Formato |
|---:|---|---|
| 0–4 | 1. Vigo25 como activo | Conversación |
| 4–9 | 2 y 3. Qué es «resuelto» + datos del 010 | Conversación |
| 9–14 | 4. Los tres casos del piloto | Propuesta |
| 14–19 | 5. Arquitectura superpuesta | Conversación |
| 19–24 | 6 y 7. Contenido, vigencia y gallego | Conversación |
| 24–30 | 8. Integraciones y permisos | Preguntas |
| 30–34 | 9 y 10. Cumplimiento y derivación | Mención + documento |
| 34–37 | 11 y 12. Gobierno, vía y métricas | Mención + documento |
| 37–40 | Cierre: auditoría como siguiente paso | Compromiso |

## Cinco preguntas cuya respuesta cambia el proyecto

1. ¿Quién es el responsable técnico de Vigo25 y qué documentación de arquitectura existe?
2. ¿Qué APIs municipales están abiertas y en qué entorno se pueden probar?
3. ¿Tenéis el top de consultas del 010 y de Matomo en los últimos 12 meses?
4. ¿Qué categoría ENS tiene el sistema y quién firma la evaluación de impacto?
5. ¿Cómo preferís tramitar la primera fase: contrato menor, encargo o licitación?

## Lo que no conviene abrir en esta reunión

- **Precio.** No es la reunión. Si lo preguntan, rango y cierre con la auditoría.
- **Sustituir Vigo25.** Se audita primero.
- **Plazos cerrados.** El informe ya advierte de que dependen de accesos y validaciones.
- **Críticas al proveedor actual.** Nunca.
- **Los doce agentes como producto.** Son el mapa; el piloto son tres casos.
- **Los 6 segundos de carga** como dato propio: es de terceros y la portada no cargó en el análisis.

## Material a llevar

- Informe A (diagnóstico) y B (propuesta), **impresos o en PDF**, explicando la relación entre ambos.
- `DEMO_SCRIPT.md` para la demo de 30 minutos, si la piden en el momento.
- `DPIA.md` y `SEGURIDAD_GDPR_ENS_AIACT.md` como anexo de cumplimiento.
- `PILOTO_12500_VIGO.md` **solo** si la conversación deriva a contratación.

---

**CHESS AI AGENCY** · AI · Innovation · Execution · 18/11/2026
