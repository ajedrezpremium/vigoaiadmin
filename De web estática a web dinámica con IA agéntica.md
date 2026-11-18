# De web estática a web dinámica con IA agéntica

**Informe ejecutivo sobre hoxe.vigo.org**

Preparado por **Chess AI Agency** para el Departamento de Informática del Concello de Vigo · Noviembre de 2026

## 1. Resumen ejecutivo

hoxe.vigo.org es el principal canal digital del Concello: concentra noticias, servicios, información sectorial y acceso a trámites. Hoy funciona como un **repositorio de páginas que el ciudadano debe recorrer**: es la persona quien tiene que saber qué buscar, dónde está y cómo se llama el trámite.

El asistente actual de la portada, tras nuestra prueba manual, ofrece un comportamiento básico: responde, pero no resuelve. La oportunidad no es mejorar un chatbot, sino **cambiar el modelo de interacción**: pasar de una web que se consulta a una web que **entiende la intención del ciudadano, le responde con fuentes oficiales y ejecuta acciones por él** (orientar, localizar, preparar un trámite, avisar, derivar a una persona).

**Propuesta en una frase:** un agente permanente, trilingüe (gallego, español, inglés), anclado a contenido oficial verificado y conectado por API a los servicios municipales, con supervisión humana y cumplimiento normativo desde el diseño.

**Resultados esperables del piloto (a validar con datos propios del Concello):** menor carga en el 010 por consultas repetitivas, menos abandonos en trámites, mejor acceso en gallego y por móvil, y un cuadro de mando con lo que realmente preguntan los vigueses.

## 2. Diagnóstico de la web actual

### 2.1 Qué hemos podido observar

| Área | Observación | Implicación |
| --- | --- | --- |
| Arquitectura | Páginas PHP tradicionales organizadas en grandes secciones (O Concello, Móvemonos, Conécenos…), con idioma por parámetro (`?lang=`) | Navegación por árbol: el ciudadano debe conocer la estructura municipal |
| Noticias | Las secciones temáticas enlazan a noticias alojadas en un sitio aparte (xornal.vigo.org) | Contenido fragmentado en varios dominios: dificulta una respuesta unificada |
| Multilingüe | En las versiones `lang=en` los titulares de interfaz están en inglés pero parte del contenido sigue en gallego | Experiencia multilingüe incompleta; un agente puede cerrar esa brecha |
| Front-end | Dependencias heredadas visibles: jQuery, jQuery UI, jquery-migrate, lightbox 0.5, Highcharts, Font Awesome | Deuda técnica que condiciona la integración de componentes modernos |
| Rendimiento | Mediciones públicas de terceros (accessify.com) indican en torno a 6 s de carga completa, codificación WINDOWS-1252 y áreas táctiles mal dimensionadas en móvil | Fricción en móvil y accesibilidad; requiere medición propia actualizada |
| Analítica | Uso de Matomo | Buena base: permite medir el antes y el después sin cambiar de herramienta |
| Atención | El 010 (teléfono y 010@vigo.org) y los trámites en línea están descritos en una página informativa | Los canales humanos absorben consultas que podrían resolverse en el momento |
| Personalización | Existe un bloque de “recomendaciones” que carga de forma asíncrona | Punto de partida aprovechable para personalizar por contexto |

### 2.2 El agente actual

Nuestra valoración se basa en una prueba manual en portada, no en una auditoría completa. El comportamiento observado es el de un asistente básico: conversación genérica, sin evidencia de acciones ejecutables ni de personalización por contexto. Los puntos que verificaremos de forma sistemática en la Fase 0:

- Fuentes: si cita páginas oficiales y si puede equivocarse sin advertirlo.
- Idioma: si responde en gallego con calidad y mantiene el idioma elegido.
- Memoria de contexto: si recuerda lo dicho dos mensajes antes.
- Acciones: si puede abrir un trámite, reservar cita, localizar un servicio o solo enlaza.
- Derivación: si sabe cuándo pasar al 010 o a una persona.
- Medición: si deja trazabilidad de qué se pregunta y qué se resuelve.

## 3. Visión: de web que se consulta a web que resuelve

| De (web estática) | A (web dinámica agéntica) |
| --- | --- |
| El ciudadano busca en menús | El ciudadano expresa una necesidad en lenguaje natural |
| Contenido igual para todos | Contenido contextual: barrio, idioma, momento, canal |
| Enlaces a trámites | Orientación paso a paso y preparación del trámite |
| Información dispersa entre dominios | Respuesta unificada con fuente oficial citada |
| Chat que responde preguntas frecuentes | Agente que consulta sistemas y ejecuta acciones autorizadas |
| Estadística de visitas | Inteligencia de demanda: qué necesita realmente la ciudad |

## 4. Arquitectura propuesta

Se propone una arquitectura por capas que **no obliga a rehacer la web**: se superpone a ella y la va modernizando por fases.

