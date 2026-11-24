# Seguimiento global · CHESS AI AGENCY + IA Administración Local

**Generado:** 2026-11-24 10:08 · **Fuente:** Supabase del CRM (`okdeqt…`) · **Vista:** `crm.html`

## 1. Portfolio de proyectos (27)

| Nivel | Proyecto | Clave |
|---:|---|---|
| 10 | ChessOrganizers.com | `chessorganizers-com` |
| 9 | Chess & Maths | `chess-maths` |
| 9 | Chess Teacher | `chess-teacher` |
| 9 | Chess Trainer | `chess-trainer` |
| 7 | Chess Art | `chess-art` |
| 7 | Dimilano | `dimilano` |
| 7 | Ferreproxim | `ferreproxim` |
| 7 | Padel Organizers | `padel-organizers` |
| 7 | Piratas de Nabia | `piratas-de-nabia` |
| 7 | Psychology | `psychology` |
| 6 | Chess AI Games | `chess-ai-games` |
| 6 | Football AI | `football-ai` |
| 6 | GM Chess Academy Premium | `gm-chess-academy-premium` |
| 6 | Hotel CEMAR | `hotel-cemar` |
| 6 | Puerto de Vigo AI | `puerto-de-vigo-ai` |
| 6 | Vigo AI Campus | `vigo-ai-campus` |
| 5 | Chess AI Publisher | `chess-ai-publisher` |
| 5 | ChessOrganizers Pro | `chessorganizers-pro` |
| 4 | Chess Invest | `chess-invest` |
| 4 | Chiño AI | `chino-ai` |
| 4 | GM Chess | `gm-chess` |
| 4 | Rotelu | `rotelu` |
| 4 | Sports Genius AI | `sports-genius-ai` |
| 3 | Chess Arbiter AI | `chess-arbiter-ai` |
| 3 | Chess Bets | `chess-bets` |
| 3 | Chess IA | `chess-ia` |
| 3 | Politics AI | `politics-ai` |

> Nivel 1 = DEMO … 10 = PRODUCTO. La campaña de IA Administración Local se sigue en el pipeline (§2), no como nivel de producto.

## 2. Pipeline de la campaña (87 oportunidades)

| Estado | Nº |
|---|---:|
| contact | 39 |
| lead | 47 |
| negotiation | 1 |

**Por proyecto:**
- IA Administración Local: 86
- VIGO AI ADMINISTRATION: 1

**Vigo (piloto):** Vigo · negotiation · 12500 €

## 3. Envíos registrados (40)

| Campaña | Envíos |
|---|---:|
| ia-admin-local-pontevedra | 39 |
| vigo-piloto | 1 |

## 4. Cómo se actualiza

- Contactos y estado: CSV de este repo (`CONTACTOS_*.csv`).
- Compartir con el CRM: `node scripts/crm-sync.mjs --commit`.
- Este informe: `node scripts/crm-report.mjs --md`.
- Vista interactiva: `crm.html` del proyecto CHESS AI AGENCY (login con token de admin).

## 5. Agenda compartida (pestaña Agenda del CRM)

La campaña tiene una agenda única que se ve en el CRM y se versiona aquí.

| Pieza | Dónde |
|---|---|
| Fuente de verdad | `campaign/agenda.json` (35 eventos, 30/11/2026 → 11/01/2027) |
| Tabla del CRM | `campaign_agenda` en el Supabase `okdeqt…` (solo lectura con anon) |
| Sincronización | `node scripts/crm-agenda-sync.mjs --commit` |
| Vista | `https://agency.ajedrezpremium.com/crm.html` → pestaña **Agenda** |

La pestaña Agenda filtra por campaña (`galicia-20k`, `espana-50k`, `pontevedra-enero`) y por estado, y muestra los contadores de acciones, pendientes, hechas y próximos 7 días. La tabla se creó el 24/11/2026 con política de solo lectura para `anon`; la escritura va con `service_role` desde el script.

**Mantenimiento diario** (la tabla nunca se toca a mano):

```bash
node scripts/crm-agenda-sync.mjs --list                     # ver lo pendiente
node scripts/crm-agenda-sync.mjs --done gal-2026-11-30-envio # marcar hecho y sincronizar
node scripts/crm-agenda-sync.mjs --move <id>=2026-12-03      # cambiar fecha y sincronizar
node scripts/crm-agenda-sync.mjs --commit                    # subir cambios ya editados a mano
```

Las órdenes `--done` y `--move` actualizan `campaign/agenda.json` y sincronizan en el mismo paso; después hay que reflejar el cambio en `AGENDA_CAMPANA.md` y hacer commit.

**Regla:** cuando cambie una fecha, se edita `campaign/agenda.json`, se sincroniza y se refleja también en `AGENDA_CAMPANA.md`. Nunca se edita la tabla a mano.
