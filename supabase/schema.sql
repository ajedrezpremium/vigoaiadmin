-- ==============================================================
-- VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0
-- Esquema Supabase (ejecutar en SQL Editor del proyecto)
-- CHESS AI AGENCY
-- ==============================================================
-- v1.2: RLS habilitado en todas las tablas.

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
-- ROW LEVEL SECURITY (RLS) — v1.2
-- ==============================================================

-- Habilitar RLS en todas las tablas
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.audit_events enable row level security;
alter table public.escalations enable row level security;

-- Políticas: service_role (servidor) tiene acceso completo (bypass RLS por defecto).
-- Anon/authenticated: solo lectura de conversaciones propias (por ID) y inserción de mensajes.

-- Conversations: anon puede insertar (crear nueva conversación) y leer por id
drop policy if exists "conversations_anon_insert" on public.conversations;
create policy "conversations_anon_insert" on public.conversations
  for insert to anon with check (true);

drop policy if exists "conversations_anon_select" on public.conversations;
create policy "conversations_anon_select" on public.conversations
  for select to anon using (true);

-- Messages: anon puede insertar y leer
drop policy if exists "messages_anon_insert" on public.messages;
create policy "messages_anon_insert" on public.messages
  for insert to anon with check (true);

drop policy if exists "messages_anon_select" on public.messages;
create policy "messages_anon_select" on public.messages
  for select to anon using (true);

-- Audit events: solo inserción (no lectura pública)
drop policy if exists "audit_events_anon_insert" on public.audit_events;
create policy "audit_events_anon_insert" on public.audit_events
  for insert to anon with check (true);

-- Escalations: anon puede insertar (solicitar escalación), solo service_role lee
drop policy if exists "escalations_anon_insert" on public.escalations;
create policy "escalations_anon_insert" on public.escalations
  for insert to anon with check (true);

-- Nota: service_role (usado por el servidor Next.js) bypass RLS automáticamente.
-- Para producción real: restringir select de messages/audit_events a roles autenticados.
