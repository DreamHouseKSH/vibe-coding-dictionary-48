# VIBE / 48

한국어 UI · 레이아웃 · 모션 인터랙티브 사전. React, TypeScript, Vite, Tailwind CSS, 공식 shadcn/ui 기본 Nova 프리셋(Radix)을 사용합니다.

## 출처와 검증 범위

- [바이브코더가 반드시 알아야 할 필수 용어 24가지](https://youtu.be/mlhKEy-2bgI)
- [바이브코더가 반드시 알아야 할 필수 용어 24가지 2탄](https://youtu.be/r7iS0Gw3Jq4)

첨부된 사용자 제공 요약의 48개 항목을 재구성한 비공식 학습 자료입니다. YouTube 제목은 확인했으나 자막과 각 항목을 독립 검증하지 못했습니다. 제공된 타임스탬프는 검증할 수 없어 제외했습니다. 코드깎는노인 채널에 대한 귀속은 제공 요약에 근거하며 채널의 보증·제휴를 뜻하지 않습니다. 데모는 이 프로젝트에서 새로 작성했습니다.

1편의 중심은 정확한 UI 이름 + 동작 + 적용 조건입니다. 2편의 중심은 효과 이름 + duration/delay/easing + 시작 조건 + reduced motion입니다. 항목별 설명과 요청 예시는 `src/terms.ts`에 있습니다.

## 실행

Node 24 이상. `npm ci`, `npm run dev`. GitHub Pages 경로는 `/vibe-coding-dictionary-48/`입니다.

`npm run check`는 접근성 ESLint, 로컬 UI 사용 규칙, 규칙 위반 negative fixture, 48개 항목·데모 커버리지, TypeScript, 프로덕션 빌드를 실행합니다. main push에서 동일한 검사를 통과한 산출물만 Pages에 배포합니다.

## shadcn/ui와 lint

공식 CLI `shadcn@4.23.0 init -t vite -b radix --preset nova` 및 `add`로 생성했습니다. `components.json`과 semantic CSS tokens를 유지합니다. UI 제어는 `@/components/ui/*`에서 가져옵니다. 기본 neutral 토큰을 사용하며 데모에만 표현용 스타일이 있습니다.

[공식 CLI](https://ui.shadcn.com/docs/cli)와 [테마 문서](https://ui.shadcn.com/docs/theming)에서 첨부가 주장한 `shadcn-ui/lint`, `shadcn/component-import`, `shadcn/valid-component-composition`을 확인하지 못했습니다. 설치하거나 공식 도구라고 표시하지 않습니다. `scripts/ui-rules.mjs`의 프로젝트 규칙은 native form controls 우회, 비표준 UI import, 제목·설명 누락 Dialog를 검사합니다. 모든 시각 규칙이나 임의의 런타임 조합을 증명하는 검사가 아닙니다. 생성된 UI wrapper 자체는 검사 적용 대상에서 제외하고 앱 사용처에 적용합니다.

## 접근성·동작

- Dialog/Sheet: Radix 포커스 트랩·복원, Escape, 배경 닫기.
- 터치/키보드: 툴팁 클릭 대안, 포인터 효과 Slider, 캐러셀 버튼·스와이프, 스크롤 영역 focus.
- 시스템 및 페이지 모션 감소: CSS와 JS/Motion 모두 적용. 루프는 사용자 시작·정지, 타이머는 재생 교체·unmount cleanup.
- 자동 복사 실패 시 수동 복사 텍스트와 오류 안내.
- shared element는 동일 layoutId의 이미지·제목이 목록/상세의 다른 크기·배치로 연결됩니다. parallax는 포인터가 아니라 스크롤 속도 차이입니다.

## 유지보수

`src/Demo.tsx`는 ID별 데모 라우터, `src/terms.ts`는 출처 요약 기반 데이터, `src/App.tsx`는 검색·필터·프롬프트 조합기입니다. 비밀키, 유료 API, 런타임 CDN은 사용하지 않습니다.

## 브라우저 검증 재현

Playwright CLI로 로컬 서버를 연 다음 `run-code`에 `scripts/browser-batch1.js`, `browser-batch2.js`, `browser-mobile.js`, `browser-final.js`의 함수 내용을 순서대로 전달합니다. 각 파일은 저장소에서 확인 가능한 브라우저 검증 시나리오입니다. 브라우저 검증은 로컬에서 수행했으며 CI는 lint·negative fixture·타입·빌드를 담당합니다. 모바일 검증은 390×844 에뮬레이션이며 실제 iPhone 실기기 검증은 아닙니다.
