# AI MVP 자동 생성 플랫폼 — 페이지 흐름 설계

## 1. 목적·범위

- **목적**: 사용자 요청 6단계와 현재 구현을 매핑하고, UI 구조·일관성·버튼·로딩/에러·반응형 전략을 정의한다.
- **디자인 시스템**: Primary `#4F46E5`, Secondary `#0F172A`, Accent `#22D3EE`, Background `#F8FAFC`, Success `#16A34A` · 8px 그리드 · 카드 레이아웃 · 여백 중심 미니멀.

---

## 2. 페이지 흐름 매핑

| 사용자 요청 단계 | 현재 라우트 | 페이지 역할 | 비고 |
|-----------------|-------------|-------------|------|
| 1. 프로젝트 생성 | `/` (랜딩) | 진입점, CTA로 Wizard 시작 | “무료로 시작하기” → `/input` |
| 2. 아이디어 입력 | `/input` | 아이디어 + 템플릿, AI 분석 트리거 | “다음 단계로” → `/spec` |
| 3. AI 분석 결과 확인 | `/spec` | 명세 편집·P0/P1 확인 | 승인/수정 요청 후 다음 |
| 4. 기능 승인 | `/spec` (동일) | 승인 시 `specApproved` → Design 활성화 | 별도 페이지 없음, Spec 내 블록 |
| 5. 개발 진행 상태 | `/build` | 로그 스타일 진행 UI → 완료 카드 | 로딩 → 성공 화면 |
| 6. Preview | (미구현) | 결과물 미리보기/다운로드 | Build 완료 카드에 “결과물 보기” 등으로 연결 예정 |

**권장 흐름 정리**

```
[랜딩 /] → [아이디어 /input] → [명세·승인 /spec] → [테마 /design] → [빌드·완료 /build] → [Preview]
```

- **프로젝트 생성**: 랜딩에서 “시작” 시점에 Wizard 진입으로 간주. 필요 시 `/projects`에서 “새 프로젝트”로 명시적 생성 플로우 추가 검토.
- **Preview**: 6단계는 `/build` 완료 후 “결과물 보러가기”로 연결되는 **Preview** 페이지(또는 모달/새 탭)로 정의하는 것을 권장.

---

## 3. UI 구조 점검

### 3.1 공통 레이아웃

- **Root layout**: `Header` + `Stepper`(모바일) + `main`(SidebarSteps + 카드 섹션) + `footer`.
- **카드 래퍼**: 모든 단계 콘텐츠가 `section > .card.card-spacing` 안에 들어가므로 **카드 기반 레이아웃**은 일관됨.
- **문제**: 랜딩(`/`)은 동일한 `main` 구조를 쓰지만 Stepper/Sidebar가 숨겨져 있어, 첫 진입과 Step1 진입 시 레이아웃이 달라 보일 수 있음.  
  → 랜딩은 **전체 너비 히어로**로 두고, `/input`부터 카드+사이드 스텝으로 통일하는 현재 방향 유지 권장.

### 3.2 단계별 콘텐츠 구조 (8px 그리드)

| 페이지 | 현재 구조 | 권장 통일 |
|--------|-----------|-----------|
| `/input` | `max-w-3xl mx-auto p-6` + `space-y-6` | 패딩을 `p-6`(24px) 유지, 섹션 간 `space-y-6`(48px)로 8px 그리드 준수 |
| `/spec` | `max-w-3xl mx-auto p-6` + `mb-8`/`mt-8` 혼용 | 섹션 간격을 `space-y-6` 또는 `space-y-8`로 통일 |
| `/design` | `max-w-4xl mx-auto p-6` | `max-w-3xl`로 통일하거나, 카드 그리드만 `max-w-4xl`로 두어 단계별로 한 가지 max-width 패턴 선택 |
| `/build` | 로딩/완료 각각 다른 wrapper | 완료 영역도 `max-w-3xl mx-auto p-6` + 동일 카드 스타일 적용 |

---

## 4. 일관성 없는 부분 식별

### 4.1 색상·컴포넌트

