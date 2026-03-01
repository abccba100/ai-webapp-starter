-- ============================================================
-- RLS 정책: user_id 기준 본인 데이터만 접근 (insert/select/update 분리)
-- ============================================================

-- ----- projects: 기존 정책 제거 후 재생성 -----
drop policy if exists "projects_select" on public.projects;
drop policy if exists "projects_insert" on public.projects;
drop policy if exists "projects_update" on public.projects;
drop policy if exists "projects_delete" on public.projects;

create policy "projects_select"
  on public.projects for select
  using (auth.uid() is not null and user_id = auth.uid());

create policy "projects_insert"
  on public.projects for insert
  with check (auth.uid() is not null and user_id = auth.uid());

create policy "projects_update"
  on public.projects for update
  using (auth.uid() is not null and user_id = auth.uid());

create policy "projects_delete"
  on public.projects for delete
  using (auth.uid() is not null and user_id = auth.uid());

-- ----- ideas: 기존 정책 제거 후 재생성 -----
drop policy if exists "ideas_select" on public.ideas;
drop policy if exists "ideas_insert" on public.ideas;
drop policy if exists "ideas_update" on public.ideas;
drop policy if exists "ideas_delete" on public.ideas;

create policy "ideas_select"
  on public.ideas for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

create policy "ideas_insert"
  on public.ideas for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

create policy "ideas_update"
  on public.ideas for update
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

create policy "ideas_delete"
  on public.ideas for delete
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

-- ----- specifications: 기존 정책 제거 후 재생성 -----
drop policy if exists "specifications_select" on public.specifications;
drop policy if exists "specifications_insert" on public.specifications;
drop policy if exists "specifications_update" on public.specifications;
drop policy if exists "specifications_delete" on public.specifications;

create policy "specifications_select"
  on public.specifications for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id and p.user_id = auth.uid()
    )
  );

create policy "specifications_insert"
  on public.specifications for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id and p.user_id = auth.uid()
    )
  );

create policy "specifications_update"
  on public.specifications for update
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id and p.user_id = auth.uid()
    )
  );

create policy "specifications_delete"
  on public.specifications for delete
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id and p.user_id = auth.uid()
    )
  );

-- ----- specs: 테이블 생성 + RLS -----
create table if not exists public.specs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  raw_input text not null default '',
  ai_output jsonb not null default '{}',
  revision_count int not null default 0,
  design_locked boolean not null default false,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.specs enable row level security;

create policy "specs_select"
  on public.specs for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

create policy "specs_insert"
  on public.specs for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

create policy "specs_update"
  on public.specs for update
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

create policy "specs_delete"
  on public.specs for delete
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );
