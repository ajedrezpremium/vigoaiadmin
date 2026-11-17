"use client";

// Landing de campaña — IA para la Administración Local.
// Versión "neutra" de /ayuntamientos para los correos de primer contacto:
//   · sin marca de producto (no aparece "VIGO" en ningún sitio)
//   · sin precios ni tramos económicos
//   · sin la palabra "piloto" ni plazos comerciales
// Mantiene lo que sí vende en frío: capacidades, garantías y formulario de demo.

import { useState } from "react";

type Lang2 = "gl" | "es";

const COPY = {
  gl: {
    brand: ["CHESS AI", "AGENCY"],
    brandSub: "Intelixencia Artificial para a Administración Local",
    nav: { inclue: "Que inclúe", como: "Como traballamos", garantias: "Garantías", contacto: "Contacto" },
    ctaNav: "Solicitar demostración",
    heroTag: "Para concellos e entidades locais",
    h1first: "A información municipal,",
    h1second: "a unha pregunta de distancia.",
    heroSub:
      "Asistencia de IA para o persoal municipal: responde con fontes citadas, redacta borradores e transcribe reunións. En galego e castelán, cos datos baixo control do concello.",
    ctaPrimary: "Solicitar unha demostración",
    ctaSecondary: "Ver que inclúe",
    heroNote: "Demostración práctica · sen compromiso · con datos sintéticos",
    badges: ["Datos aloxados na UE", "RGPD · ENS · AI Act", "Galego e castelán"],
    featuresTitle: "Que inclúe",
    featuresSub:
      "Unha base común que se configura co concello en 48 horas. Sen desenvolvemento a medida nin dependencia dun único provedor.",
    features: [
      {
        icon: "⚖️",
        t: "Consulta normativa",
        d: "Responde sobre ordenanzas, subvencións e procedementos citando o documento orixinal.",
      },
      {
        icon: "📝",
        t: "Borradores de informes",
        d: "Xera borradores con plantillas municipais. A persoa sempre revisa, axusta e asina.",
      },
      {
        icon: "🗂️",
        t: "Arquivo e OCR",
        d: "Localiza documentos dixitalizados e extrae o texto para poder buscalo.",
      },
      {
        icon: "🎙️",
        t: "Voz e transcrición",
        d: "Transcribe reunións e le as respostas en voz alta, en galego e castelán.",
      },
      {
        icon: "🏛️",
        t: "Axentes por área",
        d: "Cidadanía, administración, urbanismo, comercio, cultura, servizos sociais e máis.",
      },
      {
        icon: "🔒",
        t: "Panel e auditoría",
        d: "Métricas de uso, rexistro de eventos e control de acceso por roles.",
      },
    ],
    howTitle: "Como traballamos",
    howSub: "Do primeiro contacto á medición, sen sorpresas.",
    steps: [
      {
        t: "Diagnóstico de 30 minutos",
        d: "Vemos que documentación hai e eliximos un caso de uso que se poida medir.",
      },
      {
        t: "Configuración en 48 horas",
        d: "Corpus do concello, identidade visual e idiomas. Sen desenvolvemento a medida.",
      },
      {
        t: "Proba controlada nunha área",
        d: "Unha unidade real, con documentación real e criterios acordados por escrito.",
      },
      {
        t: "Decisión con datos",
        d: "Ao rematar entregamos os resultados. A continuidade decídea o concello.",
      },
    ],
    guarTitle: "Garantías",
    guarSub: "O principio é sinxelo: a IA analiza, asiste e propón; as persoas deciden.",
    guarantees: [
      {
        t: "Supervisión humana",
        d: "Ningunha decisión administrativa, validación ou sinatura é automática.",
      },
      {
        t: "Fontes citadas",
        d: "Cada resposta remite ao documento municipal do que sae a información.",
      },
      {
        t: "Protección de datos",
        d: "Criterios de RGPD, adecuación ao ENS e ao Regulamento Europeo de IA segundo o caso.",
      },
      {
        t: "Infraestrutura na UE",
        d: "Aloxamento europeo e opción de despregamento no CPD do concello.",
      },
    ],
    formTitle: "Solicitar unha demostración",
    formSub:
      "Contamos en 24 horas laborables. Podemos facela en liña, en 30 minutos, con datos sintéticos.",
    fields: {
      concello: "Concello",
      nome: "Nome e apelidos",
      cargo: "Cargo",
      email: "Correo electrónico",
      telefono: "Teléfono",
      tramo: "Tamaño do concello",
      interese: "Área de interese",
      mensaxe: "Que necesitades?",
    },
    placeholders: {
      concello: "Concello de…",
      nome: "Nome",
      cargo: "Secretaría, urbanismo, informática…",
      email: "nome@concellovila.gal",
      telefono: "986 000 000",
      mensaxe: "Ex.: temos os expedientes de licencias sen indexar…",
    },
    optional: "opcional",
    tramoOptions: [
      { v: "A", l: "Máis de 20.000 habitantes" },
      { v: "B", l: "Entre 10.000 e 20.000" },
      { v: "C", l: "Entre 5.000 e 10.000" },
      { v: "D", l: "Menos de 5.000" },
    ],
    intereseOptions: [
      "Información municipal e normativa",
      "Borradores e informes",
      "Atención á cidadanía",
      "Transcrición de reunións",
      "Arquivo e documentación antiga",
      "Outra área",
    ],
    consent:
      "Autorizo o tratamento dos meus datos para que CHESS AI AGENCY responda a esta solicitude,",
    submit: "Enviar solicitude",
    sending: "Enviando…",
    formError: "Non puidemos enviar a solicitude. Téntao de novo nun minuto.",
    successTitle: "Solicitude recibida",
    successBody:
      "Grazas. Respondemos en menos de 24 horas laborables e propoñemos dúas datas para a demostración.",
    contactTitle: "Contacto directo",
    footerNote:
      "CHESS AI AGENCY · Solucións profesionais de Intelixencia Artificial para a Administración Local.",
    footerLinks: { legal: "Aviso legal" },
  },
  es: {
    brand: ["CHESS AI", "AGENCY"],
    brandSub: "Inteligencia Artificial para la Administración Local",
    nav: { inclue: "Qué incluye", como: "Cómo trabajamos", garantias: "Garantías", contacto: "Contacto" },
    ctaNav: "Solicitar demostración",
    heroTag: "Para ayuntamientos y entidades locales",
    h1first: "La información municipal,",
    h1second: "a una pregunta de distancia.",
    heroSub:
      "Asistencia de IA para el personal municipal: responde con fuentes citadas, redacta borradores y transcribe reuniones. En gallego y castellano, con los datos bajo control del ayuntamiento.",
    ctaPrimary: "Solicitar una demostración",
    ctaSecondary: "Ver qué incluye",
    heroNote: "Demostración práctica · sin compromiso · con datos sintéticos",
    badges: ["Datos alojados en la UE", "RGPD · ENS · AI Act", "Gallego y castellano"],
    featuresTitle: "Qué incluye",
    featuresSub:
      "Una base común que se configura con el ayuntamiento en 48 horas. Sin desarrollo a medida ni dependencia de un único proveedor.",
    features: [
      {
        icon: "⚖️",
        t: "Consulta normativa",
        d: "Responde sobre ordenanzas, subvenciones y procedimientos citando el documento original.",
      },
      {
        icon: "📝",
        t: "Borradores de informes",
        d: "Genera borradores con plantillas municipales. La persona siempre revisa, ajusta y firma.",
      },
      {
        icon: "🗂️",
        t: "Archivo y OCR",
        d: "Localiza documentos digitalizados y extrae el texto para poder buscarlo.",
      },
      {
        icon: "🎙️",
        t: "Voz y transcripción",
        d: "Transcribe reuniones y lee las respuestas en voz alta, en gallego y castellano.",
      },
      {
        icon: "🏛️",
        t: "Agentes por área",
        d: "Ciudadanía, administración, urbanismo, comercio, cultura, servicios sociales y más.",
      },
      {
        icon: "🔒",
        t: "Panel y auditoría",
        d: "Métricas de uso, registro de eventos y control de acceso por roles.",
      },
    ],
    howTitle: "Cómo trabajamos",
    howSub: "Del primer contacto a la medición, sin sorpresas.",
    steps: [
      {
        t: "Diagnóstico de 30 minutos",
        d: "Vemos qué documentación hay y elegimos un caso de uso que se pueda medir.",
      },
      {
        t: "Configuración en 48 horas",
        d: "Corpus del ayuntamiento, identidad visual e idiomas. Sin desarrollo a medida.",
      },
      {
        t: "Prueba controlada en un área",
        d: "Una unidad real, con documentación real y criterios acordados por escrito.",
      },
      {
        t: "Decisión con datos",
        d: "Al terminar entregamos los resultados. La continuidad la decide el ayuntamiento.",
      },
    ],
    guarTitle: "Garantías",
    guarSub: "El principio es sencillo: la IA analiza, asiste y propone; las personas deciden.",
    guarantees: [
      {
        t: "Supervisión humana",
        d: "Ninguna decisión administrativa, validación o firma es automática.",
      },
      {
        t: "Fuentes citadas",
        d: "Cada respuesta remite al documento municipal del que sale la información.",
      },
      {
        t: "Protección de datos",
        d: "Criterios de RGPD, adecuación al ENS y al Reglamento Europeo de IA según el caso.",
      },
      {
        t: "Infraestructura en la UE",
        d: "Alojamiento europeo y opción de despliegue en el CPD del ayuntamiento.",
      },
    ],
    formTitle: "Solicitar una demostración",
    formSub:
      "Contestamos en 24 horas laborables. Podemos hacerla en línea, en 30 minutos, con datos sintéticos.",
    fields: {
      concello: "Ayuntamiento",
      nome: "Nombre y apellidos",
      cargo: "Cargo",
      email: "Correo electrónico",
      telefono: "Teléfono",
      tramo: "Tamaño del ayuntamiento",
      interese: "Área de interés",
      mensaxe: "¿Qué necesitáis?",
    },
    placeholders: {
      concello: "Ayuntamiento de…",
      nome: "Nombre",
      cargo: "Secretaría, urbanismo, informática…",
      email: "nombre@ayuntamiento.es",
      telefono: "986 000 000",
      mensaxe: "Ej.: tenemos los expedientes de licencias sin indexar…",
    },
    optional: "opcional",
    tramoOptions: [
      { v: "A", l: "Más de 20.000 habitantes" },
      { v: "B", l: "Entre 10.000 y 20.000" },
      { v: "C", l: "Entre 5.000 y 10.000" },
      { v: "D", l: "Menos de 5.000" },
    ],
    intereseOptions: [
      "Información municipal y normativa",
      "Borradores e informes",
      "Atención a la ciudadanía",
      "Transcripción de reuniones",
      "Archivo y documentación antigua",
      "Otra área",
    ],
    consent:
      "Autorizo el tratamiento de mis datos para que CHESS AI AGENCY responda a esta solicitud,",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    formError: "No hemos podido enviar la solicitud. Inténtalo de nuevo en un minuto.",
    successTitle: "Solicitud recibida",
    successBody:
      "Gracias. Respondemos en menos de 24 horas laborables y proponemos dos fechas para la demostración.",
    contactTitle: "Contacto directo",
    footerNote:
      "CHESS AI AGENCY · Soluciones profesionales de Inteligencia Artificial para la Administración Local.",
    footerLinks: { legal: "Aviso legal" },
  },
} as const;