- **Primary**: 디자인 시스템은 `#4F46E5`.  
  - **문제**: `design/page.tsx`는 `border-blue-600`, `bg-blue-600` 등 하드코딩.  
  - **조치**: `primary` 토큰 사용 (`border-primary`, `bg-primary`).
- **Success**: 완료·승인 메시지는 `#16A34A`(Success) 사용 권장.  
  - **문제**: Spec 승인 메시지 `text-emerald-600`, Build 완료 그라데이션 등이 토큰과 불일치.  
  - **조치**: `text-success`, `bg-success` 등 토큰으로 통일.
- **버튼**:  
  - **문제**: Design “앱 생성하기”는 `bg-blue-600`·`rounded-lg`. Build 완료 영역 버튼도 `bg-blue-600`·`rounded-xl`.  
  - **조치**: 공통 `.btn .btn-primary` 사용, `rounded-xl`로 통일(디자인 시스템에 맞춤).

### 4.2 타이포·레이블

- **문제**: Spec은 “Step 2. 기능 명세”, Input/Design/Build는 Step 번호 없음.  
- **조치**:  
  - Option A: 모든 단계에 “Step N. 제목” 형식 통일.  
  - Option B: Step 번호 제거하고 Stepper/Sidebar에만 단계 정보 두기.  
  → **Option B 권장**(중복 제거, 미니멀).

### 4.3 카드·테마 선택

- **Input 템플릿**: `rounded-xl border-2` + primary 링.  
- **Design 테마**: `border-2 rounded-xl`이지만 `border-blue-600` 하드코딩.  
- **조치**: 선택 카드 공통 클래스 도입 (예: `.card-selectable`, 선택 시 `ring-2 ring-primary/30 border-primary`).

---

## 5. 버튼 위치·역할 통일

### 5.1 원칙

- **주요 액션(Primary)**: 다음 단계로 진행 (예: “다음 단계로”, “이대로 진행하기”, “앱 생성하기”) → 항상 **오른쪽 끝**.
- **보조 액션(Outline/텍스트)**: 뒤로 가기, 다시 입력, 취소 → **왼쪽** 또는 Primary 버튼 왼쪽.
- **세로 배치**: 모바일에서 Primary가 아래, 보조가 위로 오도록 유지.

### 5.2 단계별 규칙

| 페이지 | 보조(왼쪽) | 주요(오른쪽) | 레이아웃 |
|--------|------------|--------------|----------|
| `/input` | (없음) | “다음 단계로” | `flex justify-end` ✅ |
| `/spec` | “마음에 안 드나요? 다시 입력하기” | “이대로 진행하기 →” | `flex-col md:flex-row`, 왼쪽/오른쪽 구분 ✅. 안내 문구는 버튼 행 아래 또는 오른쪽 보조 텍스트로 |
| `/design` | (없음) | “앱 생성하기” | `flex justify-end` ✅. `.btn.btn-primary` 적용 |
| `/build` 완료 | “새로운 프로젝트 만들기”(링크) | “결과물 보러가기” / “코드 다운로드” | 현재 중앙 정렬. 권장: Primary “결과물 보러가기” 오른쪽, 보조 “코드 다운로드” 그 왼쪽, “새로운 프로젝트”는 링크로 하단 중앙 또는 왼쪽 |

### 5.3 공통 마크업 권장

- 푸터 액션 영역을 모든 단계에서 동일하게:
  - `className`: `pt-6 mt-8 border-t border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between`
  - 왼쪽: 보조 버튼/링크 (`btn-secondary` 또는 outline/underline).
  - 오른쪽: Primary 버튼 (`btn btn-primary`).

---

## 6. 로딩·에러 상태 UX 정의

### 6.1 로딩

| 상황 | 현재 | 권장 |
|------|------|------|
| Input → Spec (AI 분석) | 버튼 내 스피너 + “다음 단계로 이동 중...” | 유지. 추가: 버튼 비활성화 + 가능하면 카드 영역에 얕은 오버레이 또는 스켈레톤으로 “분석 중” 표시 |
| Build 진행 중 | 전체 카드가 로그 스타일 UI | 유지. 색상만 `primary`/배경 토큰 사용 (예: 터미널 배경 `secondary`, 텍스트 `accent` 또는 `success`) |
| Design → Build 제출 시 | (즉시 전환) | “앱 생성하기” 클릭 시 버튼 로딩(스피너) 1~2초 후 `/build` 전환 권장 |

