-- Leads table for contact form submissions.
-- Apply via Supabase Dashboard → SQL Editor, or `supabase db push` if using the CLI.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  message text,
  source text default 'contact_form',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Allow anonymous (public) inserts so the website form can submit leads.
-- No SELECT policy is added intentionally — only authenticated dashboard users
-- with service-role access should read submitted leads.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