const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-400";
const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400";

export default function CampanaLanding() {
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
          orixe: "landing_campana",
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
        className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,80,235,0.22),transparent)]"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <a href="#inicio" className="flex flex-col leading-tight">
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden className="text-xl">
                🏛️
              </span>
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                {t.brand[0]}
              </span>
              <span className="text-slate-400">{t.brand[1]}</span>
            </span>
            <span className="ml-7 text-[10px] font-medium text-slate-400">{t.brandSub}</span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Secciones">
            <a href="#inclue" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.inclue}
            </a>
            <a href="#como" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.como}
            </a>
            <a href="#garantias" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-200">
              {t.nav.garantias}
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
              href="#contacto"
              className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-500"
            >
              {t.ctaNav}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">{t.heroTag}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          {t.h1first}
          <br />
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            {t.h1second}
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{t.heroSub}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contacto"
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#inclue"
            className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-brand-400"
          >
            {t.ctaSecondary}
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-500">{t.heroNote}</p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {t.badges.map((b) => (
            <li
              key={b}
              className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-slate-300"
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Qué incluye */}
      <section id="inclue" className="relative border-t border-slate-800/70 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.featuresTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{t.featuresSub}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f) => (
              <article key={f.t} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <span aria-hidden className="text-2xl">
                  {f.icon}
                </span>
                <h3 className="mt-3 font-semibold text-slate-100">{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section id="como" className="relative border-t border-slate-800/70 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.howTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{t.howSub}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {t.steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-100">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Garantías */}
      <section id="garantias" className="relative border-t border-slate-800/70 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.guarTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{t.guarSub}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.guarantees.map((g) => (
              <article key={g.t} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                <h3 className="text-sm font-semibold text-emerald-200">{g.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{g.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="contacto" className="relative border-t border-slate-800/70 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t.formTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.formSub}</p>
            <div className="mt-6 space-y-1.5 text-sm text-slate-400">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {t.contactTitle}
              </p>
              <p>
                <a href="mailto:chessagencyai@gmail.com" className="text-brand-300 hover:underline">
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
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">{t.successBody}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
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
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-10 text-center text-xs text-slate-500">
        <div className="mb-4 flex flex-col items-center gap-1">
          <span aria-hidden className="text-2xl">
            🏛️
          </span>
          <p className="text-sm font-bold text-slate-200">CHESS AI AGENCY</p>
          <p className="text-[11px] font-medium tracking-wide">AI · Innovation · Execution</p>
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
          <a
            href="/aviso-legal"
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:border-brand-400"
          >
            {t.footerLinks.legal}
          </a>
        </div>
        <p className="mt-4 text-[10px] opacity-60">{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