### 6.2 에러

| 상황 | 현재 | 권장 |
|------|------|------|
| Input 검증 (50자 미만) | `error` state, 텍스트만 빨간색 | 인라인 메시지 + `role="alert"` 또는 `.text-destructive`(토큰 추가). 필요 시 입력창 `border-red-500` 등으로 강조 |
| Spec 없이 Design 진입 | `useEffect`로 `/spec` 리다이렉트 | 유지. Design 페이지에 “명세가 승인되지 않았습니다” 토스트/배너 한 번 표시 후 리다이렉트 옵션 |
| API 실패(분석/빌드) | (미구현) | 전역 또는 페이지 단위 에러 바: “잠시 후 다시 시도해 주세요” + 재시도 버튼. 8px 패딩, 카드 스타일 |
| 네트워크 오류 | (미구현) | 동일 에러 바 + 필요 시 “오프라인” 메시지 |

### 6.3 공통 로딩/에러 컴포넌트 제안

- **LoadingButton**: `disabled` + 스피너 + 텍스트 전환 (예: “제출 중...”).
- **InlineError**: `text-sm text-destructive` + 아이콘(선택).
- **PageErrorBanner**: 카드 상단 `bg-red-50 border border-red-200 rounded-lg p-4` + 재시도 CTA.

---

## 7. 반응형 전략

### 7.1 브레이크포인트

- **현재**: `md:`(768px)로 Sidebar 표시/Stepper 숨김, 버튼 행 가로 배치.
- **유지**: `sm`(640px)은 버튼/그리드만, `md`는 레이아웃(사이드바)에 사용.

### 7.2 단계별

| 영역 | 모바일 | 태블릿·데스크톱 |
|------|--------|------------------|
| 메인 컨테이너 | `p-4` | `md:p-8` |
| Input 템플릿 | 1열 | `md:grid-cols-3` |
| Spec P0/P1 | 1열 | `md:grid-cols-2` |
| Design 테마 | 1열 | `md:grid-cols-3` |
| Build 로그 | 폭 제한 유지, 스크롤 | 동일 |
| 푸터 액션 | 버튼 세로 쌓기, Primary 아래 | 가로 배치, Primary 오른쪽 |

### 7.3 탭·접근성

- Stepper는 이미 `md:hidden`으로 모바일만.  
- 터치 타겟: 버튼·카드 선택 영역 최소 44px 높이 유지.
- 포커스 링: `.btn`에 `focus-visible:ring-2` 있음. Design 테마 카드에 `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` 적용 권장.

---

## 8. 적용 우선순위

1. **즉시**: 버튼 스타일 통일(Design/Build에 `.btn .btn-primary`), Primary 색상 하드코딩 제거(`primary` 토큰).
2. **단기**: 푸터 액션 영역 마크업·위치 통일, Build 완료 시 버튼 순서(보조 왼쪽 / Primary 오른쪽).
3. **단기**: 로딩 시 Design → Build 버튼 스피너, 에러 메시지 `role="alert"` 및 스타일 토큰.
4. **중기**: 공통 `LoadingButton`, `InlineError`, `PageErrorBanner` 컴포넌트 도입.
5. **중기**: Preview 단계(6단계) 라우트 및 “결과물 보러가기” 연결.

---

## 9. 요약

- **흐름**: 랜딩 → Input → Spec(확인·승인) → Design → Build(진행·완료) → Preview(구현 예정).  
- **일관성**: Primary/Success 토큰 전면 사용, 카드 선택 스타일·버튼 클래스 통일.  
- **버튼**: 보조 왼쪽 / Primary 오른쪽, 공통 푸터 액션 영역.  
- **로딩/에러**: 버튼 로딩 상태, 인라인 검증 에러, API/네트워크 에러 배너 규격화.  
- **반응형**: 8px 그리드·기존 md 기준 유지, 터치·포커스 개선.

이 설계를 기준으로 컴포넌트·페이지 단위 수정을 진행하면 된다.
