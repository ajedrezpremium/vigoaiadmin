"use client";

// Landing comercial — IA para concellos (provincia de Pontevedra).
// Misma identidad visual que la portada: slate-950, azul brand-600 y tarjetas redondeadas.
// El formulario guarda el lead en Supabase y avisa por correo/webhook si está configurado.

import { useState } from "react";

type Lang2 = "gl" | "es";

const COPY = {
  gl: {
    nav: { como: "Como funciona", prezos: "Prezos", probas: "Probas", contacto: "Contacto" },
    demoCta: "Probar a demo",
    heroTag: "Para concellos · Provincia de Pontevedra",
    h1first: "A información do Concello,",
    h1second: "a unha pregunta de distancia.",
    heroSub:
      "Implantamos un asistente de IA para o persoal municipal: responde con fontes citadas, redacta borradores e transcribe reunións. En galego e castelán, cos datos baixo control municipal.",
    ctaPrimary: "Pedir diagnóstico gratuíto",
    ctaSecondary: "Ver a plataforma",
    heroNote: "30 minutos · sen compromiso · con datos do teu concello",
    badges: ["Datos aloxados na UE", "RGPD · ENS · AI Act", "Galego e castelán"],
    stats: [
      { v: "−60 %", l: "tempo en consultas internas" },
      { v: "100 %", l: "respostas con fonte citada" },
      { v: "6 semanas", l: "do piloto á medición" },
      { v: "61", l: "concellos na provincia" },
    ],
    featuresTitle: "Que inclúe",
    featuresSub:
      "Un núcleo común que se configura con cada concello en 48 horas. Sen desenvolvemento a medida e sen depender dun único provedor.",
    features: [
      {
        icon: "⚖️",
        t: "Asistente normativo",
        d: "Responde sobre ordenanzas, subvencións e procedementos citando o documento orixinal.",
      },
      {
        icon: "📝",
        t: "Borradores de informes",
        d: "Xera borradores con plantillas municipais. A persoa sempre revisa, axusta e asina.",
      },
      {
        icon: "🎙️",
        t: "Voz e transcrición",
        d: "Transcribe reunións e le as respostas en voz alta, en galego e castelán.",
      },
      {
        icon: "🗂️",
        t: "Arquivo e OCR",
        d: "Localiza documentos dixitalizados e extrae o texto para poder buscalo.",
      },
      {
        icon: "🤖",
        t: "Dez axentes especializados",
        d: "Cidadanía, administración, urbanismo, negocio, cultura, lingua e máis.",
      },
      {
        icon: "🔒",
        t: "Panel e auditoría",
        d: "Métricas de uso, rexistro de eventos e control de acceso por roles.",
      },
    ],
    howTitle: "Como funciona",
    howSub: "Do primeiro contacto á medición, nunhas seis semanas.",
    steps: [
      {
        t: "Diagnóstico de 30 minutos",
        d: "Vemos que documentos tes e eliximos un caso de uso que se poida medir.",
      },
      {
        t: "Configuración en 48 horas",
        d: "Corpus propio, escudo, cores e idiomas. Sen desenvolvemento a medida.",
      },
      {
        t: "Piloto de 3 a 6 semanas",
        d: "Unha área real, datos reais e métricas acordadas por escrito.",
      },
      {
        t: "Decisión con datos",
        d: "Se funciona, continúas. Se non, quedas co informe e coa aprendizaxe.",
      },
    ],
    pricingTitle: "Prezos por tamaño de concello",
    pricingSub:
      "Prezo pechado e sen permanencia. Por baixo de 15.000 € tramítase como contrato menor de servizos: sen licitación.",
    plans: [
      {
        tag: "Tramo A",
        pop: "máis de 20.000 habitantes",
        price: "12.500 €",
        weeks: "6 semanas",
        badge: "",
        bullets: [
          "Asistente con 150 documentos municipais",
          "Borradores con plantillas do Concello",
          "Voz e transcrición de reunións",
          "Formación e panel de métricas",
        ],
      },
      {
        tag: "Tramo B",
        pop: "10.000 – 20.000 habitantes",
        price: "7.900 €",
        weeks: "4 semanas",
        badge: "",
        bullets: [
          "Asistente con 100 documentos",
          "Borradores en dúas áreas",
          "Formación de 8 persoas",
          "Panel de métricas e informe",
        ],
      },
      {
        tag: "Tramo C",
        pop: "5.000 – 10.000 habitantes",
        price: "4.900 €",
        weeks: "3 semanas",
        badge: "Recomendado para comezar",
        bullets: [
          "Asistente con 60 documentos",
          "Un caso de uso prioritario",
          "Formación de 5 persoas",
          "Informe de resultados",
        ],
      },
      {
        tag: "Tramo D",
        pop: "menos de 5.000 habitantes",
        price: "2.900 €",
        weeks: "micro-piloto",
        badge: "",
        bullets: [
          "Asistente con 40 documentos",
          "Consulta de ordenanzas e axudas",
          "Formación de 3 persoas",
          "Informe de resultados",
        ],
      },
    ],
    pricingNote:
      "Despois do piloto, a implantación anual vai de 9.000 a 24.000 €/ano segundo tamaño e uso, con aloxamento na UE e soporte incluídos.",
    pricingFine: "IVE non incluído. Importes válidos para 2026.",
    proofTitle: "Por que podes confiar",
    proofs: [
      {
        v: "Demo",
        t: "Probar antes de falar",
        d: "O asistente está aberto: respostas con citas sobre normativa municipal, sen rexistro.",
      },
      {
        v: "27",
        t: "tests automatizados",
        d: "Recuperación, rutas e seguridade verificadas en cada despregue.",
      },
      {
        v: "100 %",
        t: "no conxunto de avaliación",
        d: "Preguntas de referencia respondidas coa fonte correcta.",
      },
      {
        v: "3",
        t: "marcos legais documentados",
        d: "RGPD, ENS e AI Act: análise de riscos, DPIA e plan de saída.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "Xa temos un chatbot municipal. Isto é o mesmo?",
        a: "Non. O chatbot atende á cidadanía na web; este asistente traballa para o persoal: normativa, borradores, transcricións e arquivo, sempre con citas e revisión humana.",
      },
      {
        q: "Onde están os datos?",
        a: "Na Unión Europea, cun acordo de encargado de tratamento. Non se adestran modelos con datos municipais sen autorización expresa.",
      },
      {
        q: "Necesitamos contratar hardware?",
        a: "Non para o piloto: funciona na nube. Se o Concello quere servidor propio, despregámolo no seu CPD cando o teña.",
      },
      {
        q: "Como se xustifica o gasto?",
        a: "Como contrato menor de servizos, cun informe de horas aforradas e respostas con fonte. Axudámosche coa memoria xustificativa.",
      },
    ],
    formTitle: "Pide un diagnóstico gratuíto",
    formSub:
      "Contamos cun caso de uso concreto para o teu concello. Se non encaixa, dicímolo na primeira chamada.",
    fields: {
      concello: "Concello",
      nome: "Nome e apelidos",
      cargo: "Cargo",
      email: "Correo electrónico",
      telefono: "Teléfono",
      tramo: "Tamaño do concello",
      interese: "Que che interesa máis",
      mensaxe: "Mensaxe",
    },
    placeholders: {
      concello: "Concello de…",
      nome: "Nome e apelidos",
      cargo: "Secretaría, Intervención, Modernización…",
      email: "nome@concello.gal",
      telefono: "Opcional",
      mensaxe: "Un caso de uso, un problema concreto ou unha dúbida…",
    },
    tramoOptions: [
      { v: "D", l: "Menos de 5.000 habitantes" },
      { v: "C", l: "5.000 – 10.000" },
      { v: "B", l: "10.000 – 20.000" },
      { v: "A", l: "Máis de 20.000" },
      { v: "outro", l: "Mancomunidade ou outro" },
    ],
    intereseOptions: [
      "Asistente normativo",
      "Borradores e informes",
      "Voz e transcrición",
      "Arquivo e OCR",
      "Aínda non o sei",
    ],
    consent:
      "Acepto que CHESS AI AGENCY trate os meus datos para responder a esta solicitude, conforme ao aviso legal.",
    submit: "Enviar solicitude",
    sending: "Enviando…",
    successTitle: "Solicitude recibida",
    successBody:
      "Grazas. Respondemos en menos de 24 horas laborables. Se queres adiantar, proba a demo con datos sintéticos.",
    formError: "Non puidemos enviar a solicitude. Téntao de novo nun minuto.",
    optional: "opcional",
    footerNote:
      "Demostración con datos sintéticos. Non é un servizo municipal en produción.",
    footerLinks: { legal: "Aviso legal", demo: "Demo", home: "Portada" },
    privacyNote: "Non compartimos os teus datos con terceiros.",
  },
  es: {
    nav: { como: "Cómo funciona", prezos: "Precios", probas: "Pruebas", contacto: "Contacto" },
    demoCta: "Probar la demo",
    heroTag: "Para ayuntamientos · Provincia de Pontevedra",
    h1first: "La información del Concello,",
    h1second: "a una pregunta de distancia.",
    heroSub:
      "Implantamos un asistente de IA para el personal municipal: responde con fuentes citadas, redacta borradores y transcribe reuniones. En gallego y castellano, con los datos bajo control municipal.",
    ctaPrimary: "Pedir diagnóstico gratuito",
    ctaSecondary: "Ver la plataforma",
    heroNote: "30 minutos · sin compromiso · con datos de tu concello",
    badges: ["Datos alojados en la UE", "RGPD · ENS · AI Act", "Gallego y castellano"],
    stats: [
      { v: "−60 %", l: "tiempo en consultas internas" },
      { v: "100 %", l: "respuestas con fuente citada" },
      { v: "6 semanas", l: "del piloto a la medición" },
      { v: "61", l: "concellos en la provincia" },
    ],
    featuresTitle: "Qué incluye",
    featuresSub:
      "Un núcleo común que se configura con cada concello en 48 horas. Sin desarrollo a medida y sin depender de un único proveedor.",
    features: [
      {
        icon: "⚖️",
        t: "Asistente normativo",
        d: "Responde sobre ordenanzas, subvenciones y procedimientos citando el documento original.",
      },
      {
        icon: "📝",
        t: "Borradores de informes",
        d: "Genera borradores con plantillas municipales. La persona siempre revisa, ajusta y firma.",
      },
      {
        icon: "🎙️",
        t: "Voz y transcripción",
        d: "Transcribe reuniones y lee las respuestas en voz alta, en gallego y castellano.",
      },
      {
        icon: "🗂️",
        t: "Archivo y OCR",
        d: "Localiza documentos digitalizados y extrae el texto para poder buscarlo.",
      },
      {
        icon: "🤖",
        t: "Diez agentes especializados",
        d: "Ciudadanía, administración, urbanismo, negocio, cultura, lengua y más.",
      },
      {
        icon: "🔒",
        t: "Panel y auditoría",
        d: "Métricas de uso, registro de eventos y control de acceso por roles.",
      },
    ],
    howTitle: "Cómo funciona",
    howSub: "Del primer contacto a la medición, en unas seis semanas.",
    steps: [
      {
        t: "Diagnóstico de 30 minutos",
        d: "Vemos qué documentos tienes y elegimos un caso de uso que se pueda medir.",
      },
      {
        t: "Configuración en 48 horas",
        d: "Corpus propio, escudo, colores e idiomas. Sin desarrollo a medida.",
      },
      {
        t: "Piloto de 3 a 6 semanas",
        d: "Un área real, datos reales y métricas acordadas por escrito.",
      },
      {
        t: "Decisión con datos",
        d: "Si funciona, continúas. Si no, te quedas con el informe y el aprendizaje.",
      },
    ],
    pricingTitle: "Precios por tamaño de ayuntamiento",
    pricingSub:
      "Precio cerrado y sin permanencia. Por debajo de 15.000 € se tramita como contrato menor de servicios: sin licitación.",
    plans: [
      {
        tag: "Tramo A",
        pop: "más de 20.000 habitantes",
        price: "12.500 €",
        weeks: "6 semanas",
        badge: "",
        bullets: [
          "Asistente con 150 documentos municipales",
          "Borradores con plantillas del Concello",
          "Voz y transcripción de reuniones",
          "Formación y panel de métricas",
        ],
      },
      {
        tag: "Tramo B",
        pop: "10.000 – 20.000 habitantes",
        price: "7.900 €",
        weeks: "4 semanas",
        badge: "",
        bullets: [
          "Asistente con 100 documentos",
          "Borradores en dos áreas",
          "Formación de 8 personas",
          "Panel de métricas e informe",
        ],
      },
      {
        tag: "Tramo C",
        pop: "5.000 – 10.000 habitantes",
        price: "4.900 €",
        weeks: "3 semanas",
        badge: "Recomendado para empezar",
        bullets: [
          "Asistente con 60 documentos",
          "Un caso de uso prioritario",
          "Formación de 5 personas",
          "Informe de resultados",
        ],
      },
      {
        tag: "Tramo D",
        pop: "menos de 5.000 habitantes",
        price: "2.900 €",
        weeks: "micro-piloto",
        badge: "",
        bullets: [
          "Asistente con 40 documentos",
          "Consulta de ordenanzas y ayudas",
          "Formación de 3 personas",
          "Informe de resultados",
        ],
      },
    ],
    pricingNote:
      "Después del piloto, la implantación anual va de 9.000 a 24.000 €/año según tamaño y uso, con alojamiento en la UE y soporte incluidos.",
    pricingFine: "IVA no incluido. Importes válidos para 2026.",
    proofTitle: "Por qué puedes confiar",
    proofs: [
      {
        v: "Demo",
        t: "Probar antes de hablar",
        d: "El asistente está abierto: respuestas con citas sobre normativa municipal, sin registro.",
      },
      {
        v: "27",
        t: "tests automatizados",
        d: "Recuperación, rutas y seguridad verificadas en cada despliegue.",
      },
      {
        v: "100 %",
        t: "en el conjunto de evaluación",
        d: "Preguntas de referencia respondidas con la fuente correcta.",
      },
      {
        v: "3",
        t: "marcos legales documentados",
        d: "RGPD, ENS y AI Act: análisis de riesgos, DPIA y plan de salida.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "Ya tenemos un chatbot municipal. ¿Esto es lo mismo?",
        a: "No. El chatbot atiende a la ciudadanía en la web; este asistente trabaja para el personal: normativa, borradores, transcripciones y archivo, siempre con citas y revisión humana.",
      },
      {
        q: "¿Dónde están los datos?",
        a: "En la Unión Europea, con un acuerdo de encargado de tratamiento. No se entrenan modelos con datos municipales sin autorización expresa.",
      },
      {
        q: "¿Necesitamos contratar hardware?",
        a: "No para el piloto: funciona en la nube. Si el Concello quiere servidor propio, lo desplegamos en su CPD cuando lo tenga.",
      },
      {
        q: "¿Cómo se justifica el gasto?",
        a: "Como contrato menor de servicios, con un informe de horas ahorradas y respuestas con fuente. Te ayudamos con la memoria justificativa.",
      },
    ],
    formTitle: "Pide un diagnóstico gratuito",
    formSub:
      "Contamos con un caso de uso concreto para tu concello. Si no encaja, lo decimos en la primera llamada.",
    fields: {
      concello: "Ayuntamiento",
      nome: "Nombre y apellidos",
      cargo: "Cargo",
      email: "Correo electrónico",
      telefono: "Teléfono",
      tramo: "Tamaño del ayuntamiento",
      interese: "Qué te interesa más",
      mensaxe: "Mensaje",
    },
    placeholders: {
      concello: "Ayuntamiento de…",
      nome: "Nombre y apellidos",
      cargo: "Secretaría, Intervención, Modernización…",
      email: "nombre@concello.gal",
      telefono: "Opcional",
      mensaxe: "Un caso de uso, un problema concreto o una duda…",
    },
    tramoOptions: [
      { v: "D", l: "Menos de 5.000 habitantes" },
      { v: "C", l: "5.000 – 10.000" },
      { v: "B", l: "10.000 – 20.000" },
      { v: "A", l: "Más de 20.000" },
      { v: "outro", l: "Mancomunidad u otro" },
    ],
    intereseOptions: [
      "Asistente normativo",
      "Borradores e informes",
      "Voz y transcripción",
      "Archivo y OCR",
      "Aún no lo sé",
    ],
    consent:
      "Acepto que CHESS AI AGENCY trate mis datos para responder a esta solicitud, conforme al aviso legal.",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    successTitle: "Solicitud recibida",
    successBody:
      "Gracias. Respondemos en menos de 24 horas laborables. Si quieres adelantar, prueba la demo con datos sintéticos.",
    formError: "No hemos podido enviar la solicitud. Inténtalo de nuevo en un minuto.",
    optional: "opcional",
    footerNote: "Demostración con datos sintéticos. No es un servicio municipal en producción.",
    footerLinks: { legal: "Aviso legal", demo: "Demo", home: "Portada" },
    privacyNote: "No compartimos tus datos con terceros.",
  },
} as const;

