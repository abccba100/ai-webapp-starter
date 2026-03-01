# Supabase RLS 정책 점검

현재 테이블 구조 기준으로 RLS 정책을 점검하고, **user_id 기준 본인 데이터만** 접근 가능하도록 insert / select / update 정책을 분리한 SQL을 정리했습니다.

---

## 1. 테이블 구조 요약

| 테이블 | user 연결 | 비고 |
|--------|-----------|------|
| `projects` | `user_id` (직접) | 본인 행만 접근 |
| `ideas` | `project_id` → `projects.user_id` | 프로젝트 소유자만 |
| `specifications` | `idea_id` → `ideas` → `projects.user_id` | 프로젝트 소유자만 |
| `specs` | `project_id` → `projects.user_id` | 프로젝트 소유자만 |

---

## 2. 현재 상태 점검

### 2.1 `projects` (기존 마이그레이션)

- **현재**: `user_id = auth.uid()` **또는** (`auth.uid() is null` 이고 `user_id is null`)  
  → 비로그인 시 `user_id is null`인 행도 조회/삽입/수정 가능.
- **요구사항 반영**: 본인만 접근하려면 **로그인 필수**, `user_id = auth.uid()` 만 허용해야 함.

### 2.2 `ideas`, `specifications`

- **현재**: 해당 `project`의 `user_id = auth.uid()` 또는 `user_id is null`일 때만 접근 가능.
- **요구사항 반영**: 프로젝트 소유자만 접근하므로, **프로젝트의 `user_id = auth.uid()`** 조건만 사용하는 것이 맞음 (비로그인 접근 제거).

### 2.3 `specs`

- **현재**: 마이그레이션에 테이블 및 RLS 없음.
- **조치**: 테이블 생성 후, `project_id` → `projects.user_id = auth.uid()` 로 본인 데이터만 허용하는 정책 추가.

---

## 3. 적용할 RLS 원칙

- **projects**: `user_id = auth.uid()` 인 행만 select / insert / update (본인만).
- **ideas**: `project_id`가 “`user_id = auth.uid()` 인 project”인 행만 select / insert / update.
- **specifications**: `idea_id`가 그런 project에 속한 idea인 행만 select / insert / update.
- **specs**: `project_id`가 “`user_id = auth.uid()` 인 project”인 행만 select / insert / update.

insert/select/update는 아래처럼 **연산별로 정책을 분리**했습니다.

---

## 4. SQL 정책 문장 (테이블·연산별)

### 4.1 `projects`

```sql
-- SELECT: 본인 프로젝트만
create policy "projects_select"
  on public.projects for select
  using (auth.uid() is not null and user_id = auth.uid());

-- INSERT: 본인 user_id로만 생성
create policy "projects_insert"
  on public.projects for insert
  with check (auth.uid() is not null and user_id = auth.uid());

-- UPDATE: 본인 프로젝트만
create policy "projects_update"
  on public.projects for update
  using (auth.uid() is not null and user_id = auth.uid());

-- DELETE: 본인 프로젝트만 (필요 시)
create policy "projects_delete"
  on public.projects for delete
  using (auth.uid() is not null and user_id = auth.uid());
```

### 4.2 `ideas`

```sql
-- SELECT: 본인 프로젝트의 아이디어만
create policy "ideas_select"
  on public.ideas for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

-- INSERT: 본인 프로젝트에만 생성
create policy "ideas_insert"
  on public.ideas for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

-- UPDATE: 본인 프로젝트의 아이디어만
create policy "ideas_update"
  on public.ideas for update
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );

-- DELETE: 본인 프로젝트의 아이디어만 (필요 시)
create policy "ideas_delete"
  on public.ideas for delete
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = ideas.project_id and p.user_id = auth.uid()
    )
  );
```

### 4.3 `specifications`

```sql
-- SELECT: 본인 프로젝트 체인(idea → project)인 경우만
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

-- INSERT: 본인 프로젝트의 idea에만 생성
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

-- UPDATE: 본인 프로젝트 체인인 경우만
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

-- DELETE: 본인 프로젝트 체인인 경우만 (필요 시)
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
```

### 4.4 `specs`

```sql
-- SELECT: 본인 프로젝트의 스펙만
create policy "specs_select"
  on public.specs for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

-- INSERT: 본인 프로젝트에만 생성
create policy "specs_insert"
  on public.specs for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

-- UPDATE: 본인 프로젝트의 스펙만 (승인 등)
create policy "specs_update"
  on public.specs for update
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );

-- DELETE: 본인 프로젝트의 스펙만 (필요 시)
create policy "specs_delete"
  on public.specs for delete
  using (
    auth.uid() is not null
    and exists (
      select 1 from public.projects p
      where p.id = specs.project_id and p.user_id = auth.uid()
    )
  );
```

---

## 5. 적용 방법

1. **기존 정책이 있는 테이블**  
   위 정책으로 **완전히 교체**하려면, 기존 정책을 먼저 `drop policy` 한 뒤 위 `create policy`를 실행해야 합니다.  
   예:  
   `drop policy if exists "projects_select" on public.projects;`  
   그 다음 해당 테이블의 새 정책들을 순서대로 생성.

2. **`specs` 테이블**  
   아직 없다면 테이블 생성 후 RLS 활성화(`alter table ... enable row level security;`)하고, 위 4.4 정책을 생성합니다.

마이그레이션 파일 `20250301000000_rls_strict_and_specs.sql`에서 위 내용을 한 번에 적용할 수 있도록 정리해 두었습니다.
