# Lotes de envío de la campaña

Cada archivo es una lista JSON que consume `scripts/send-batch.mjs`:

```powershell
node --experimental-strip-types scripts/send-batch.mjs --file campaign/batches/2026-11-19.json            # simulación
node --experimental-strip-types scripts/send-batch.mjs --file campaign/batches/2026-11-19.json --commit   # envío real
```

## Formato

```json
[{ "concello": "Bueu", "email": "concello@concellodebueu.gal", "idioma": "gl", "tramo": "B" }]
```

- **Máximo 10 destinatarios por archivo** (límite de campaña: 10 correos/día desde el mismo buzón).
- `idioma`: `gl` por defecto; `es` solo si el concello lo pide o es de fuera del ámbito lingüístico.
- `tramo`: A, B, C o D (informativo; no cambia la plantilla de fase 1). En la campaña 2 se usa `CIUDADE`.
- Un solo destinatario por concello en el primer contacto.
- BCC de control a `gmparamos@gmail.com` por defecto.

## Registro

| Archivo | Fecha | Contenido |
|---|---|---|
| `2026-11-18.json` | 18/11/2026 | 10 concellos del segmento B (enviado, 10/10 `delivered`) |
| `2026-11-19.json` | 19/11/2026 | 5 restantes del segmento B + 5 primeros del C (enviado: 9/10 `delivered`, Caldas rebotado) |
| `2026-11-23.json` | 23/11/2026 | 8 restantes del C + 2 primeros del D (preparado) |
| `2026-11-27.json` | 27/11/2026 | Campaña 2: Ourense, Santiago de Compostela y Lugo (preparado, 3/10 del cupo) |

El detalle de envíos, con identificadores de Resend, está en `CAMPANA_EJECUCION.md` §15.