const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-400";
const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400";

export default function AyuntamientosLanding() {
  const [lang, setLang] = useState<Lang2>("gl");
  const t = COPY[lang];

  const [form, setForm] = useState({
    concello: "",
    nome: "",
    cargo: "",
    email: "",
    telefono: "",
    tramo: "",
    interese: "",
    mensaxe: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const [error, setError] = useState("");

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          consent,
          idioma: lang,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? t.formError);
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.formError);
      setStatus("idle");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,80,235,0.22),transparent)]"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <a href="/" className="flex flex-col leading-tight" title="VIGO AI ADMINISTRATION">
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden className="text-xl">
                🏛️
              </span>
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                VIGO AI
              </span>
              <span className="text-slate-400">ADMINISTRATION</span>
            </span>
            <span className="ml-7 text-[10px] font-medium text-slate-400">
              {lang === "gl"
                ? "Plataforma intelixente para servizos públicos"
                : "Plataforma inteligente para servicios públicos"}
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Secciones">
            <a href="#como" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.como}
            </a>
            <a href="#prezos" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.prezos}
            </a>
            <a href="#probas" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.probas}
            </a>
            <a href="#contacto" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.contacto}
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="flex rounded-lg border border-slate-700 p-0.5 text-[11px]" role="group" aria-label="Idioma">
              {(["gl", "es"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded px-2 py-1 font-semibold uppercase transition ${
                    lang === l ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="/"
              className="hidden rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-brand-400 sm:inline-block"
            >
              {t.demoCta}
            </a>
            <a
              href="#contacto"
              className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-500"
            >
              {t.ctaPrimary}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 md:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
          <span aria-hidden>📍</span>
          {t.heroTag}
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          <span className="block">{t.h1first}</span>
          <span className="mt-1 block bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
            {t.h1second}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {t.heroSub}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contacto"
            className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="/"
            className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-brand-400"
          >
            {t.ctaSecondary} →
          </a>
          <span className="text-xs text-slate-500">{t.heroNote}</span>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {t.badges.map((b) => (
            <li
              key={b}
              className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Cifras */}
      <section className="relative border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-bold text-brand-300 md:text-4xl">{s.v}</p>
              <p className="mt-1 text-xs text-slate-400 md:text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Qué incluye */}
      <section id="plataforma" className="relative mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold">{t.featuresTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{t.featuresSub}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => (
            <div
              key={f.t}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-brand-500/50 hover:bg-slate-900"
            >
              <span aria-hidden className="text-2xl">
                {f.icon}
              </span>
              <h3 className="mt-3 font-semibold text-slate-100">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como" className="relative border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold">{t.howTitle}</h2>
          <p className="mt-3 text-sm text-slate-400">{t.howSub}</p>

          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {t.steps.map((s, i) => (
              <li key={s.t} className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-500/50 bg-brand-500/10 text-sm font-bold text-brand-300">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-slate-100">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Precios */}
      <section id="prezos" className="relative mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold">{t.pricingTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{t.pricingSub}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.plans.map((p) => (
            <div
              key={p.tag}
              className={`relative flex flex-col rounded-2xl border p-5 ${
                p.badge
                  ? "border-brand-500/60 bg-gradient-to-b from-brand-950/40 to-slate-900/60"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-5 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {p.badge}
                </span>
              )}
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-400">{p.tag}</p>
              <p className="mt-1 text-xs text-slate-400">{p.pop}</p>
              <p className="mt-4 text-3xl font-bold text-slate-50">{p.price}</p>
              <p className="text-xs text-slate-400">{p.weeks}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="text-brand-400">
                      ✓
                    </span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="mt-6 rounded-lg border border-slate-600 px-3 py-2 text-center text-xs font-semibold text-slate-200 transition hover:border-brand-400 hover:text-white"
              >
                {t.ctaPrimary}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-400">
          <p>{t.pricingNote}</p>
          <p className="mt-1 text-slate-500">{t.pricingFine}</p>
        </div>
      </section>

      {/* Pruebas */}
      <section id="probas" className="relative border-y border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold">{t.proofTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.proofs.map((p) => (
              <div key={p.t} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-2xl font-bold text-brand-300">{p.v}</p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">{p.t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.d}</p>
              </div>
            ))}
          </div>
          <a
            href="/"
            className="mt-8 inline-block rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-400"
          >
            {t.demoCta} →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-3xl font-semibold">{t.faqTitle}</h2>
        <div className="mt-6 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/40">
          {t.faq.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-100">
                {f.q}
                <span aria-hidden className="text-brand-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Formulario */}
      <section id="contacto" className="relative border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold">{t.formTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.formSub}</p>

              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span aria-hidden>✅</span>
                  {lang === "gl"
                    ? "Demo en vivo, sen rexistro"
                    : "Demo en vivo, sin registro"}
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>✅</span>
                  {lang === "gl"
                    ? "Resposta en menos de 24 horas laborables"
                    : "Respuesta en menos de 24 horas laborables"}
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>✅</span>
                  {lang === "gl"
                    ? "Sen compromiso e sen permanencia"
                    : "Sin compromiso y sin permanencia"}
                </li>
              </ul>

              <p className="mt-6 text-xs text-slate-500">{t.privacyNote}</p>

              <div className="mt-6 space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {lang === "gl" ? "Contacto directo" : "Contacto directo"}
                </p>
                <p>
                  <a
                    href="mailto:chessagencyai@gmail.com"
                    className="text-brand-300 hover:underline"
                  >
                    chessagencyai@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:+34607869278" className="text-slate-200 hover:text-white">
                    607 869 278
                  </a>
                  <span className="ml-2 text-slate-500">· Roberto Páramos</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              {status === "ok" ? (
                <div className="py-10 text-center">
                  <span aria-hidden className="text-4xl">
                    ✅
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{t.successTitle}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                    {t.successBody}
                  </p>
                  <a
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
                  >
                    {t.demoCta}
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" noValidate={false}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="concello">
                        {t.fields.concello} *
                      </label>
                      <input
                        id="concello"
                        required
                        className={inputCls}
                        placeholder={t.placeholders.concello}
                        value={form.concello}
                        onChange={(e) => set("concello", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="nome">
                        {t.fields.nome} *
                      </label>
                      <input
                        id="nome"
                        required
                        className={inputCls}
                        placeholder={t.placeholders.nome}
                        value={form.nome}
                        onChange={(e) => set("nome", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="cargo">
                        {t.fields.cargo}{" "}
                        <span className="font-normal normal-case text-slate-500">({t.optional})</span>
                      </label>
                      <input
                        id="cargo"
                        className={inputCls}
                        placeholder={t.placeholders.cargo}
                        value={form.cargo}
                        onChange={(e) => set("cargo", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="email">
                        {t.fields.email} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className={inputCls}
                        placeholder={t.placeholders.email}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="telefono">
                        {t.fields.telefono}{" "}
                        <span className="font-normal normal-case text-slate-500">({t.optional})</span>
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        className={inputCls}
                        placeholder={t.placeholders.telefono}
                        value={form.telefono}
                        onChange={(e) => set("telefono", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="tramo">
                        {t.fields.tramo}
                      </label>
                      <select
                        id="tramo"
                        className={inputCls}
                        value={form.tramo}
                        onChange={(e) => set("tramo", e.target.value)}
                      >
                        <option value="">—</option>
                        {t.tramoOptions.map((o) => (
                          <option key={o.v} value={o.v}>
                            {o.l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="interese">
                      {t.fields.interese}
                    </label>
                    <select
                      id="interese"
                      className={inputCls}
                      value={form.interese}
                      onChange={(e) => set("interese", e.target.value)}
                    >
                      <option value="">—</option>
                      {t.intereseOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="mensaxe">
                      {t.fields.mensaxe}
                    </label>
                    <textarea
                      id="mensaxe"
                      rows={4}
                      className={`${inputCls} resize-y`}
                      placeholder={t.placeholders.mensaxe}
                      value={form.mensaxe}
                      onChange={(e) => set("mensaxe", e.target.value)}
                    />
                  </div>

                  {/* Honeypot anti-spam: invisible para personas */}
                  <div className="hidden" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                    />
                  </div>

                  <label className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900"
                    />
                    <span>
                      {t.consent}{" "}
                      <a href="/aviso-legal" className="text-brand-300 underline hover:text-brand-200">
                        {t.footerLinks.legal}
                      </a>
                    </span>
                  </label>

                  {error && (
                    <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-50"
                  >
                    {status === "sending" ? t.sending : t.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-10 text-center text-xs text-slate-500">
        <div className="mb-4 flex flex-col items-center gap-1">
          <span aria-hidden className="text-2xl">
            🏛️
          </span>
          <p className="text-sm font-bold text-slate-200">VIGO AI ADMINISTRATION</p>
          <p className="text-[11px] font-medium tracking-wide">
            CHESS AI AGENCY · AI · Innovation · Execution
          </p>
        </div>
        <p className="mx-auto max-w-2xl leading-relaxed">{t.footerNote}</p>
        <p className="mt-3">
          <a href="mailto:chessagencyai@gmail.com" className="text-slate-300 hover:text-white">
            chessagencyai@gmail.com
          </a>
          <span className="mx-2 opacity-40">·</span>
          <a href="tel:+34607869278" className="text-slate-300 hover:text-white">
            607 869 278
          </a>
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="/aviso-legal" className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-brand-400">
            {t.footerLinks.legal}
          </a>
          <a href="/" className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-brand-400">
            {t.footerLinks.demo}
          </a>
          <a href="/#inicio" className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-brand-400">
            {t.footerLinks.home}
          </a>
        </div>
        <p className="mt-4 text-[10px] opacity-60">v1.2 — landing concellos · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
