# AI MVP 자동 생성 플랫폼 — 페이지 흐름·디자인 시스템

## 1. 목적·범위

- **목적**: 사용자 요청 6단계와 현재 구현을 매핑하고, UI 구조·일관성·버튼·로딩/에러·반응형 전략을 정의한다.
- **디자인 시스템**: 아래 Color Tokens·Typography·Layout·Component 패턴을 기준으로 한다. 모든 페이지·컴포넌트는 이 문서와 `globals.css` / `tailwind.config.js` / `components/ui` 에 정의된 스타일을 따른다.

---

## 2. 디자인 시스템 (현재 적용 기준)

### 2.1 Color Tokens (`globals.css` CSS 변수)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--bg` | `#0a0a0f` | 페이지 배경 |
| `--surface` | `#111118` | 카드·네비 배경 |
| `--surface2` | `#1a1a24` | 입력 필드·보조 영역 |
| `--border` | `#2a2a38` | 테두리 |
| `--accent` | `#6c63ff` | Primary·강조 |
| `--accent2` | `#00d4aa` | Success·권장 |
| `--accent3` | `#ff6b6b` | Error·필수(P0)·경고 |
| `--text` | `#e8e8f0` | 본문 텍스트 |
| `--text2` | `#8888aa` | 보조·설명 텍스트 |
| `--radius` | `12px` | 카드·공통 border-radius |

Tailwind: `bg-bg`, `bg-surface`, `bg-surface2`, `border-border`, `text-text`, `text-text2`, `accent`, `accent2`, `accent3`, `muted`(→ text2).

### 2.2 Typography

- **Body**: Pretendard (CDN), weights 300–800.
- **Mono**: Space Mono (next/font/google), 400·700.
- **Base**: font-size 15px, line-height 1.6.
- **Large headings**: 36px, font-weight 800, letter-spacing -1px.
- **Section label (page-tag)**: 11px, letter-spacing 2px, uppercase, color `var(--accent)`.
- **Subtext**: 16px, color `var(--text2)`, line-height 1.6.

### 2.3 Layout·Sizing 규칙

- **Page wrapper**: 고정 nav 높이 약 56px. 콘텐츠는 `padding-top: 100px`, `padding-bottom: 60px`. 콘텐츠가 nav나 뷰포트 가장자리에 닿지 않도록 한다.
- **Content container**: `max-width: 960px`, `margin: 0 auto`, `padding: 0 32px`(모바일 `0 16px`). 모든 페이지 콘텐츠는 이 컨테이너 안에만 존재. `components/ui/Container.tsx` 사용.
- **Widths**: 내부 콘텐츠에 `width: 100vw` 사용 금지. 텍스트 컨테이너는 고정 px 대신 `max-width` 또는 유동 너비. 카드·폼·블록은 그리드 컬럼 안에서 `width: 100%`. 입력·textarea는 `width: 100%`, 부모를 넘지 않도록. 버튼은 명시적 full-width가 아니면 `fit-content`.
- **Grid**: 2열 `grid-template-columns: 1fr 1fr`, 3열 `repeat(3, 1fr)`, gap 16px. 모바일(max-width 640px)에서 1열. 고정 px 컬럼(예: 300px) 사용 금지.
- **Text**: 본문에 의도적 줄바꿈용 `<br>` 남발 금지. 텍스트 컨테이너는 `overflow-wrap: break-word`, 그리드 자식은 `min-width: 0`. 라벨은 block, `margin-bottom: 8px`, 인풋과 인라인 배치 금지.
- **Spacing**: 섹션/카드 간 gap 20px. 카드 내부 padding 28px. 라벨–인풋 8px. 버튼과 해당 섹션 간 margin-top 24px. 버튼 행 gap 12px.

### 2.4 컴포넌트 스타일 (`components/ui`)

