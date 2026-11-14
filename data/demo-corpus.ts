// Corpus documental SINTÉTICO para la demo.
// ⚠️ DATOS DEMOSTRATIVOS — no corresponden a documentos oficiales del Concello de Vigo.
// En producción: sustituir por documentos públicos autorizados (Megaprompt §7, propuesta §5).

import type { DemoDoc } from "@/types";

export const DEMO_CORPUS: DemoDoc[] = [
  {
    id: "DOC-001",
    title: "Horarios de atención al público de servicios municipales",
    dept: "Secretaría General",
    type: "información",
    lang: "multi",
    published: "2026-09-01",
    effective: "2026-09-15",
    content:
      "Horario general de atención al público: de lunes a viernes, de 9:00 a 14:00, excepto festivos. El Servicio de Atención al Ciudadano (OAC) atiende además por las tardes de martes a jueves de 16:00 a 18:30. El Registro Municipal auxiliar atiende de 9:00 a 14:00. Los servicios telefónicos de emergencia operan 24 horas. Durante el mes de agosto el horario se reduce a 8:30 a 14:30. La cita previa puede solicitarse por teléfono o en la web municipal.",
  },
  {
    id: "DOC-002",
    title: "Ordenanza reguladora de terrazas de hostelería",
    dept: "Consumo y Comercio",
    type: "ordenanza",
    lang: "es",
    published: "2025-03-10",
    effective: "2025-06-01",
    content:
      "La instalación de terrazas requiere licencia previa del Servicio de Consumo y Comercio. La solicitud debe incluir: plano de emplazamiento, número de mesas y sillas solicitadas, descripción del mobiliario, y justificante del pago de la tasa. Las terrazas ocupan como máximo la mitad de la anchura de la acera, dejando libre un paso mínimo de 1,50 metros para peatones. Está prohibida la ocupación de accesos a viviendas, portales y vías de emergencia. El horario permitido es de 11:00 a 23:30 en invierno y hasta 00:30 en verano. Las sillas no pueden ocupar la calzada. Artículo 4: documentación exigible. Artículo 7: condiciones de ocupación. Artículo 12: tarifas y tasas.",
  },
  {
    id: "DOC-003",
    title: "Trámite: licencia de apertura de actividad comercial",
    dept: "Licencias y Actividades",
    type: "trámite",
    lang: "multi",
    published: "2026-01-20",
    effective: "2026-02-01",
    content:
      "Para solicitar la licencia de apertura de actividad comercial es necesario: 1) formulario normalizado de declaración responsable; 2) descripción de la actividad y código CNAE; 3) plano acotado del local; 4) acreditación de la titularidad o arrendamiento del local; 5) proyecto técnico firmado por técnico competente cuando la actividad lo requiera; 6) justificante del pago de la tasa municipal. La declaración responsable surte efectos desde su presentación ante el Registro Municipal, sin perjuicio de las inspecciones posteriores. El trámite se realiza por vía electrónica en la sede electrónica municipal. Plazo de resolución: no requiere licencia previa, procede declaración responsable.",
  },
  {
    id: "DOC-004",
    title: "Guía de subvenciones para emprendedores y nuevas empresas",
    dept: "Promoción Económica",
    type: "subvención",
    lang: "multi",
    published: "2026-10-05",
    effective: "2026-10-20",
    content:
      "Programa de ayudas a la creación de empresas: subvención de hasta 6.000 euros para gastos de constitución y puesta en marcha de empresas creadas en los últimos doce meses. Requisitos: alta del empresario en el censo de actividades económicas, domicilio fiscal en el municipio, y no estar incursa en prohibiciones de la ley general de subvenciones. Documentación: solicitud normalizada, memoria del proyecto, facturas justificantes y certificado de estar al corriente con la seguridad social. Plazo de presentación: un mes desde la publicación de la convocatoria. La concesión se resuelve en régimen de concurrencia competitiva. La cuantía y condiciones deben verificarse en la convocatoria oficial publicada.",
  },
  {
    id: "DOC-005",
    title: "Servicios sociales municipales: información general",
    dept: "Servicios Sociales",
    type: "información",
    lang: "gl",
    published: "2026-04-15",
    effective: "2026-04-15",
    content:
      "Os servizos sociais municipais contan con centros distribuídos por toda a cidade que ofrecen información, orientación e derivación a programas de axuda. Os centros de servizos sociais atenden con cita previa de luns a venres de 8:30 a 14:30. As peixas de atención primaria atenden cada zona da cidade. Para situacións de emerxencia social existe un servizo de garda. O servizo non realiza decisións de elixibilidade por teléfono nin por canles dixitais: a valoración realízase no centro correspondente co profesional responsábel. Calquera persoa pode pedir cita sen necesidade de achegar documentación previa.",
  },
  {
    id: "DOC-006",
    title: "Agenda cultural municipal: bibliotecas, museos y actividades",
    dept: "Cultura e Deporte",
    type: "agenda",
    lang: "multi",
    published: "2026-11-02",
    effective: "2026-11-02",
    content:
      "A biblioteca municipal central abre de luns a sábado de 9:00 a 21:00, agá festivos. O museo municipal atén de martes a domingo de 10:00 a 19:00; entrada gratuíta os domingos. A programación cultural de novembro inclúe obradoiros familiares os sábados pola mañá, ciclos de cine de autor os mércores, e concertos no auditorio os venres. As actividades son gratuítes con inscrición previa na web municipal ou na sede da biblioteca. A sala de exposicións permanentes pecha os luns para mantemento.",
  },
  {
    id: "DOC-007",
    title: "Urbanismo: licencias de obra menor",
    dept: "Urbanismo",
    type: "trámite",
    lang: "es",
    published: "2026-02-10",
    effective: "2026-03-01",
    content:
      "Las obras de reforma menor que no modifiquen estructura, fachada ni uso requieren licencia de obra menor. Documentación: solicitud normalizada, descripción de las obras, presupuesto, y plano de la zona afectada. Las obras en fachada o estructura requieren proyecto técnico y licencia de obra mayor. La duración estimada del procedimiento de obra menor es de dos meses. Está prohibido iniciar las obras antes de la concesión de la licencia. Las parcelas situadas en suelo no urbanizable tienen condiciones especiales. Para consultas sobre planeamiento general, debe dirigirse al Servicio de Urbanismo; las certificaciones urbanísticas se tramitan en el propio servicio presencialmente o por sede electrónica.",
  },
  {
    id: "DOC-008",
    title: "Guía del Registro Municipal y sede electrónica",
    dept: "Secretaría General",
    type: "guía",
    lang: "multi",
    published: "2026-06-01",
    effective: "2026-06-01",
    content:
      "Todo escrito o solicitud dirigida a la Administración municipal puede presentarse en el Registro Municipal auxiliar, en las oficinas de atención al ciudadano, o por vía electrónica en la sede electrónica. Para actuar por vía electrónica es necesario disponer de un sistema de identificación admitido: certificado digital, identificación electrónica DNIe, o sistemas de clave de la plataforma de identificación pública. El registro electrónico recibe documentación las 24 horas todos los días; el día de presentación a efectos de plazos es el de la recepción hasta las 14:30, pasando al siguiente día hábil las recibidas con posterioridad. No se admiten como medio de presentación los correos electrónicos ordinarios.",
  },
  {
    id: "DOC-009",
    title: "Información turística y puntos de información al visitante",
    dept: "Turismo",
    type: "información",
    lang: "multi",
    published: "2026-05-20",
    effective: "2026-05-20",
    content:
      "A oficina de turismo principal atén de luns a domingo de 9:00 a 19:00 na praza central. Existen puntos de información turística nas zonas portuarias e na estación marítima. Disponse de material informativo en galego, castelán, inglés e portugués. Ofertas de turismo activo, rutas guiadas polas zonas históricas e información sobre transporte público e mobilidade están dispoñibles na web municipal. As visitas guiadas gratuitas precisan inscrición previa e realízanse os sábados pola mañá.",
  },
  {
    id: "DOC-010",
    title: "Ordenanza de convivencia y uso del espacio público",
    dept: "Seguridad Ciudadana",
    type: "ordenanza",
    lang: "es",
    published: "2024-11-30",
    effective: "2025-01-15",
    content:
      "La ordenanza de convivencia regula el uso del espacio público municipal. Artículo 5: queda prohibida la instalación de elementos permanentes sin autorización. Artículo 9: los mercadillos y ventas no sedentarias requieren autorización previa del Servicio de Seguridad Ciudadana. Artículo 14: la publicidad exterior se ajusta a la normativa de conservación del paisaje urbano. Las sanciones se tramitan conforme al procedimiento sancionador y siempre con audiencia previa al interesado. Las notificaciones se practican en la dirección que conste en el expediente. Esta ordenanza se publica íntegramente en el boletín oficial y su texto consolidado está disponible para consulta pública.",
  },
  {
    id: "DOC-011",
    title: "Deporte municipal: instalacións deportivas e pistas",
    dept: "Cultura e Deporte",
    type: "información",
    lang: "gl",
    published: "2026-08-12",
    effective: "2026-08-12",
    content:
      "As instalacións deportivas municipais abren de luns a sábado. As pistas de tenis e fútbol sala pódense reservar pola web municipal ou por teléfono, ata 7 días de antelación. A piscina municipal ten horario de mañá de 8:00 a 14:00 e de tarde de 16:00 a 21:30 en días laborábeis, e de 10:00 a 14:00 os sábados. As tarxetas deportivas dan desconto na entrada e nas reservas. Os programas de actividades dirixidas precisan inscrición trimestral. O mantemento anual pecha a piscina dúas semanas en setembro.",
  },
  {
    id: "DOC-012",
    title: "Guía rápida: cómo localizar el servicio municipal responsable",
    dept: "Secretaría General",
    type: "guía",
    lang: "multi",
    published: "2026-07-01",
    effective: "2026-07-01",
    content:
      "Cada trámite municipal tiene un servicio responsable. La guía de servicios relaciona cada procedimiento con el departamento, la unidad administrativa y el canal de presentación. Para localizar la unidad responsable de un trámite: 1) consulte la guía de trámites en la web municipal; 2) si no la localiza, el Servicio de Atención al Ciudadano (OAC) puede derivar su consulta; 3) las consultas escritas pueden presentarse en el Registro Municipal. El asistente virtual de información municipal no determina competencias ni responde por el servicio responsable en casos no publicados: en ese caso debe dirigirse al OAC o a la unidad municipal correspondiente.",
  },
  {
    id: "DOC-013",
    title: "Solicitud de cita previa en el Registro y Sede Electrónica",
    dept: "Registro y Sede Electrónica",
    type: "guía",
    lang: "multi",
    published: "2026-09-10",
    effective: "2026-09-10",
    content:
      "Para solicitar cita previa en el Concello de Vigo es necesario: 1) disponer del sistema de identificación admitido para la vía electrónica (certificado digital, identificación electrónica DNIe o clave de la plataforma de identificación pública); 2) identificar el servicio o unidad responsable del trámite; 3) seleccionar el canal (sede electrónica, Registro Municipal auxiliar, oficina de atención al ciudadano u oficina telefónica). Las citas del Servicio de Atención al Ciudadano (OAC) se realizan previa solicitud y se pueden gestionar telefónicamente o a través de la sede electrónica. El Registro Municipal auxiliar atiende de 9:00 a 14:00 de lunes a viernes. Las solicitudes presentadas por vía electrónica se registran a las 24 horas todos los días; para efectos de plazo se toma como fecha de presentación la recepción hasta las 14:30. El asistente virtual de información municipal orienta sobre los canales disponibles, pero la solicitud efectiva de cita se realiza a través de los canales oficiales del Concello.",
  },
  {
    id: "DOC-014",
    title: "Historia de Vigo: orígenes y época castreña",
    dept: "Cultura e Patrimonio",
    type: "información",
    lang: "multi",
    published: "2026-01-10",
    effective: "2026-01-10",
    content:
      "Vigo tiene su origen en la época castreña. En el monte do Castro se han encontrado restos de un castro celta que demuestra la presencia humana en la zona desde hace más de 2.000 años. Los romanos también dejaron su huella: en el barrio de Bouzas se han encontrado restos de salazones romanas, lo que indica que Vigo ya era un enclave pesquero y comercial en la época del Imperio Romano. El nombre 'Vigo' podría derivar del latín 'vicus' (aldea) o de 'vicus spaccorum' (aldea de los espacenses). La ría de Vigo, con sus islas Cíes, fue un refugio natural para navegantes desde la antigüedad.",
  },
  {
    id: "DOC-015",
    title: "Historia de Vigo: Edad Media y señorío",
    dept: "Cultura e Patrimonio",
    type: "información",
    lang: "multi",
    published: "2026-01-10",
    effective: "2026-01-10",
    content:
      "Durante la Edad Media, Vigo fue un pequeño núcleo de pescadores bajo el señorío de los obispos de Tui. En el siglo XII, el rey Fernando II de León otorgó fueros a la villa. El castillo de O Castro fue reconstruido en el siglo XVII para defender la ciudad de los ataques ingleses y holandeses. Vigo sufrió numerosos ataques: en 1585 y 1589 fue saqueada por el corsario inglés Francis Drake. En 1656, los ingleses bajo el mando de Robert Blake atacaron la ciudad. Estos ataques motivaron la construcción de fortificaciones que aún se conservan en el monte do Castro.",
  },
  {
    id: "DOC-016",
    title: "Historia de Vigo: la Batalla de Rande (1702) y el tesoro",
    dept: "Cultura e Patrimonio",
    type: "información",
    lang: "multi",
    published: "2026-01-10",
    effective: "2026-01-10",
    content:
      "El 23 de octubre de 1702 tuvo lugar la Batalla de la Ría de Vigo (batalla de Rande), uno de los episodios más famosos de la historia de Vigo. Una flota hispano-francesa cargada con el tesoro de las Indias (oro y plata de América) fue atacada por la flota anglo-holandesa en la ría de Vigo. La flota aliada destruyó o capturó la mayor parte de los barcos. Parte del tesoro se hundió en la ría y ha sido objeto de numerosas búsquedas y leyendas. Este episodio inspiró la novela 'Veinte mil leguas de viaje submarino' de Julio Verne. El tesoro de Rande sigue siendo un mito vigués. En el lugar de la batalla, en la ensenada de San Simón, se puede visitar hoy un centro de interpretación.",
  },
  {
    id: "DOC-017",
    title: "Historia de Vigo: el puerto y la emigración",
    dept: "Cultura e Patrimonio",
    type: "información",
    lang: "multi",
    published: "2026-01-10",
    effective: "2026-01-10",
    content:
      "El puerto de Vigo se convirtió en el motor de la ciudad a partir del siglo XIX. La pesca de la sardina y la industria conservera convirtieron a Vigo en la capital del marisqueo. En el siglo XX, Vigo se convirtió en uno de los principales puertos de emigración a América: miles de gallegos partieron desde Vigo hacia Argentina, Uruguay, Cuba y México. La Estación Marítima de Vigo fue el punto de partida de esa diáspora. Vigo también es conocida como la 'ciudad olívica' por sus olivos y como la 'ciudad del mar'. Hoy el puerto de Vigo es uno de los más importantes de España en tráfico de mercancías y pesca.",
  },
  {
    id: "DOC-018",
    title: "Historia de Vigo: siglo XX y actualidad",
    dept: "Cultura e Patrimonio",
    type: "información",
    lang: "multi",
    published: "2026-01-10",
    effective: "2026-01-10",
    content:
      "En el siglo XX, Vigo experimentó un gran crecimiento industrial y demográfico. La industria automovilística (Citroën/PSA) se instaló en Vigo en 1958, convirtiendo a la ciudad en un importante centro industrial. La población creció de 40.000 habitantes a más de 300.000. Vigo es hoy la ciudad más poblada de Galicia. El monte do Castro, con su parque y las ruinas del castillo, es uno de los principales miradores de la ciudad. Las Islas Cíes, declaradas Parque Nacional en 2002, son el gran atractivo turístico. La ría de Vigo es una de las más bellas de Galicia, con sus bateas de mejillones y sus playas.",
  },
];

/** Preguntas sugeridas por idioma para la interfaz */
export const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  gl: [
    "Cal é o horario de atención ao público?",
    "Que documentación precisto para abrir unha tenda?",
    "Cando abre a biblioteca municipal?",
    "Como podo solicitar unha licenza de obras menores?",
    "Como podo solicitar unha cita previa na sede electronica?",
    "Cal foi a batalla de Rande?",
  ],
  es: [
    "¿Cuál es el horario de atención al público?",
    "¿Qué documentación necesito para abrir un comercio?",
    "¿Cuándo abre la biblioteca municipal?",
    "¿Cómo solicito una licencia de obra menor?",
    "¿Cómo solicito una cita previa en la sede electrónica?",
    "¿Cuál fue la batalla de Rande?",
  ],
  en: [
    "What are the opening hours for municipal services?",
    "What documents do I need to open a shop?",
    "When is the municipal library open?",
    "How do I apply for a minor works permit?",
    "How do I request a prior appointment at the registry?",
    "What was the Battle of Rande?",
  ],
};
