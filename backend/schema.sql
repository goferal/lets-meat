-- LET'S MEAT — database schema
-- Run this in Supabase: SQL Editor → New query → paste → Run

-- ============ RAFFLE DIRECTORY ============
create table public.raffles (
  id          uuid primary key default gen_random_uuid(),
  bar         text not null,
  city        text not null,
  state       text not null,          -- 'MN', 'WI', etc.
  day         text,                   -- 'Friday'
  time_slot   text,                   -- '5:30 PM'
  cost        text,                   -- '$1/spin'
  prizes      text,                   -- 'Bacon bundles, ribeyes'
  benefits    text,                   -- 'Youth Hockey'
  org_type    text,                   -- 'VFW', 'Legion', 'Eagles', 'Bar'
  lat         double precision,       -- for the heat map, geocode later
  lng         double precision,
  verified    boolean not null default false,   -- you flip this after checking
  submitted_by text,
  created_at  timestamptz not null default now()
);

-- ============ STORIES (Faces of the Freezer) ============
create table public.stories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,          -- name or nickname
  city        text,
  won         text,                   -- 'Two ribeyes' / 'Nothing, 6 years running'
  story       text not null,
  raffle_tip  text,                   -- optional 'bar, city, day/time'
  approved    boolean not null default false,   -- you flip this to publish
  created_at  timestamptz not null default now()
);

-- ============ ROW LEVEL SECURITY ============
-- Public (anon key) can: submit new rows, and read ONLY verified/approved ones.
-- Only you (dashboard / service role) can see pending submissions or edit.

alter table public.raffles enable row level security;
alter table public.stories enable row level security;

create policy "public can submit raffles"
  on public.raffles for insert
  to anon
  with check (true);

create policy "public reads verified raffles"
  on public.raffles for select
  to anon
  using (verified = true);

create policy "public can submit stories"
  on public.stories for insert
  to anon
  with check (true);

create policy "public reads approved stories"
  on public.stories for select
  to anon
  using (approved = true);

-- ============ OPTIONAL: seed sample raffles ============
-- These are the fictional placeholders from the prototype. Replace with real
-- verified raffles as you collect them. Left unverified so they don't publish.
insert into public.raffles (bar, city, state, day, time_slot, cost, prizes, benefits, org_type)
values
 ('Northside VFW Post','Maple Grove','MN','Friday','5:30 PM','$1/spin','Bacon bundles, ribeyes, pork chop packs','Youth Hockey','VFW'),
 ('Iron Range Tavern','Hibbing','MN','Saturday','3:00 PM','$1/spin','Venison sticks, roasts, brat 10-packs','Fire Relief','Bar'),
 ('Legion Post 44','Eau Claire','WI','Friday','6:00 PM','$2/spin','Full meat packs, cheese curd bonus round','Honor Guard','Legion');
