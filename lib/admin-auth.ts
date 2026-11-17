// Autenticación y autorización para panel admin (Semana 2 v1.2)
// Soporta: token simple (ADMIN_TOKEN) y Supabase Auth (Bearer token).

import { getServerSupabase } from "@/lib/supabase";

export interface AdminAuthResult {
  authorized: boolean;
  role: "admin" | "editor" | "viewer" | null;
  userId?: string;
}

export async function checkAdminAuth(req: Request): Promise<AdminAuthResult> {
  // 1. Token simple (backward compat)
  const simpleToken = req.headers.get("x-admin-key");
  const expectedToken = process.env.ADMIN_TOKEN;
  if (expectedToken && !expectedToken.startsWith("TU_TOKEN") && simpleToken === expectedToken) {
    return { authorized: true, role: "admin" };
  }

  // 2. Supabase Auth (Bearer token)
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const client = getServerSupabase();
    if (!client) return { authorized: false, role: null };

    try {
      const { data: { user }, error } = await client.auth.getUser(token);
      if (error || !user) return { authorized: false, role: null };

      const { data: roleData } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      const role = (roleData?.role as "admin" | "editor" | "viewer") ?? "viewer";
      return { authorized: true, role, userId: user.id };
    } catch {
      return { authorized: false, role: null };
    }
  }

  // 3. Demo mode (sin auth configurada)
  if (!expectedToken || expectedToken.startsWith("TU_TOKEN")) {
    return { authorized: true, role: "admin" };
  }

  return { authorized: false, role: null };
}

export function hasRole(auth: AdminAuthResult, required: "admin" | "editor" | "viewer"): boolean {
  if (!auth.authorized || !auth.role) return false;
  const hierarchy: Record<string, number> = { viewer: 0, editor: 1, admin: 2 };
  return (hierarchy[auth.role] ?? 0) >= (hierarchy[required] ?? 0);
}

/**
 * true cuando ADMIN_TOKEN no está configurado (o sigue con el valor de ejemplo)
 * y por tanto el panel funciona en modo demostración sin autenticación real.
 * Las rutas que envían correo deben cerrarse en ese caso: si no, cualquiera
 * podría usar nuestro dominio verificado para enviar spam.
 */
export function isDemoAdminMode(): boolean {
  const token = process.env.ADMIN_TOKEN;
  return !token || token.startsWith("TU_TOKEN");
}
