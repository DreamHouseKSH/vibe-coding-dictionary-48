import { Badge } from "@/components/ui/badge";
export function GapAnalysis() {
 return <section className="gap-analysis" aria-labelledby="gap-title">
  <div className="eyebrow">BEYOND THE ORIGINAL 48</div><h2 id="gap-title">아는 기능 사이의 빈틈 찾기</h2>
  <p>자료의 48개를 틀렸다고 판단한 것이 아니라, 실제로 쓰는 흐름에서 빠진 학습 주제를 찾아 <strong>8개 확장 제안</strong>으로 묶었습니다. 같은 원인의 빈틈은 한 카드로 합쳤습니다.</p>
  <div className="gap-grid">
   <article><Badge variant="secondary">명확히 알고 있는 것</Badge><h3>이름과 효과가 있는 48개</h3><p>배치·컴포넌트·시각 모션은 기존 카드에서 계속 체험합니다. 반응형과 토스트를 새 이름으로 중복 추가하지 않습니다.</p></article>
   <article><Badge variant="secondary">필요하지만 모르는 것</Badge><h3>실패해도 작업을 이어가기</h3><p>P0: 폼 검증(49), 비동기 상태·재시도·취소(50), 낙관적 변경·롤백(51). 정상 동작뿐 아니라 복구 경로가 필요합니다.</p></article>
   <article><Badge variant="secondary">익숙하지만 이름을 모르는 것</Badge><h3>늘 보던 탐색과 재배치</h3><p>P1: 콤보박스(52), 컨테이너 쿼리(54), 페이지네이션(55). 드롭다운·반응형·탭과 무엇이 다른지 비교합니다.</p></article>
   <article><Badge variant="secondary">사용 테스트로 찾는 숨은 빈틈</Badge><h3>마우스와 빠른 응답만 가정했나요?</h3><p>P0: 드래그의 버튼 대안(53). P1: 빠른 연속 입력·한글 조합·늦은 응답(56). 아직 발견하지 못한 문제까지 모두 찾았다는 뜻은 아닙니다.</p></article>
  </div>
  <details><summary>선정 기준과 다음에 확인할 질문</summary><p>반복 사용 빈도, 실패 시 영향, 기존 48개와의 비중복성을 기준으로 P0부터 선정했습니다. 빈 상태·오류·대기·재시도는 50번으로 묶고, 기존 사이트의 검색 빈 상태·건너뛰기 링크를 사이트 결함으로 오인하지 않았습니다.</p><p>보류: 브레드크럼·단계별 폼·가상화·무한 스크롤·오프라인 동기화. 실제 큰 목록이나 긴 작업 흐름이 필요해질 때 검토합니다. 후속 테스트 질문: 키보드만으로 완료 가능한가? 느린 응답이 최신 입력을 덮는가? 취소 뒤 작업이 되살아나는가? 작은 터치 화면에서도 대체 조작이 가능한가?</p></details>
 </section>;
}
