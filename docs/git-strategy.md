# Git 브랜치 전략

이 문서는 ai-webapp-starter 프로젝트의 브랜치 전략, PR 규칙, 머지 전략을 정의합니다.

---

## 1. 브랜치 구조

### 1.1 영구 브랜치

| 브랜치 | 설명 | 보호 |
|--------|------|------|
| **main** | 프로덕션 배포용. 항상 배포 가능한 상태 유지 | ✅ |
| **dev** | 개발 통합 브랜치. 기능/리팩터/디자인 작업이 여기로 머지됨 | ✅ |

### 1.2 단기 브랜치 (피처 브랜치)

| 패턴 | 용도 | base 브랜치 |
|------|------|-------------|
| **feat/** | 새 기능 개발 | dev |
| **refactor/** | 리팩터링 (동작 변경 없음) | dev |
| **design/** | UI/UX·디자인 변경 | dev |
| **hotfix/** | main 기준 긴급 버그 수정 | main |

**네이밍 예시**
- `feat/user-auth`
- `refactor/api-client`
- `design/landing-layout`
- `hotfix/login-redirect`

---

## 2. 브랜치 흐름

```
main  ─────●────────────────────────●──────────  (배포)
            \                      /
             \    dev  ───●───●───/
              \         / \ /
               \  feat/  refactor/
```

- **feat/**, **refactor/**, **design/** → **dev**로 PR 후 머지
- **dev**가 안정화되면 **main**으로 PR 후 머지 (릴리스)
- **hotfix/** → **main**으로 PR 후 머지, 이후 **dev**에 백포트

---

## 3. PR 규칙

### 3.1 필수 사항

- 모든 변경은 **Pull Request**를 통해 반영한다. main/dev에 직접 push 하지 않는다.
- PR 제목은 브랜치 용도와 일치시킨다.
  - 예: `[feat] 사용자 인증 추가`, `[refactor] API 클라이언트 분리`
- **main**, **dev**는 브랜치 보호 규칙을 적용한다.
  - 최소 1명 이상 승인 후 머지
  - CI(빌드/테스트) 통과 필수
  - PR이 열린 상태에서만 머지 가능 (force push 금지)

### 3.2 PR 템플릿 권장

- **목적**: 무엇을 위한 변경인지
- **변경 요약**: 수정/추가된 파일·기능 요약
- **체크리스트**: 로컬 테스트 완료, 문서 필요 시 업데이트 등

### 3.3 머지 전략

- **dev로 머지**: **Squash and merge** 사용 (아래 4장 참고)
- **main으로 머지**: **Squash and merge** 또는 **Merge commit** (팀 합의에 따름)
- **hotfix → main**: **Squash and merge** 권장

---

## 4. Squash 전략

### 4.1 적용 범위

- **feat/**, **refactor/**, **design/** → **dev**: **Squash and merge**
- **hotfix/** → **main**: **Squash and merge**

### 4.2 Squash 규칙

1. **Squash and merge** 시 커밋 메시지는 한 줄 요약 + 본문으로 정리한다.
2. 제목 형식: `[타입] 짧은 설명`  
   - 타입: feat, refactor, design, hotfix 등
3. 본문에는 “무엇을 왜 바꿨는지”만 간단히 적는다. 개별 커밋 로그는 squash로 합쳐진다.

**예시 (Squash 후 최종 메시지)**

```
[feat] 사용자 로그인 API 추가

- 이메일/비밀번호 로그인 엔드포인트
- JWT 발급 및 쿠키 설정
```

### 4.3 Squash를 쓰는 이유

- dev/main 히스토리를 “기능/리팩터/핫픽스 단위”로 깔끔하게 유지
- WIP·오타 수정 등 작은 커밋을 하나의 의미 있는 커밋으로 정리
- revert 시 해당 PR 단위로 되돌리기 쉬움

---

## 5. 요약

| 작업 | 생성 브랜치 | 타깃 | 머지 방식 |
|------|-------------|------|-----------|
| 새 기능 | feat/* | dev | Squash and merge |
| 리팩터링 | refactor/* | dev | Squash and merge |
| 디자인 변경 | design/* | dev | Squash and merge |
| 긴급 수정 | hotfix/* | main | Squash and merge |
| 릴리스 | dev → main | main | Squash or Merge commit |

이 전략은 팀 규모와 도구(GitHub/GitLab 등)에 맞게 보호 규칙·리뷰 인원만 조정해서 사용하면 됩니다.
