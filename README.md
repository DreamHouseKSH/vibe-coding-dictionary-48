# VIBE / 48

한국어 UI · 레이아웃 · 모션 인터랙티브 사전. [공개 사이트](https://dreamhouseksh.github.io/vibe-coding-dictionary-48/)

React, TypeScript, Vite, Tailwind 4와 공식 shadcn/ui Nova 기본 프리셋(Radix)을 사용합니다. **공식 `@shadcn/lint@0.2.3`의 6개 규칙**을 ESLint/CI에서 실행합니다. [설정·정책·예외·한계](docs/design-system.md)를 확인하세요.

## 바로 체험

48개 데모는 카드 안에 직접 표시됩니다. 별도 데모 모달을 열 필요가 없습니다. Modal과 Drawer 예제만 해당 UI 자체를 여는 버튼을 제공합니다. 화면에 보이는 데모만 로드·마운트하며, 스크롤로 벗어나거나 필터로 제거되면 타이머와 애니메이션을 정리합니다. 루프는 사용자가 시작하고 중지할 수 있습니다.

검색·카테고리로 용어를 찾고, 담기 버튼으로 프롬프트를 조합하거나 예시를 복사하세요. 카드의 복사·담기는 데모 재생과 독립적입니다. 복사가 차단되면 해당 카드의 원문이 펼쳐져 수동으로 복사할 수 있습니다.

## 출처와 확인 범위

- [바이브코더가 반드시 알아야 할 필수 용어 24가지](https://youtu.be/mlhKEy-2bgI)
- [바이브코더가 반드시 알아야 할 필수 용어 24가지 2탄](https://youtu.be/r7iS0Gw3Jq4)

첨부된 사용자 제공 요약의 48개 항목을 재구성한 비공식 학습 자료입니다. YouTube 제목은 확인했으나 자막과 각 항목을 독립 검증하지 못했습니다. 검증할 수 없는 타임스탬프는 제외했습니다. 코드깎는노인 채널에 대한 귀속은 제공 요약에 근거하며 채널의 보증·제휴를 뜻하지 않습니다. 데모는 이 프로젝트에서 작성했습니다.

1편 요약: 정확한 UI 이름 + 동작 + 적용 조건. 2편 요약: 효과 이름 + duration/delay/easing + 시작 조건 + reduced motion. 항목별 설명과 요청 예시는 `src/terms.ts`에 있습니다.

## 실행·검사

Node 24 이상에서 `npm ci`, `npm run dev`. 배포 경로는 `/vibe-coding-dictionary-48/`입니다.

- `npm run lint`: 공식 shadcn 6개 규칙 + 접근성 + 보충 프로젝트 규칙.
- `npm run lint:ui`: 실제 공식 규칙의 실패/통과 fixture, 예외 범위, 48개 데모·데이터 검사.
- `npm run check`: 위 검사 + TypeScript + production build.

main push에서 같은 검사를 통과한 산출물만 Pages에 배포됩니다. 이전 문서가 공식 lint를 확인하지 못했다고 설명한 것은 잘못된 조사였으며, 공식 패키지·문서·규칙으로 바로잡았습니다. 보충 `local/*` 규칙을 공식 도구로 표시하지 않습니다.

## 접근성·구조

Dialog/Sheet는 Radix 포커스 트랩·복원, Escape와 배경 닫기를 사용합니다. 툴팁은 클릭 안내도 제공하며, 포인터 효과는 키보드/터치 Slider로 조작할 수 있습니다. 캐러셀은 버튼·스와이프, 스크롤 영역은 키보드 접근을 지원합니다. 시스템/페이지 모션 감소 설정은 CSS, JS/Motion, SVG에 적용됩니다.

`src/InlineDemo.tsx`는 가시성·정리, `src/Demo.tsx`는 48개 실제 데모, `src/terms.ts`는 출처 요약 기반 데이터, `src/App.tsx`는 검색·카탈로그·프롬프트 조합기를 담당합니다. 비밀키, 유료 API, 외부 런타임 CDN을 사용하지 않습니다.

[검증 기록](QA.md)과 `scripts/browser-inline*.js`에서 재현 가능한 브라우저 검증 흐름을 확인할 수 있습니다. 모바일 검증은 브라우저 에뮬레이션이며 실제 iPhone 실기기 검증은 아닙니다.
