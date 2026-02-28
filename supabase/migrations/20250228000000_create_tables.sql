-- projects: 프로젝트
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ideas: 아이디어 (프로젝트별)
create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

-- specifications: 분석 결과 (아이디어별)
create table if not exists public.specifications (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  specs jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- updated_at 트리거
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- RLS 활성화
alter table public.projects enable row level security;
alter table public.ideas enable row level security;
alter table public.specifications enable row level security;

-- projects 정책: 본인 소유 또는 user_id가 null인 행(비로그인)만 접근
create policy "projects_select"
  on public.projects for select
  using (
    (auth.uid() is not null and user_id = auth.uid())
    or (auth.uid() is null and user_id is null)
  );

create policy "projects_insert"
  on public.projects for insert
  with check (
    (auth.uid() is not null and user_id = auth.uid())
    or (auth.uid() is null and user_id is null)
  );

create policy "projects_update"
  on public.projects for update
  using (
    (auth.uid() is not null and user_id = auth.uid())
    or (auth.uid() is null and user_id is null)
  );

create policy "projects_delete"
  on public.projects for delete
  using (
    (auth.uid() is not null and user_id = auth.uid())
    or (auth.uid() is null and user_id is null)
  );

-- ideas 정책: 해당 프로젝트에 대한 권한이 있을 때만
create policy "ideas_select"
  on public.ideas for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = ideas.project_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "ideas_insert"
  on public.ideas for insert
  with check (
    exists (
      select 1 from public.projects p
      where p.id = ideas.project_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "ideas_update"
  on public.ideas for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = ideas.project_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "ideas_delete"
  on public.ideas for delete
  using (
    exists (
      select 1 from public.projects p
      where p.id = ideas.project_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

-- specifications 정책: 해당 idea -> project 권한이 있을 때만
create policy "specifications_select"
  on public.specifications for select
  using (
    exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "specifications_insert"
  on public.specifications for insert
  with check (
    exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "specifications_update"
  on public.specifications for update
  using (
    exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );

create policy "specifications_delete"
  on public.specifications for delete
  using (
    exists (
      select 1 from public.ideas i
      join public.projects p on p.id = i.project_id
      where i.id = specifications.idea_id
        and ((auth.uid() is not null and p.user_id = auth.uid()) or (auth.uid() is null and p.user_id is null))
    )
  );
