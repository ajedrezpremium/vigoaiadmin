// Rate limiting simple en memoria (Megaprompt §9, §10)
// Demo: suficiente para el widget público. Producción: Redis/edge middleware.

const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQ = 10; // peticiones por IP y ventana

const hits = new Map<string, number[]>();

export function rateLimit(ip: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_REQ) {
    const oldest = list[0];
    return { ok: false, retryAfterSec: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }
  list.push(now);
  hits.set(ip, list);
  // limpieza perezosa
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return { ok: true, retryAfterSec: 0 };
}