1. **Capa de conocimiento.** Indexación continua de hoxe.vigo.org, xornal.vigo.org, agenda y documentos oficiales en un almacén vectorial alojado en la UE, con control de vigencia (fecha y estado de cada contenido) para no responder con información caducada.
2. **Capa de agentes.** Un agente orquestador que clasifica la intención y delega en agentes especializados: Trámites, Agenda y eventos, Movilidad y tráfico, Servicios sociales y educación, Noticias y actualidad.
3. **Capa de herramientas.** Conectores por API a agenda municipal, sede electrónica, cita previa, avisos y buzón de sugerencias. Cada herramienta con permisos mínimos y registro de uso.
4. **Capa de experiencia.** Widget fijo en la esquina inferior derecha, presente en todas las páginas, que **entiende en qué página está el usuario**, conserva el contexto de la conversación y puede mostrar tarjetas, mapas y formularios dentro del propio chat.
5. **Capa de gobierno.** Filtros de seguridad, citación obligatoria de fuentes, límites de alcance, supervisión humana, registro de auditoría y panel de métricas.
6. **Capa de derivación.** Traspaso al 010 o a la unidad competente con el resumen de la conversación, para que la persona no tenga que repetirse.

## 5. Casos de uso priorizados

| Prioridad | Caso de uso | Valor para el ciudadano | Complejidad |
| --- | --- | --- | --- |
| 1 | Orientación en trámites (“¿qué necesito para…?”) con requisitos, plazos y enlace directo | Alto | Baja |
| 1 | Agenda y eventos por interés, barrio y fecha | Alto | Baja |
| 1 | Respuesta trilingüe con prioridad al gallego | Alto | Baja |
| 2 | Cita previa y recordatorios desde la conversación | Alto | Media |
| 2 | Movilidad y tráfico: avisos, cortes, transporte | Medio-alto | Media |
| 2 | Ayudas y subvenciones: elegibilidad orientativa y plazos | Alto | Media |
| 3 | Preparación asistida de solicitudes en sede electrónica | Muy alto | Alta |
| 3 | Avisos proactivos personalizados (con consentimiento) | Medio | Alta |
| 3 | Panel de inteligencia de demanda para el propio Concello | Alto (interno) | Media |

## 6. Cumplimiento y confianza

En una administración pública, la confianza es el producto. El diseño incorpora desde el inicio:

- **Protección de datos (RGPD/LOPDGDD):** minimización, sin datos personales en el modelo salvo necesidad y base legal, evaluación de impacto y alojamiento en la UE.
- **Esquema Nacional de Seguridad (ENS):** controles acordes a la categoría del sistema y auditoría de acceso.
- **Reglamento europeo de IA (UE 2024/1689):** transparencia (el ciudadano sabe que habla con una IA), supervisión humana y documentación técnica.
- **Accesibilidad:** cumplimiento de WCAG 2.1 AA y del Real Decreto 1112/2018, incluyendo uso con teclado y lector de pantalla.
- **Lengua:** gallego como lengua de partida, no como traducción posterior.
- **Veracidad:** el agente responde solo con fuentes oficiales verificables, cita la fuente y, ante la duda, deriva en lugar de inventar.

## 7. Hoja de ruta propuesta

| Fase | Duración orientativa | Contenido | Entregable |
| --- | --- | --- | --- |
| 0. Auditoría | 2–3 semanas | Medición técnica de la portada, auditoría del agente actual con batería de pruebas, mapa de contenidos y sistemas, análisis de consultas del 010 | Informe de diagnóstico y casos priorizados |
| 1. Piloto | 6–8 semanas | Agente nuevo en portada con 3 casos de uso (trámites, agenda, multilingüe), indexación y panel de métricas | Piloto en producción controlada |
| 2. Ampliación | 8–12 semanas | Widget en todas las secciones, integración con cita previa y movilidad, derivación al 010 | Agente multiservicio |
| 3. Transaccional | Continuo | Preparación de solicitudes, avisos proactivos, modernización progresiva del front-end | Web dinámica completa |

Los plazos son orientativos y se ajustarán tras la Fase 0. La inversión se definirá con el alcance validado, sin compromisos previos de licencias ni de volumen.

## 8. Indicadores de éxito

- Porcentaje de consultas resueltas sin intervención humana.
- Reducción de consultas repetitivas al 010 y a 010@vigo.org.
- Satisfacción del ciudadano tras la conversación.
- Porcentaje de respuestas con fuente citada y con error detectado (objetivo: error crítico cero).
- Uso en gallego y en móvil.
- Tiempo de carga y tasa de abandono de las páginas de trámites (Matomo).
- Temas más demandados y no cubiertos por la web.

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Respuestas incorrectas o desactualizadas | Recuperación solo desde fuentes oficiales con control de vigencia, cita obligatoria, pruebas de regresión y revisión humana de temas sensibles |
| Dependencia de un proveedor de modelos | Capa de abstracción para cambiar de modelo y alojamiento en la UE |
| Deuda técnica del front-end | El agente se integra como componente independiente; la modernización es progresiva |
| Rechazo o desconfianza ciudadana | Transparencia, derivación fácil a una persona y comunicación clara de alcance |
| Datos personales | Minimización, evaluación de impacto y registros pseudonimizados |

## 10. Siguientes pasos

1. Reunión técnica con el Departamento de Informática para validar alcance y sistemas disponibles.
2. Acceso a datos agregados de consultas del 010 y de Matomo.
3. Lanzamiento de la Fase 0 y presentación de resultados.
4. Decisión sobre el piloto con casos de uso y métricas acordadas.

## Anexo: alcance y límites de este análisis

Este informe se ha elaborado a partir de páginas públicas de hoxe.vigo.org accesibles e indexadas, de mediciones públicas de terceros y de una prueba manual del agente actual. La portada no pudo cargarse de forma automática durante el análisis, por lo que las observaciones de rendimiento y de arquitectura deben contrastarse con una medición propia en la Fase 0 antes de tomar decisiones de inversión.
