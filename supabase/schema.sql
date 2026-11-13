-- ==============================================================
-- VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0
-- Esquema Supabase (ejecutar en SQL Editor del proyecto)
-- CHESS AI AGENCY
-- ==============================================================

-- Conversaciones (sin datos personales en demo)
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  language text not null default 'es',
  demo boolean not null default true
);

-- Mensajes de cada conversación
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  agent text,
  content text not null,
  provider text,
  model text,
  sources jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation
  on public.messages(conversation_id);

-- Eventos de auditoría (capa de control transversal — ver Megaprompt §3)
create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Escalaciones a personal municipal (Human-in-the-Loop — PRO AGENT)
create table if not exists public.escalations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agent text,
  context jsonb,
  status text not null default 'open',
  language text not null default 'es'
);

create index if not exists idx_escalations_created
  on public.escalations(created_at);

-- ==============================================================
-- NOTAS DE SEGURIDAD (DEMO):
-- - En la demo solo se registran datos sintéticos/no personales.
-- - El servidor usa SUPABASE_SERVICE_ROLE_KEY (bypassa RLS).
--   No exponer esa clave al cliente.
-- - En producción real: habilitar RLS, roles RBAC, retención y
--   evaluación RGPD/ENS/AI Act antes de cualquier dato real (ver propuesta §7).
-- ==============================================================
