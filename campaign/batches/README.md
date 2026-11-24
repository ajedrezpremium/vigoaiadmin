# Lotes de envío de la campaña

Cada archivo es una lista JSON que consume `scripts/send-batch.mjs`:

```powershell
node --experimental-strip-types scripts/send-batch.mjs --file campaign/batches/2026-11-30.json            # simulación
node --experimental-strip-types scripts/send-batch.mjs --file campaign/batches/2026-11-30.json --commit   # envío real
```

## Formato

```json
[{ "concello": "Bueu", "email": "concello@concellodebueu.gal", "idioma": "gl", "tramo": "B" }]
```

- **Máximo 10 destinatarios por archivo** (límite de campaña: 10 correos/día desde el mismo buzón).
- `idioma`: `gl` por defecto; `es` para la campaña de España >50.000 o si el concello lo pide.
- `tramo`: A, B, C o D (campaña de Pontevedra); `CIUDADE`, `G20` o `EXT` en la campaña 2.
- Un solo destinatario por concello en el primer contacto.
- BCC de control a `gmparamos@gmail.com` por defecto.

## Registro

| Archivo | Fecha | Contenido | Estado |
|---|---|---|---|
| `2026-11-18.json` | 18/11/2026 | 10 concellos del segmento B | Enviado, 10/10 `delivered` |
| `2026-11-19.json` | 19/11/2026 | 5 restantes del B + 5 primeros del C | Enviado, 9/10 `delivered` (Caldas rebotado y reenviado) |
| `2026-11-23.json` | 23/11/2026 | 8 restantes del C + 2 primeros del D | Enviado, 10/10 `delivered` |
| `2026-11-24.json` | — | 10 del segmento D | **Aparcado hasta enero de 2027** |
| `2026-11-25.json` | — | 10 del segmento D | **Aparcado hasta enero de 2027** |
| `2026-11-26.json` | — | Mondariz-Balneario | **Aparcado hasta enero de 2027** |
| `2026-11-30.json` | 30/11/2026 | 3 ciudades + 7 de A Coruña (G20) | Preparado y simulado, 10/10 del cupo |
| `2026-12-01.json` | 01/12/2026 | Culleredo, Ribeira y Cambre (G20) | Preparado y simulado, 3/10 del cupo |
| `2026-12-02.json` | 02/12/2026 | Extensión 10–20k de Ourense | Preparado y simulado, 4/10 del cupo |
| `2026-12-09.json` | 09/12/2026 | España >50k · ES-1 con buzón: Zaragoza, Málaga, Palma | Preparado y simulado, 3 correos (formularios aparte) |
| `2026-12-10.json` | 10/12/2026 | España >50k · ES-2 con buzón: Córdoba, L'Hospitalet, Vitoria | Preparado y simulado, 3 correos (formularios aparte) |
| `2026-12-11.json` | 11/12/2026 | España >50k · ES-3 con buzón: Oviedo, Pamplona | Preparado y simulado, 2 correos (formularios aparte) |

Los lotes del 24, 25 y 26/11 **no se envían en noviembre**: la campaña se pausa del 24 al 27/11 y los 21 concellos pequeños de Pontevedra pasan a enero. Se conservan como referencia y se reprogramarán con fecha nueva.

**España >50k:** los 8 municipios con buzón van por correo (lotes de arriba). De las 22 ciudades sin buzón, **15 van por formulario oficial** (manual, sin Resend) y **7 a teléfono primero** (Madrid, Santa Cruz de Tenerife, Terrassa, Almería, Barcelona, Valladolid y Gijón); ver `PLANTILLA_FORMULARIO_ESPANA.md`, `LLAMADAS_ESPANA_50K.md` y `CONTACTOS_ESPANA_50K.csv`.

El detalle de envíos, con identificadores de Resend, está en `CAMPANA_EJECUCION.md` §15.