- **Card**: `bg-surface`, `border border-border`, `rounded-card`, padding 28px. hover 시 `border-[#3a3a50]`, `shadow-glow`.
- **Button**: 공통 padding 12px 28px, radius 8px, 14px, font-weight 700.  
  - **Primary**: `bg-accent`, hover lift + shadow.  
  - **Secondary**: transparent, border, hover 시 border·text accent.  
  - **Success**: `bg-accent2`, hover lift.  
  버튼 행: `flex`, `gap 12px`, `margin-top 24px`, `flex-wrap`.
- **Input / Textarea**: `.ds-input` 또는 동일 스타일. `bg-surface2`, `border-border`, radius 8px, padding 14px 16px. focus 시 `border-accent`, `box-shadow 0 0 0 3px rgba(108,99,255,0.12)`. textarea는 `resize: vertical`.
- **Badge**: core(accent), extra(accent2), admin(accent3). radius 20px, 11px, font-weight 700, padding 3px 10px.
- **Alert**: info / warn / success. padding 12px 16px, radius 8px, 13px font-weight 600, margin-bottom 16px.
- **ProgressBar**: track 6px, fill transition. variant accent / accent2(그라데이션).
- **PageHeader**: tag(page-tag 스타일), title(36px 800), 선택 highlight, subtitle(16px text2).

---

## 3. 페이지 흐름 매핑

| 사용자 요청 단계 | 현재 라우트 | 페이지 역할 | 비고 |
|-----------------|-------------|-------------|------|
| 1. 프로젝트 생성 | `/` (랜딩) | 진입점, CTA로 Wizard 시작 | “무료로 시작하기” → `/input` |
| 2. 아이디어 입력 | `/input` | 아이디어 + 템플릿, AI 분석 트리거 | “다음 단계로” → `/spec` |
| 3. AI 분석 결과 확인 | `/spec` | 명세 편집·P0/P1 확인 | 승인/수정 요청 후 다음 |
| 4. 기능 승인 | `/spec` (동일) | 승인 시 `specApproved` → Design 활성화 | 별도 페이지 없음, Spec 내 블록 |
| 5. 개발 진행 상태 | `/build` | 로그 스타일 진행 UI → 완료 카드 | 로딩 → 성공 화면 |
| 6. Preview | `/preview` | 결과물 미리보기/다운로드 | Build 완료 카드 “결과물 보러가기”로 연결 |

**권장 흐름**

```
[랜딩 /] → [아이디어 /input] → [명세·승인 /spec] → [테마 /design] → [빌드·완료 /build] → [Preview /preview]
```

- **프로젝트 생성**: 랜딩에서 “시작” 시 Wizard 진입. `/projects`에서 “새 프로젝트 만들기”로 명시적 생성 가능.
- **Preview**: Build 완료 후 “결과물 보러가기”로 `/preview` 이동.

---

## 4. UI 구조 (현재 적용)

### 4.1 공통 레이아웃

- **Root layout**: `Header`(fixed, ~56px) + `Stepper`(모바일) + `main`(Container 내부: SidebarSteps + 카드 섹션) + `footer`.
- **콘텐츠**: `main`에 `pt-[100px]`, `pb-[60px]`. 모든 단계 콘텐츠는 `Container`(max-width 960px, px 4/sm:px 8) 안의 카드 래퍼 안에 위치.
- **랜딩**: `/`는 별도 레이아웃. 히어로·Features·HowItWorks·CTA·SocialProof·Footer 모두 `Container` 사용, 동일 960px·패딩 규칙.

### 4.2 단계별 콘텐츠 구조

| 페이지 | 구조 | 비고 |
|--------|------|------|
| `/input` | Container 내 카드, PageHeader, 템플릿 3열 그리드, 폼(ds-input), 푸터 액션 | 라벨 block, margin-bottom 8px |
| `/spec` | PageHeader, SpecEditor(Card), P0/P1 카드 2열, 수정 요청 textarea, 버튼 행 | Primary “이대로 진행하기”, 보조 “다시 입력하기” |
| `/design` | PageHeader, 테마 카드 3열, Primary “앱 생성하기” | 선택 시 border-accent, ring |
| `/build` | 로딩: 스피너·로그 카드(surface)·텍스트2 / 완료: 카드+PageHeader+버튼, 생성 요약 Card | accent2 그라데이션 상단 띠 |
| `/preview` | PageHeader, 미리보기 카드, 기능 Badge 목록, 푸터 액션 | |
| `/projects` | PageHeader, Primary “새 프로젝트 만들기” 링크 | |

