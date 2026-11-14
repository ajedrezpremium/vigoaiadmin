// API /api/admin/auth — Autenticación Supabase Auth + RBAC (Semana 2 v1.2)
// POST { email, password } → { accessToken, role, user }
// Si Supabase no está configurado, fallback al token simple (ADMIN_TOKEN).

import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, supabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    // Fallback: token simple (si Supabase no está configurado)
    if (!supabaseConfigured()) {
      const adminToken = process.env.ADMIN_TOKEN;
      if (adminToken && !adminToken.startsWith("TU_TOKEN") && body.token === adminToken) {
        return NextResponse.json({ accessToken: adminToken, role: "admin", user: { email: "admin@demo" } });
      }
      return NextResponse.json({ error: "Supabase no configurado y token inválido" }, { status: 401 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    const client = getServerSupabase();
    if (!client) {
      return NextResponse.json({ error: "Supabase no disponible" }, { status: 503 });
    }

    // Autenticar con Supabase Auth
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.session) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // Obtener rol del usuario
    const { data: roleData } = await client
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id)
      .single();

    const role = roleData?.role ?? "viewer";

    return NextResponse.json({
      accessToken: authData.session.access_token,
      role,
      user: { id: authData.user.id, email: authData.user.email },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error de autenticación" },
      { status: 500 }
    );
  }
}
