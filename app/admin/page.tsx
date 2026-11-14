"use client";

// Panel interno de demostración — Megaprompt §6 (módulos A/D/F, versión demo)
// Autenticación por token simple o Supabase Auth + RBAC.

import { useState } from "react";

interface Stats {
  totalMessages: number;
  totalAssistant: number;
  agentCounts: Record<string, number>;
  providerCounts: Record<string, number>;
  recentQuestions: { content: string; created_at: string }[];
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"token" | "supabase">("token");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError(null);
    try {
      let res: Response;
      if (authMode === "token") {
        res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } else {
        res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setAccessToken(data.accessToken);
      setRole(data.role);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de autenticación");
      setAccessToken(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setAccessToken(null);
    setRole(null);
    setStats(null);
    setError(null);
    setToken("");
    setEmail("");
    setPassword("");
  }

  function authHeaders(): HeadersInit {
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}`, "x-admin-key": accessToken };
    }
    return { "x-admin-key": token };
  }

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setStats(data as Stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  const isLoggedIn = Boolean(accessToken || (token && !token.startsWith("TU_TOKEN")));

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-brand-400">
        VIGO AI ADMINISTRATION · módulo interno (demo)
      </p>
      <h1 className="mt-1 text-3xl font-bold">Panel de administración</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Vista demo de los módulos A (Overview) y D (Analytics). Autenticación por token o Supabase Auth + RBAC.
      </p>

      {!isLoggedIn ? (
        <div className="mt-8 space-y-4 rounded-xl border border-slate-700 bg-slate-900/60 p-6">
          <div className="flex gap-2">
            <button
              onClick={() => setAuthMode("token")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                authMode === "token"
                  ? "bg-brand-600 text-white"
                  : "border border-slate-600 text-slate-300 hover:border-brand-400"
              }`}
            >
              Token simple
            </button>
            <button
              onClick={() => setAuthMode("supabase")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                authMode === "supabase"
                  ? "bg-brand-600 text-white"
                  : "border border-slate-600 text-slate-300 hover:border-brand-400"
              }`}
            >
              Supabase Auth
            </button>
          </div>

          {authMode === "token" ? (
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ADMIN_TOKEN"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
          ) : (
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
            </div>
          )}

          <button
            onClick={login}
            disabled={loading}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold hover:bg-brand-500 disabled:opacity-40"
          >
            {loading ? "Autenticando…" : "Iniciar sesión"}
          </button>

          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              Rol: {role ?? "admin"} {accessToken ? "(Supabase Auth)" : "(token)"}
            </span>
            <button
              onClick={load}
              disabled={loading}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold hover:bg-brand-500 disabled:opacity-40"
            >
              {loading ? "Cargando…" : "Ver estadísticas"}
            </button>
            <button
              onClick={logout}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:border-brand-400"
            >
              Cerrar sesión
            </button>
            <a href="/" className="text-xs text-slate-400 hover:text-slate-200">
              ← volver a la demo
            </a>
          </div>

          {error && (
            <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {stats && (
            <div className="mt-8 space-y-8 animate-fade-up">
              <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase text-slate-400">Mensajes totales</p>
                  <p className="mt-1 text-3xl font-bold">{stats.totalMessages}</p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase text-slate-400">Respuestas de agentes</p>
                  <p className="mt-1 text-3xl font-bold">{stats.totalAssistant}</p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase text-slate-400">Proveedores IA</p>
                  <ul className="mt-2 space-y-0.5 text-sm">
                    {Object.entries(stats.providerCounts).map(([p, c]) => (
                      <li key={p} className="flex justify-between gap-4 text-slate-300">
                        <span className="truncate">{p}</span>
                        <span className="font-semibold">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold">Actividad por agente</h2>
                <div className="space-y-2">
                  {Object.entries(stats.agentCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([agent, count]) => (
                      <div key={agent} className="flex items-center gap-3">
                        <span className="w-36 truncate text-sm text-slate-300">{agent}</span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{
                              width: `${Math.round((count / (stats.totalAssistant || 1)) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-right text-sm font-semibold">{count}</span>
                      </div>
                    ))}
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold">Últimas consultas ciudadanas</h2>
                <ul className="divide-y divide-slate-800 rounded-xl border border-slate-700 bg-slate-900/40">
                  {stats.recentQuestions.map((q, i) => (
                    <li key={i} className="px-4 py-2.5 text-sm">
                      <p className="text-slate-200">{q.content}</p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(q.created_at).toLocaleString("es-ES")}
                      </p>
                    </li>
                  ))}
                  {stats.recentQuestions.length === 0 && (
                    <li className="px-4 py-3 text-sm text-slate-500">
                      Aún no hay consultas registradas en Supabase.
                    </li>
                  )}
                </ul>
              </section>
            </div>
          )}
        </>
      )}
    </main>
  );
}