---

## 5. 일관성·금지 사항

- **색상**: Primary/Success/Error는 토큰만 사용 (`accent`, `accent2`, `accent3`). 하드코딩 hex/blue-600 등 사용 금지.
- **너비**: `100vw` 내부 콘텐츠에 사용 금지. 텍스트/카드에 고정 px 너비 대신 100% 또는 max-width. 그리드 자식에 `min-width: 0` 적용해 텍스트 넘침 방지.
- **버튼**: `components/ui`의 `Button`(variant primary/secondary/success) 또는 동일 스타일. LoadingButton은 Button 기반.
- **카드**: `Card` 또는 동일 스타일(surface, border, radius, padding 28px).
- **에러/알림**: `PageErrorBanner`(accent3 계열), `Alert`(info/warn/success), `InlineError`(text-accent3).

---

## 6. 버튼 위치·역할

- **Primary**: 다음 단계 진행(“다음 단계로”, “이대로 진행하기”, “앱 생성하기”, “결과물 보러가기”) → 오른쪽 끝 또는 중앙(CTA).
- **Secondary/링크**: 뒤로 가기, 다시 입력, 코드 다운로드 등 → 왼쪽 또는 Primary 왼쪽.
- 푸터 액션 영역: `border-t border-border pt-10`, `flex flex-col md:flex-row md:items-center md:justify-between`, gap 4. 버튼 행은 `flex gap-12`, `margin-top 24px`.

---

## 7. 로딩·에러 상태

- **Input → Spec (AI 분석)**: LoadingButton 스피너 + “AI 분석 중...”, 버튼 비활성화.
- **Build 진행 중**: 로그 스타일 카드(surface, border, font-mono, text2). 스피너 accent.
- **에러**: 검증 실패는 인라인 `InlineError`(accent3). API/네트워크는 `PageErrorBanner`(메시지 + 재시도 Button secondary).
- **접근성**: 에러 메시지에 `role="alert"` 유지.

---

## 8. 반응형

- **브레이크포인트**: `sm`(640px) 그리드·버튼, `md`(768px) 사이드바·Stepper 전환. 모바일에서 Stepper 표시, md 이상에서 SidebarSteps 표시.
- **컨테이너**: 모바일 `px-4`, sm 이상 `px-8`(Container).
- **그리드**: Input 템플릿·Design 테마 3열 → 모바일 1열. Spec P0/P1 2열 → 모바일 1열.
- **터치**: 버튼·카드 터치 영역 충분히 확보. 포커스 링: `focus-visible:ring-2 focus-visible:ring-accent` 등 적용.

---

## 9. 요약

- **흐름**: 랜딩 → Input → Spec(확인·승인) → Design → Build(진행·완료) → Preview.
- **디자인 시스템**: Color tokens(globals.css), Typography(Pretendard/Space Mono), Layout(Container 960px, padding-top 100px), Component(ui/Card, Button, Badge, Alert, PageHeader, ProgressBar, Container).
- **일관성**: accent/accent2/accent3·surface·text 토큰 전면 사용, 고정 px·100vw 금지, min-width:0·break-words로 오버플로우 방지.
- **버튼**: 보조 왼쪽 / Primary 오른쪽(또는 CTA 중앙). LoadingButton·PageErrorBanner·Alert로 로딩/에러 규격화.

이 문서와 `src/styles/globals.css`, `tailwind.config.js`, `src/components/ui` 구현을 기준으로 페이지·컴포넌트를 유지·보수한다.
