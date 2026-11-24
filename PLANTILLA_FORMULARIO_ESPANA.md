# Plantilla de formulario · España >50.000

**Para las ciudades que no publican buzón de correo.** El primer contacto se hace por el **formulario oficial de contacto / buzón de alcaldía / solicitud de información** de la sede o la web municipal. Mismo principio que el correo: una demostración, no una venta.

**No usar** formularios de «quejas y reclamaciones» ni de «incidencias»: son para reclamaciones, no para propuestas. Usar los de **contacto, información o buzón de alcaldía**.

---

## 1. Campos del formulario

| Campo | Valor |
|---|---|
| Nombre | Roberto Páramos |
| Entidad / Empresa | CHESS AI AGENCY |
| Correo de respuesta | `chessagencyai@gmail.com` |
| Teléfono | 607 869 278 |
| Asunto (si lo pide) | `Propuesta de demostración · IA para la Administración Local` |

---

## 2. Mensaje (versión estándar, ~130 palabras)

> Buenos días:
>
> Les escribo desde CHESS AI AGENCY para proponerles una demostración práctica y sin compromiso de inteligencia artificial aplicada a la administración local.
>
> La idea es sencilla: que la información pública del Ayuntamiento se pueda consultar en lenguaje natural, con referencias a las fuentes oficiales, y que el sistema derive a una persona cuando no pueda resolver. Ayuda a reducir consultas repetidas y a liberar tiempo del personal, sin sustituir a nadie ni tocar datos personales.
>
> La IA analiza, asiste y propone; las personas supervisan, validan y deciden.
>
> Me gustaría enseñarles una demostración de 30 minutos con información pública de su municipio, para que ustedes valoren si merece la pena seguir.
>
> Pueden ver una muestra aquí: https://ia-administracion-local.vercel.app/campana
>
> Quedo a su disposición.
>
> Roberto Páramos · CHESS AI AGENCY
> 607 869 278 · chessagencyai@gmail.com

---

## 3. Mensaje (versión corta, ~60 palabras, para campos limitados)

> Desde CHESS AI AGENCY proponemos una demostración sin compromiso de IA para la administración local: consultar la información pública del Ayuntamiento en lenguaje natural, con fuentes oficiales y derivación a una persona. La IA asiste; las personas deciden. ¿Podemos enseñarles una demo de 30 minutos con información pública de su municipio? Muestra: https://ia-administracion-local.vercel.app/campana · Roberto Páramos · 607 869 278 · chessagencyai@gmail.com

---

## 4. Reglas

- **Sin** nombre de producto, precio, piloto ni plazo.
- **Sin** mencionar Vigo ni ningún cliente.
- **Sin** adjuntos. El enlace es el neutro `/campana`.
- Un solo formulario por municipio. Nada de enviar a varios buzones a la vez.
- Si el formulario pide categoría, elegir «Información» / «Contacto» / «Alcaldía», nunca «Queja» o «Reclamación».
- Tras enviar, anotar en el CSV: `data_contacto`, `toque=1`, `canal=formulario` y la URL usada.
- **Toque 2 (teléfono) al día 3**, igual que en la campaña de correo. El formulario no genera Resend ID: el seguimiento es telefónico.

---

## 5. URLs de formulario localizadas (comprobadas el 24/11)

Las **15** responden HTTP 200 y son formularios reales (no catálogos ni portadas).

| Municipio | URL de contacto / formulario | Tipo |
|---|---|---|
| Sevilla | https://www.sevilla.org/ayuntamiento/el-ayuntamiento/el-alcalde/contacte-con-el-alcalde | Contacte con el alcalde |
| Murcia | https://web.murcia.es/contacta | Contacto |
| Las Palmas de GC | https://www.laspalmasgc.es/es/otras-secciones/contacto/buzon-alcaldia/ | Buzón de alcaldía |
| Alicante | https://www.alicante.es/es/formularios/formulario-avisos-incidencias-y-solicitud-informacion | Solicitud de información |
| Elche | https://www.elche.es/oficina-municipal-de-atencion-ciudadana-omac/buzon-de-la-ciudadania/ | Buzón de la ciudadanía |
| Sabadell | https://web.sabadell.cat/contacte | Contacto |
| Cartagena | https://www.cartagena.es/contacto.asp | Contacto |
| Móstoles | https://www.mostoles.es/es/ayuntamiento/alcaldia/contacta-alcalde | Contacta con el alcalde |
| Jerez de la Frontera | https://www.jerez.es/contactar-con-la-alcaldesa | Contactar con la alcaldesa |
| Alcalá de Henares | https://www.ayto-alcaladehenares.es/contacto/ | Contacto |
| Valencia | https://www.valencia.es/cas/atencion-ciudadana/consultas-y-solicitudes-de-informacion | Consultas y solicitudes de información |
| Bilbao | https://www.bilbao.eus/cs/Satellite?c=Page&cid=3009011008&language=es&pageid=3009011008&pagename=Bilbaonet%2FPage%2FBIO_formulario | Tu Ayuntamiento te escucha |
| Granada | https://sede.granada.org/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=CONTACTO | Contacto (sede) |
| Badalona | https://seu.badalona.cat/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=CONTACTO | Contacto (sede) |
| Leganés | https://www.leganes.org/w/areas-municipales-consultas-web-formularios | Consultas web · formularios |

**Sin formulario de contacto utilizable → teléfono primero (7):**

| Municipio | Motivo |
|---|---|
| Madrid | Solo «Sugerencias y reclamaciones», «Avisos sobre la ciudad» e «Incidencias informáticas». |
| Santa Cruz de Tenerife | Solo «Sugerencias y Reclamaciones» (sede t261). |
| Terrassa | Web y sede inalcanzables desde este entorno (403 / sin conexión). |
| Almería | WAF bloquea el acceso automatizado («Request Rejected»). |
| Barcelona | El único formulario es la «Bústia de queixes i suggeriments». |
| Valladolid | El contacto redirige al SQI de quejas y sugerencias. |
| Gijón | No publica formulario de contacto operativo (web SPA sin formulario). |

En estas siete, llamar al gabinete/alcaldía, pedir el correo directo y enviar después. No se usa el canal de quejas/reclamaciones.

---

**CHESS AI AGENCY** · 24/11/2026
