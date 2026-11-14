export type Group = { h: string; lead?: string; items?: string[]; code?: string; codeLabel?: string; table?: { caption: string; head: string[]; rows: string[][] }; note?: string };
export type Source = { id: string; no: string; org: string; title: string; url: string; meta: string; summary: string; groups: Group[]; extra?: { label: string; url: string }[] };

export const sources: Source[] = [
  {
    id: "nng-mobile", no: "01", org: "Nielsen Norman Group", title: "Mobile Tables: Comparisons and Other Data Tables",
    url: "https://www.nngroup.com/articles/mobile-tables/", meta: "Amy Schade · 2017-09-17",
    summary: "큰 표를 작은 화면에서 쓸 수 있게 만드는 방법. 핵심은 헤더 고정, 사용자가 볼 데이터를 고르게 하는 것입니다.",
    groups: [
      { h: "전제: 먼저 큰 화면에서 쓸 만한 표를 만든다", items: [
        "작은 화면에 한 번에 보이는 데이터는 적습니다. 그래서 내용의 일관성과 의미 있는 속성 선택이 데스크톱보다 더 중요합니다.",
        "모바일 대응은 표의 내용과 속성을 다시 점검할 좋은 계기입니다. 화면 크기와 상관없이 모든 사용자에게 개선이 됩니다.",
        "행·열 수를 줄이는 것 외에도 여러 선택지가 있습니다. 아래 8가지 패턴이 그 선택지입니다.",
      ] },
      { h: "1. 열은 확대 없이 읽을 만큼 넓게", items: [
        "한 화면에 들어가는 열 수는 열 너비로 결정됩니다. 확대(줌) 없이 읽혀야 합니다.",
        "문장형·복잡한 항목(비교표 등)은 좁은 모바일 화면에 2열만 읽기 좋게 들어갈 수 있습니다.",
        "숫자가 많은 표는 더 좁은 열이 가능해서 더 많은 열을 보여줄 수 있습니다.",
        "사례: 럭비 선수 통계표는 숫자 위주라 11열을 가로 스크롤 없이 보여줬습니다. 첫 열에 상대팀 로고만, 열 제목에 약어만 써서 가능했지만, 약어에 익숙하지 않은 사용자에게는 문제가 됩니다.",
      ] },
      { h: "2. 폰을 돌리게 하는 것은 최후의 수단", items: [
        "가로로 돌리면 열 공간은 늘지만 행 공간은 줄어듭니다.",
        "휴대폰을 어떻게 쥐어야 하는지 강요하면 사용자가 불편해합니다. 얻는 폭과 잃는 높이, 짜증의 값을 따져 보세요.",
        "사례: Citi.com 카드 비교는 '기기를 돌리세요'를 요구했고, 돌린 뒤에는 화면 높이 대부분을 고정된 큰 카드 이미지가 차지해 표 데이터 공간이 거의 없었습니다.",
        "교훈: 데스크톱에서 열 머리글로 좋던 큰 이미지는 모바일에서 숨기거나 줄이고, 이름만 쓰는 열 머리글이 낫습니다.",
      ] },
      { h: "3. 열 머리글(헤더 행)을 고정", items: [
        "세로로 한 화면을 넘는 모든 표는 열 머리글을 고정(sticky)해야 지금 무엇을 보고 있는지 놓치지 않습니다.",
        "사례: BestBuy 비교표는 열·행 제목을 고정하지 않아, 스크롤하면 라벨이 하나도 보이지 않아 데이터를 이해하기 어려웠습니다.",
      ] },
      { h: "4. 가로 스크롤이 필요하면 눈에 띄게 알린다", items: [
        "가로 스크롤은 일반적으로 좋지 않지만, 모바일의 큰 표에서는 어느 정도 허용됩니다.",
        "단, 가로 접힘선 너머에 데이터가 더 있다는 사실이 분명해야 합니다.",
        "캐러셀처럼 화살표나 '잘려 보이는 요소'가 가장 잘 전달됩니다. 점(dots)은 알아채기 어렵습니다.",
        "사례: eBags는 마지막 상품 열을 일부 잘라 스크롤 가능함을 보여줬습니다. Subaru는 점과 화살표를 표 위에 뒀지만 점 두 개가 '현재 위치'를 뜻해 헷갈렸고, 화살표는 페이지 상단이 아니라 데이터 영역 안에 있어야 더 효과적입니다.",
      ] },
      { h: "5. 가로 스크롤 시 왼쪽 열(행 머리글)을 고정", items: [
        "가로로 스크롤해야 한다면 대개 행 머리글인 맨 왼쪽 열을 고정해 항상 라벨이 보이게 합니다.",
        "사례: Fidelity는 투자 상품 이름과 열 머리글을 고정하고 마지막 열을 살짝 잘라 스크롤 가능함을 알렸습니다.",
        "사례: Officeworks는 비교표의 첫 상품을 'Primary Compare'로 고정해 다른 상품을 그 기준과 비교하게 했습니다. 사용자가 기준 상품을 바꿀 수 있고, 표 본문 안 화살표로 좌우 스크롤을 알렸습니다.",
      ] },
      { h: "6. 사용자가 볼 데이터를 직접 고르게", lead: "화면에 안 들어가면 사용자는 전부 볼 시간도 의지도 없을 가능성이 큽니다. 두 가지 전략이 여러 상황에서 통합니다.", items: [
        "데이터를 보기 전에 원하는 데이터 집합을 좁히게 하기. 비교가 필요 없고 특정 항목 정보만 필요할 때 적합합니다(특정 차종 사양, 특정 식품 영양 정보, 특정 선수 기록).",
        "데이터를 보는 도중에 보기 방식을 조절하게 하기. 어떤 행·열을 보일지 고르면 관심 있는 부분집합에 집중할 수 있습니다.",
        "사례(경고): Jamba Juice는 음료를 고른 뒤 Small/Medium/Large 토글로 영양 정보를 보여줬습니다. 하지만 사이즈 간 차이(예: 칼로리 410을 외웠다가 다른 표에서 빼기)를 사용자가 머릿속으로 계산해야 해 비교를 돕지 못했습니다.",
        "사례: Dell은 상단 메뉴에서 관심 있는 제품 사양을 골라 그 항목만 보이게 했습니다(기본은 전체 표시).",
      ] },
      { h: "7. 묶을 수 있는 데이터는 아코디언으로", items: [
        "데이터를 논리적 범주로 묶을 수 있으면 아코디언으로 (1) 표에 어떤 종류의 데이터가 있는지 개요를 보여주고 (2) 관심 있는 정보에 바로 접근하게 합니다.",
        "사례: Samsung.com은 전체 사양, 공통점만, 차이점만, 직접 고른 기준 중에서 보게 하고, 관련 속성을 아코디언으로 묶어 개요 역할도 했습니다.",
      ] },
      { h: "8. 사용자가 필요한 것을 찾게 돕는다 (결론)", items: [
        "작은 화면에서는 큰 표의 일부만 보입니다.",
        "고정 헤더 같은 이정표가 스크롤 중 방향을 잡아 주고, 사용자가 지정한 기준으로 내용을 좁히는 도구가 의미 있는 보기를 만들어 줍니다.",
      ] },
    ],
  },
  {
    id: "nng-tasks", no: "02", org: "Nielsen Norman Group", title: "Data Tables: Four Major User Tasks",
    url: "https://www.nngroup.com/articles/data-tables/", meta: "Page Laubheimer · 2022-04-03",
    summary: "표 디자인이 지원해야 할 네 가지 사용자 작업: 조건에 맞는 레코드 찾기, 데이터 비교, 한 행 보기·수정·추가, 레코드에 대한 작업 수행. 주로 업무용 대형 데이터 표 대상이며 상품 비교표는 범위 밖입니다.",
    groups: [
      { h: "표 vs 카드·모듈", lead: "표는 미적으로 돋보이지 않는 실용 요소지만, 카드 모음이나 대시보드 같은 다른 다변량 표시보다 기능상 강점이 있습니다.", items: [
        "확장성: 데이터가 바뀌어도 행과 열을 쉽게 늘릴 수 있습니다.",
        "비교 작업 지원: 인접한 두 값을 눈 이동이나 작업 기억 없이 한눈에 비교할 수 있습니다. 카드는 카드 사이를 볼 때마다 공간을 다시 파악해야 해 비교가 느리고 힘듭니다.",
        "결론: 표는 공간 효율이 좋고 레코드 비교와 패턴 발견에 적합합니다.",
      ] },
      { h: "작업 1. 조건에 맞는 레코드 찾기", lead: "이름을 아는 항목 하나를 찾거나, 몇 가지 기준에 맞는 여러 항목을 찾습니다. 필터, 정렬, 검색, 브라우저 Ctrl-F, 눈으로 훑기 중 무엇을 쓸지는 예측하기 어렵습니다.", items: [
        "기본 첫 열은 '알 수 없는 자동 생성 ID'가 아니라 사람이 읽을 수 있는 레코드 식별자로 둡니다. 훑어서 레코드를 찾게 하기 위해서입니다.",
        "열의 기본 순서는 사용자에게 중요한 순으로 하고 관련된 열은 인접하게 둡니다. 1열과 20열을 오가며 보게 만들지 마세요.",
        "필터는 발견하기 쉽고, 빠르고, 강력해야 합니다. 필터 문법은 투명해야 하고, 필터가 적용 중임을 분명한 시각 표시로 알려야 합니다.",
      ] },
      { h: "작업 2. 데이터 비교", lead: "표는 둘 이상의 레코드 또는 서로 다른 열을 쉽게 비교하게 할 때 가장 효과적입니다. 관계, 값의 범위, 이상치, 전형적인 값을 찾는 용도입니다.", items: [
        "문제 1: 데이터가 너무 많아 각 셀이 무엇이고 어느 레코드 소속인지 이해하기 어렵습니다.",
        "문제 2: 비교할 열이 멀리 떨어져 있거나 화면 밖에 있어, 한 열을 외우고 다른 열을 불러와 기억과 비교해야 합니다. 비인접 행도 마찬가지입니다.",
        "해법 원칙: (1) 사용자가 지금 무엇을 보는지 항상 알게 한다 (2) 관심 있는 데이터를 가까이 붙인다.",
      ] },
      { h: "비교 1) 필요한 정보 위치 알기", items: [
        "표가 화면보다 크면 머리글 행과 머리글 열을 고정(freeze)합니다.",
        "눈이 표를 가로지를 때 위치를 놓치지 않게 시각 디자인이 도와야 합니다. 테두리, 지브라 줄무늬, 마우스를 올린 행 강조가 도움이 됩니다.",
        "예: 고정된 머리글 행·첫 열, 옅은 테두리, 지브라 줄무늬, 고정 영역이 위에 떠 있는 듯한 은은한 그림자가 공간 파악을 돕습니다.",
      ] },
      { h: "비교 2) 비교할 정보를 가까이 붙이기", items: [
        "열 숨기기와 순서 바꾸기는 쉬워야 합니다(낮은 상호작용 비용, 드래그 앤 드롭을 못 쓰는 사용자도 접근 가능). 발견하기 쉽고, 일부 열이 숨겨졌음을 분명한 상태 표시로 알려야 합니다.",
        "레코드 숨기기·재정렬, 특정 변수 기준 정렬도 쉬워야 합니다. 필터와 관련 있지만 같지 않으며, 사용자가 레코드를 직접 숨길 수 있어야 합니다.",
        "예: 눈에 잘 띄는 열 숨기기 메뉴가 현재 상태('15개 열 숨김')를 보여줍니다. 열 순서 변경은 (1) 열 머리글을 직접 드래그(발견성 낮고 접근성 나쁘지만 익숙해지면 효율적)와 (2) 메뉴의 열 목록에서 드래그 두 방식이 있었습니다.",
      ] },
      { h: "작업 3. 한 행 보기·수정·추가", lead: "넓은 표에서 한 레코드를 표 형태로 보거나 편집하기는 어렵습니다. 한 레코드를 완결된 단위로 보여주는 방법과 장단점:", items: [
        "제자리 편집(행이 편집 가능 상태로 전환): 표가 좁을 때만 적합. 편집 모드의 행은 눈에 띄게 달라 보여 실수 편집을 막아야 합니다.",
        "모달 팝업: 인접 레코드를 가려 참조·복사를 못 하게 합니다. 사용자는 값 범위를 기억이 아닌 인식으로 정하려고 다른 레코드를 자주 봅니다. 그래서 깊은 편집에 모달은 일반적으로 권하지 않습니다.",
        "비모달 패널 또는 별도 창: 표 일부를 가리지만 표 데이터에는 계속 접근할 수 있습니다. 비모달 사이드 패널이 전체 레코드를 보여주면서 나머지 표도 보이게 하는 좋은 예입니다.",
        "행을 아코디언으로 펼치기: 다른 부분을 가리지 않지만, 사용자는 열어 둔 것을 닫지 않아 화면이 어수선해지고, 가까이 있지 않은 레코드를 참조하기 어렵습니다.",
      ] },
      { h: "작업 4. 레코드에 대한 작업 수행", lead: "삭제, 공유, 송장 발송, 마감일 변경처럼 편집 이외의 작업을 한 건 또는 여러 건에 합니다. 구현 방식은 두 가지입니다.", items: [
        "단일 레코드 작업: 한두 개면 행에 인라인으로 둘 수 있습니다. 더 많으면 (a) 텍스트 라벨 없이 빽빽해 누르기도 구분하기도 어렵거나 (b) 호버 동작이나 일반 '작업' 메뉴 뒤에 숨어 발견하기 어렵습니다(호버는 접근성도 낮음).",
        "일괄(batch) 작업: 레코드마다 체크박스로 선택한 뒤 표 위나 아래의 버튼·메뉴로 작업합니다. 공간 효율이 좋습니다. 전체 데이터에 같은 작업을 자주 한다면 '전체 선택' 한 번 클릭 단축이 편리합니다.",
      ] },
      { h: "요약: 표가 반드시 지원할 4가지", items: ["조건에 맞는 레코드 찾기", "데이터 비교", "한 행 보기·수정·추가", "레코드에 대한 작업 수행"] },
    ],
  },
  {
    id: "material", no: "03", org: "Google Material Design", title: "Data tables",
    url: "https://m1.material.io/components/data-tables.html", meta: "Material 1 원문 + Material 2 현행 가이드 + Material 3 상태",
    extra: [
      { label: "Material 2 · Data tables", url: "https://m2.material.io/components/data-tables" },
      { label: "Material 3 · Components", url: "https://m3.material.io/components" },
    ],
    summary: "원시 데이터 집합을 보여주는 표. Material 1 문서는 상태·치수 규격이 자세하고, Material 2는 원칙·구조·행동으로 재정리했습니다. 두 문서의 숫자가 다르므로 둘 다 적습니다.",
    groups: [
      { h: "Material 1: 용도와 구조", items: [
        "데이터 표는 원시 데이터 집합을 보여주며 주로 데스크톱 엔터프라이즈 제품에 나타납니다.",
        "카드 같은 표면에 넣을 수 있고, 대응하는 시각화, 데이터 조회·조작 기능을 포함할 수 있습니다. 카드 속 표는 위아래에 탐색·조작 도구를 둘 수 있습니다.",
        "지원 상호작용: 행 호버(데스크톱), 행 선택, 열 정렬, 열 호버(데스크톱), 긴 헤더 제목, 텍스트 편집, 메뉴.",
        "구조: 맨 위에 열 이름을 나열한 헤더 행, 그 아래 데이터 행. 사용자가 데이터를 선택·조작해야 하면 각 행에 체크박스를 둡니다.",
        "3열 이상의 데이터, 대응 시각화, 조회·조작 기능을 포함할 수 있습니다.",
        "정렬: 숫자 열은 오른쪽 정렬, 텍스트 열은 왼쪽 정렬.",
      ] },
      { h: "Material 1: 글자 규격", table: { caption: "Material 1 표 글자 규격", head: ["요소", "규격"], rows: [
        ["표 내용", "13sp Roboto Regular, 87% 검정"],
        ["열 헤더", "12sp Roboto Medium, 54% 검정"],
        ["정렬된 열 이름", "12sp Roboto Medium, 87% 검정"],
        ["정렬 아이콘", "16dp 컨테이너, 87% 검정"],
        ["열 이름 툴팁 아이콘", "16dp 컨테이너, 38% 검정"],
        ["입력 칸(편집 가능 셀) 문구", "13sp Roboto Regular, 38% 검정, 입력 칸에 구분선 없음"],
        ["인라인 메뉴", "13sp Roboto Regular, 87% 검정, 메뉴 간격·크기 지침 준수"],
        ["카드 제목", "20sp Roboto Regular, 87% 검정"],
        ["카드 헤더·푸터 액션 아이콘", "24dp 컨테이너, 54% 검정"],
        ["푸터 페이지 표시 라벨", "12sp Roboto Regular, 54% 검정"],
        ["편집 아이콘(선택)", "18dp 컨테이너, 54% 검정, 셀에서 내용 반대편 가장자리에 배치"],
      ] } },
      { h: "Material 1: 상호작용 규칙", items: [
        "행 호버(데스크톱): 행의 어느 부분에 올려도 행 배경을 표시합니다. 셀 단위 호버 상태가 따로 있으면 셀 호버와 행 호버를 동시에 표시합니다. 호버 배경은 Grey 200 (#EEEEEE).",
        "행 선택: 선택된 행에 배경색을 표시합니다. 선택 배경은 Grey 100 (#F5F5F5), 체크박스는 보조(secondary) 앱 색을 씁니다.",
        "정렬 열: 정렬을 켰다면 가장 중요한 데이터를 기본 정렬하고 헤더에 정렬 상태를 표시합니다. 이미 정렬된 열을 다시 누르면 순서를 뒤집고 정렬 아이콘을 회전시킵니다.",
        "열 이름 호버(데스크톱): 열 정의가 필요하면 호버 툴팁을 보여줍니다. 정렬이 켜져 있으면 호버 시 옅은 정렬 아이콘으로 정렬 가능함을 알립니다.",
        "긴 헤더 제목: 열 사이 권장 56dp 간격 안에 열 이름이 안 들어가면 (1) 전체 이름을 보이고 표 컨테이너를 가로 스크롤 가능하게 하거나 (2) 이름을 줄여 보이고 호버 시 전체를 보여줍니다.",
        "인라인 텍스트 편집: 기존 텍스트 수정이나 댓글 추가가 필요하면 표 안에 편집 가능 필드를 두고 플레이스홀더 문구로 표시합니다. 한 칸짜리 간단 편집 대화상자 또는 전체 대화상자를 클릭 시 띄웁니다.",
        "간단 편집 대화상자: 가장자리를 가장 가까운 구분선 또는 표 가장자리에 맞추고, 좌우 24dp 패딩, 텍스트 필드 하나, 앱 테마 적용, Enter로 확정.",
        "복잡한 편집 대화상자: 같은 정렬 규칙을 따르고 대화상자 지침을 적용하며 저장 버튼으로 확정.",
        "인라인 메뉴: 텍스트 편집 대신 미리 정해진 목록에서 고르게 할 때 메뉴 컴포넌트를 표에 직접 넣습니다.",
      ] },
      { h: "Material 1: 카드 속 표와 간격 규격", items: [
        "표는 카드 안에 넣을 수 있고, 표 탐색·조작 도구를 위아래에 둡니다.",
        "제목 대신 액션이 필요한 헤더라면 (1) 항상 보이는 액션을 두거나 (2) 항목이 선택될 때 활성화되는 맥락(contextual) 헤더를 씁니다.",
        "대체 헤더: 액션 버튼은 테두리 없는 버튼, 항목 선택 시 활성화. 맥락 헤더는 보조 앱 색의 50 값 배경, 선택 항목 수 표시, 선택 시 쓸 수 있는 맥락 아이콘 표시.",
      ], table: { caption: "Material 1 간격 규격", head: ["대상", "값"], rows: [
        ["카드 헤더 높이", "64dp"],
        ["데이터 행 높이", "48dp"],
        ["마지막 행 높이", "56dp"],
        ["표 카드 둘레 패딩", "24dp"],
        ["푸터 컨트롤 묶음 사이", "32dp"],
        ["푸터 행 수와 그 라벨 사이", "40dp"],
        ["열 사이 패딩", "최소 56dp. 열 안에서 가장 넓은 항목(데이터와 열 이름 포함)이 열 경계를 정함"],
        ["체크박스 아이콘", "24dp 컨테이너 안 18dp"],
      ] } },
      { h: "Material 2: 용도와 원칙", items: [
        "데이터 표는 행과 열로 데이터 집합을 보여줍니다. 훑기 쉽게 정리해 사용자가 패턴을 찾고 통찰을 얻게 합니다.",
        "표에 넣을 수 있는 것: 조회·조작 도구, 비대화형 요소(배지 등), 대화형 컴포넌트(칩, 버튼, 메뉴 등).",
        "원칙 조직적(Organized): 계층이나 가나다순처럼 의미 있는 방식으로 정리합니다.",
        "원칙 상호작용(Interactive): 사용자가 표시를 맞춤 조정할 수 있도록 상호작용을 허용합니다.",
        "원칙 직관적(Intuitive): 내용을 이해하기 쉬운 논리 구조로 쓰기 쉬워야 합니다.",
      ] },
      { h: "Material 2: 구성요소(Anatomy)와 열", items: [
        "구성: 헤더 행, 행, 페이지 나누기, 행 체크박스, 정렬 버튼, 컨테이너.",
        "기본 요소: 열 헤더 이름은 열 내용 종류를 설명하고, 각 행은 하나의 개체에 대한 데이터를 담습니다.",
        "대화형 요소: 페이지 나누기, 경고를 알리는 아이콘, 열 정렬, 체크박스.",
        "표 데이터 표시 방식을 조작하는 페이지 나누기·필터 칩은 표 바로 위나 아래에 둡니다.",
        "열 헤더 글자는 본문과 구분되도록 medium 굵기를 씁니다.",
        "열 너비보다 긴 글자는 말줄임표(…)로 자르고, 호버 시 툴팁으로 전체 이름을 보여줍니다.",
      ] },
      { h: "Material 2: 정렬·선택·행동", items: [
        "정렬 표시: 기본 정렬 열의 이름 옆에 아래·위 화살표 아이콘을 둡니다. 내림차순은 아래 화살표.",
        "정렬 반전: 헤더 이름이나 화살표를 누르면 순서가 바뀌고 화살표가 방향을 뒤집습니다.",
        "정렬 중 진행 표시: 정렬이 시작되면 선형 진행 표시기(linear progress)로 처리 중임을 알립니다.",
        "행 체크박스 선택: 선택된 행은 배경색을 표시합니다. 화면 확대를 쓰는 사람은 선택된 체크박스가 확대 영역 밖에 있을 수 있어서, 배경 채움이 선택됨을 알리는 추가 수단이 됩니다.",
        "행 호버(데스크톱): 행에 올리면 배경색을 표시합니다.",
        "열 호버(데스크톱): 정렬이 켜져 있으면 화살표 아이콘이 나타날 수 있고, 툴팁이 잘린 이름 전체나 열의 상세 설명을 보여줄 수 있습니다.",
        "포커스: 키보드로 체크박스 같은 대화형 항목 사이를 탭으로 이동할 때 포커스 표시가 나타나야 합니다.",
        "인라인 메뉴: 미리 정한 메뉴 항목에서 고르게 하는 메뉴를 표 셀에 직접 넣습니다.",
        "페이지 나누기: 모든 페이지에 빠르게 접근하되 더 많은 페이지가 있음을 알립니다. 좌우 화살표, 현재 보이는 범위를 포함한 전체 행 수, 페이지당 행 수를 표시합니다. 표의 아래쪽에 두며, 페이지당 행 수는 드롭다운 메뉴에서 고릅니다(예: 25행씩, 총 100행). 진행 표시기를 정렬이나 페이지 나누기에 쓸 수 있습니다.",
      ] },
      { h: "Material 2: 규격(Specs)", table: { caption: "Material 2 규격", head: ["대상", "값"], rows: [
        ["기본 행 높이", "52dp"],
        ["열 헤더 행 높이", "56dp (일반 행보다 4dp 큼)"],
        ["열 사이 패딩", "32dp 이상"],
        ["헤더 이름 좌우 패딩", "16dp"],
        ["셀 위아래 패딩", "6dp (밀도를 높이려고 최소화)"],
        ["셀 왼쪽 패딩", "8dp"],
        ["최소 터치 영역", "48 x 48dp (요소 범위를 넘어 확장 가능)"],
        ["모서리 반경", "4dp (기본은 직사각형에 약간 둥근 모서리)"],
        ["높이(엘리베이션)", "0dp (단색 배경 위에 있고 다른 면 앞뒤로 움직이지 않음)"],
        ["컨테이너 외곽선", "1dp (다른 표나 컴포넌트와 구분용)"],
        ["컨테이너 크기", "내용에 맞춰 확장"],
        ["숫자 정렬", "숫자는 오른쪽 정렬, 열 헤더 이름도 오른쪽 맞춤(훑기 쉬움)"],
      ] } },
      { h: "Material 2: 테마 예시(Rally)와 구현", items: [
        "Rally 금융 앱 사례: 컨테이너, 표 텍스트, 헤더 텍스트, 구분선 네 곳에 색을 커스텀했습니다. 컨테이너 #3C3C46, 표 텍스트 #FFFFFF 100%, 헤더 텍스트 #FFFFFF 60%, 구분선 #FFFFFF 12%.",
        "타이포그래피: Body 2, Roboto Condensed Regular 14, Title case. 모양: 컨테이너 모서리 0dp 컷(cut) 형태.",
        "웹 구현(MDC): 표 컨테이너 클래스가 가로 넘침을 담당합니다(mdc-data-table__table-container). 헤더 고정은 mdc-data-table--sticky-header 수식 클래스(IE11 미지원), 숫자 열은 --numeric 클래스를 씁니다.",
        "웹 구현: 행 선택은 헤더 체크박스로 전체 선택·해제, 각 행 체크박스 상태에 따라 헤더 체크박스가 자동 갱신됩니다. 정렬은 data-column-id 로 열을 식별하고 SORTED 이벤트가 오면 호출 측이 본문 행을 다시 그립니다. 정렬 상태 라벨(sort-status-label)은 스크린 리더 사용자에게만 보이는 시각적 숨김 요소입니다. 페이지 나누기는 아이콘 버튼과 Select 컴포넌트를 직접 초기화해서 씁니다. 진행 표시기는 showProgress()/hideProgress()를 쓰며 스크림이 표 내용을 가립니다.",
        "접근성: ARIA 역할·상태·속성은 WAI-ARIA Authoring Practices의 table 가이드를 참조하라고 안내합니다. Flutter는 큰 글자, 스크린 리더, 충분한 대비 설정을 지원합니다.",
      ] },
      { h: "Material 3 확인 결과", items: [
        "확인 시점(2026-11-14) 기준으로 m3.material.io/components 페이지에서 '데이터 표(Data table)' 항목을 찾지 못했습니다(페이지가 스크립트로 그려져 가져온 텍스트에 없을 가능성은 남습니다).",
        "공식 material-web 저장소 이슈 #3867에서 관리자가 2023-01-03에 'Material 3 세트용 데이터 표 컴포넌트 구현 계획'이 있다고 답했습니다. 현재 구현 여부는 이 확인으로는 알 수 없습니다.",
        "그래서 이 페이지는 현행 공식 표 규격으로 Material 2를, 상태·상호작용 세부 규격은 Material 1을 기준으로 정리합니다. 값이 다른 곳(행 높이 48 vs 52dp, 열 간격 56 vs 32dp 등)은 둘 중 하나로 통일해 쓰세요.",
      ] },
    ],
  },
  {
    id: "w3c", no: "04", org: "W3C WAI", title: "Tables Tutorial",
    url: "https://www.w3.org/WAI/tutorials/tables/", meta: "Eric Eggert · Shadi Abou-Zahra · WCAG 1.3.1 정보와 관계(A)",
    extra: [
      { label: "한 개의 헤더", url: "https://www.w3.org/WAI/tutorials/tables/one-header/" },
      { label: "두 개의 헤더", url: "https://www.w3.org/WAI/tutorials/tables/two-headers/" },
      { label: "불규칙한 헤더", url: "https://www.w3.org/WAI/tutorials/tables/irregular/" },
      { label: "다단계 헤더", url: "https://www.w3.org/WAI/tutorials/tables/multi-level/" },
      { label: "캡션과 요약", url: "https://www.w3.org/WAI/tutorials/tables/caption-summary/" },
    ],
    summary: "접근 가능한 표는 헤더 셀과 데이터 셀을 구분하고 둘의 관계를 정의하는 HTML 마크업이 필요합니다. 헤더 셀은 th, 데이터 셀은 td로 표시하고, 복잡한 표는 scope, id, headers 속성으로 명시적으로 연결합니다. 레이아웃용 표에는 적용하지 않습니다(레이아웃은 CSS).",
    groups: [
      { h: "왜 중요한가", items: [
        "구조 마크업 없이 시각 단서만으로는 접근 가능한 표가 아닙니다. 구조가 있어야 소프트웨어가 헤더와 데이터 셀을 프로그램으로 판별할 수 있습니다.",
        "스크린 리더는 셀을 하나씩 읽으며 연결된 헤더 셀을 함께 알려 주어 맥락을 잃지 않게 합니다.",
        "일부 사용자는 사용자 스타일시트로 헤더를 더 눈에 띄게 하거나, 글자 크기·색을 바꾸거나, 격자 대신 목록으로 표시합니다. 표 코드가 구조화되어야 이런 대체 렌더링이 가능합니다.",
        "PDF, 워드 등 다른 문서 형식에도 표 구조 마크업이 있지만, 형식을 변환할 때 마크업이 사라지기 쉽습니다. 많은 저작 도구와 CMS는 표를 만들 때 헤더 셀을 지정하는 기능을 제공합니다.",
        "성공 기준: WCAG 1.3.1 정보와 관계(레벨 A). 기법: H51(표 마크업으로 표 형식 정보 표현), H63(scope로 헤더 셀과 데이터 셀 연결), H39(caption으로 표와 캡션 연결).",
      ] },
      { h: "한 개의 헤더: 상단 행만 헤더", lead: "행 또는 열에 단순한 헤더 하나만 있고 데이터가 그 자체로 모호하지 않은 표입니다. 아래 표는 작고 열마다 데이터 성격이 분명해서 th만으로도 허용됩니다. 일부 스크린 리더는 방향이 모호해 'Venue' 셀에서 'Date – Event – Venue'를 읽을 수 있습니다.", codeLabel: "상단 행만 th", code: `<table>
  <tr>
    <th>Date</th>
    <th>Event</th>
    <th>Venue</th>
  </tr>
  <tr>
    <td>12 February</td>
    <td>Waltz with Strauss</td>
    <td>Main Hall</td>
  </tr>
  […]
</table>` },
      { h: "한 개의 헤더: 첫 열만 헤더", lead: "같은 데이터를 왼쪽 열을 헤더로 놓은 표도 작고 단순할 때만 th/td 구분으로 충분합니다.", codeLabel: "첫 열만 th", code: `<tr>
  <th>Date</th>
  <td>12 February</td>
  <td>24 March</td>
  <td>14 April</td>
</tr>
<tr>
  <th>Event</th>
  <td>Waltz with Strauss</td>
  […]` },
      { h: "한 개의 헤더: 모호한 데이터", lead: "이름, 성, 도시처럼 어느 헤더에 해당하는지 모르면 구분할 수 없는 데이터는 scope=col로 헤더 방향을 정의합니다. 헤더 행이나 열이 하나인 큰 표에도 scope가 필요합니다.", codeLabel: "scope=col과 caption", code: `<table>
  <caption>Teddy bear collectors:</caption>
  <tr>
    <th scope="col">Last Name</th>
    <th scope="col">First Name</th>
    <th scope="col">City</th>
  </tr>
  <tr>
    <td>Phoenix</td>
    <td>Imari</td>
    <td>Henry</td>
  </tr>
  […]
</table>` },
      { h: "두 개의 헤더: 상단 행과 첫 열", lead: "단순한 행 헤더와 열 헤더가 모두 있으면 헤더와 데이터 셀의 관계가 금방 모호해집니다. 모든 헤더 셀을 th로 표시하고 scope로 방향을 선언합니다. 열 머리글은 scope=col, 행 머리글은 scope=row. 'Open/Closed'는 요일과 시간에 연결되어야 의미가 있습니다. 왼쪽 위 빈 칸은 td로 둡니다.", codeLabel: "scope=col + scope=row", code: `<table>
  <caption>Delivery slots:</caption>
  <tr>
    <td></td>
    <th scope="col">Monday</th>
    <th scope="col">Tuesday</th>
    […]
  </tr>
  <tr>
    <th scope="row">09:00 – 11:00</th>
    <td>Closed</td>
    <td>Open</td>
    […]
  </tr>
  […]
</table>` },
      { h: "두 개의 헤더: 행 머리글이 두 번째 열에 있을 때", lead: "ID가 첫 열이고 이름이 두 번째 열인 표. 상단 행은 scope=col, 두 번째 열의 이름 셀은 scope=row로 두어 해당 행의 왼쪽과 오른쪽 데이터 셀 모두에 연결합니다.", codeLabel: "오프셋 행 머리글", code: `<tr>
  <td>215</td>
  <th scope="row">Abel</th>
  <td>5</td>
  <td>2</td>
  […]
</tr>` },
      { h: "불규칙한 헤더: 2단 열 머리글", lead: "머리글 셀이 여러 열이나 행에 걸치는 표입니다. 머리글 셀을 여러 열에 걸치게 하려면 colspan, 그 묶음 전체에 연결하려면 scope=colgroup, 하위 머리글은 scope=col을 씁니다. 표 시작에서 열 구조를 col, colgroup(span)으로 먼저 정의합니다. 걸친 열 수는 span 속성에 적습니다.", items: [
        "colgroup 요소는 개별 열을 식별하는 col 요소를 포함할 수 있습니다.",
        "colgroup에 포함되지 않은 col 수와 colgroup의 span이 가리키는 열 수의 합이 표의 전체 열 수와 같아야 합니다.",
      ], codeLabel: "colgroup / colspan / scope=colgroup", code: `<table>
  <col>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <tr>
    <td rowspan="2"></td>
    <th colspan="2" scope="colgroup">Mars</th>
    <th colspan="2" scope="colgroup">Venus</th>
  </tr>
  <tr>
    <th scope="col">Produced</th>
    <th scope="col">Sold</th>
    <th scope="col">Produced</th>
    <th scope="col">Sold</th>
  </tr>
  <tr>
    <th scope="row">Teddy Bears</th>
    <td>50,000</td>
    <td>30,000</td>
    <td>100,000</td>
    <td>80,000</td>
  </tr>
  […]
</table>` },
      { h: "불규칙한 헤더: 여러 행·열에 걸친 머리글", lead: "행에 걸친 머리글이 모든 행의 셀과 맞게 연결되려면 행을 묶어야 합니다. 해당 행들을 tbody로 감싸 행 그룹을 정의하고, 여러 행에 걸친 머리글 셀은 scope=rowgroup을 씁니다. 헤더가 여러 헤더 행에 걸치면 tbody 대신 thead로, 표 바닥 영역이라면 tfoot으로 감쌉니다. 구조가 복잡하면 요약(summary)으로 표 배치를 자세히 설명할 수 있습니다.", items: [
        "thead와 tfoot은 표 하나에 한 번만 쓸 수 있고, tbody는 개수 제한 없이 각각 하나의 행 그룹을 정의합니다.",
        "열에 걸친 머리글이 없어도 모든 표에 thead, tbody, tfoot을 쓰면 언제 써야 할지 헷갈리지 않아 도움이 됩니다.",
      ], codeLabel: "thead + tbody 행 그룹 + scope=rowgroup", code: `<table>
  <caption>Poster availability</caption>
  <col>
  <col>
  <colgroup span="3"></colgroup>
  <thead>
    <tr>
      <th scope="col">Poster name</th>
      <th scope="col">Color</th>
      <th colspan="3" scope="colgroup">Sizes available</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Zodiac</th>
      <th scope="row">Full color</th>
      <td>A2</td><td>A3</td><td>A4</td>
    </tr>
    […]
  </tbody>
  <tbody>
    <tr>
      <th rowspan="2" scope="rowgroup">Angels</th>
      <th scope="row">Black and white</th>
      <td>A1</td><td>A3</td><td>A4</td>
    </tr>
    […]
  </tbody>
</table>` },
      { h: "다단계 헤더: id와 headers", lead: "하나의 데이터 셀에 여러 머리글이 연결되어 가로·세로 방향만으로는 연결할 수 없는 복잡한 표입니다. 각 th에 문서 전체에서 고유한 id를 주고, 데이터 셀은 headers 속성에 공백으로 구분한 id 목록을 적습니다.", items: [
        "이 방식이 필요한 표: 표 중간에 열 머리글이 반복되거나 바뀌는 표, 데이터 셀마다 머리글이 3개 이상 연결되는 표.",
        "표를 식별하는 caption과 배치를 설명하는 summary도 필요할 수 있습니다.",
        "예 1(중간에 머리글이 바뀌는 공급처 연락처 표): 머리글 셀 자체의 headers는 빈 셀(id=blank)로 지정해 일부 보조기기가 그 머리글에 대해 머리글을 읽지 않도록 합니다.",
        "예 2(숙박 가용성 표): 지역명(Paris, Rome) 행을 소제목 th로 쓰고, 데이터 셀이 지역·방 크기·유형 세 헤더를 모두 headers에 나열합니다.",
        "권장: 가능하면 정보를 재구성해 모두가 이해하기 쉽고 코딩하기 쉽게 하세요. 예를 들어 지역별로 작은 표 둘로 나누면 더 쉽고, WYSIWYG 편집기 같은 도구도 단순한 표를 훨씬 잘 지원합니다.",
      ], codeLabel: "id / headers 속성", code: `<td id="blank"> </td>
<th id="co1" headers="blank">Example 1 Ltd</th>
<th id="co2" headers="blank">Example 2 Co</th>
[…]
<th id="c1" headers="blank">Contact</th>
[…]
<td headers="co1 c1">James Phillips</td>
<td headers="co2 c1">Marie Beauchamp</td>

<!-- 세 헤더 연결 -->
<th id="par" colspan="5" scope="colgroup">Paris</th>
<th id="pbed1">1 bedroom</th>
<td headers="par pbed1 stud">11</td>
<td headers="par pbed1 apt">20</td>` },
      { h: "캡션: 표의 제목", lead: "caption은 표의 제목처럼 작동하며 대부분의 상황에서 유용합니다. 대부분의 스크린 리더가 캡션 내용을 알려 주고, 사용자가 표를 찾아 읽을지 판단하게 돕습니다. '표 모드'로 이동하는 사용자에게는 캡션이 표를 식별하는 주된 수단입니다. caption은 table의 직접 자식으로 둡니다. 짧은 제목으로 쓰세요(예: 'Concerts').", items: [
        "WCAG를 만족하는 데 모든 경우에 필수는 아니지만 간단하게 쓸 수 있고 자주 필요한 정보입니다.",
      ], codeLabel: "caption", code: `<table>
  <caption>Concerts</caption>
  <tr>
    <th>Date</th>
    <th>Event</th>
    <th>Venue</th>
  </tr>
  […]
</table>` },
      { h: "요약(summary): 복잡한 표의 구조 안내", lead: "요약은 표 데이터가 어떻게 구성됐는지 알려 길 찾기를 돕습니다. 보통 복잡한 표에만 필요합니다. 캡션과 요약을 함께 쓰면 요약이 캡션의 내용을 반복하지 않아야 합니다. 세 가지 방법이 있습니다.", items: [
        "1) caption 안에 요약을 넣기: caption이 제목과 구성 설명을 함께 맡고, 시각 사용자에게도 요약이 보입니다. span으로 요약 스타일을 다르게 줄 수 있지만 필수는 아닙니다.",
        "2) aria-describedby로 요약 연결: id가 있는 아무 요소를 요약으로 지정합니다. 표 앞에 있을 필요는 없지만 가까이 있어야 스크린 리더를 쓰지 않는 사용자도 빨리 찾습니다. 다른 방법보다 보조기기 지원이 약할 수 있습니다.",
        "3) figure/figcaption으로 감싸기: figcaption에 캡션과 요약을 둡니다. 표 모드에서는 이렇게 둔 캡션으로 표를 식별하지 못하는 경우가 많으므로 aria-labelledby(캡션)와 aria-describedby(요약)로 명시 연결하세요. 다만 캡션과 요약이 여러 번 읽힐 수 있습니다. HTML5 기능이라 지원이 약할 수 있습니다.",
      ], codeLabel: "요약 세 가지 방식", code: `<!-- 1) caption 안에 -->
<caption>Availability of holiday accommodation <br>
  <span>Column one has the location and size of accommodation, other columns show the type and number of properties available</span>
</caption>

<!-- 2) aria-describedby -->
<p id="tblDesc">Column one has the location and size ...</p>
<table aria-describedby="tblDesc"> […] </table>

<!-- 3) figure + ARIA -->
<figure>
  <figcaption>
    <strong id="paris-caption">Paris: Availability of holiday accommodation</strong><br>
    <span id="paris-summary">Column one has the location and size ...</span>
  </figcaption>
  <table aria-labelledby="paris-caption" aria-describedby="paris-summary">
  […]
  </table>
</figure>` },
    ],
  },
];

export const aiRules: { rule: string; src: string }[] = [
  { rule: "데이터를 담는 표에는 반드시 실제 table 요소를 쓴다. 레이아웃에는 table 대신 CSS를 쓴다.", src: "W3C" },
  { rule: "머리글 셀은 th, 데이터 셀은 td. 머리글 방향은 scope=col / scope=row로 선언한다. 헤더가 한 줄뿐이어도 큰 표에는 scope를 쓴다.", src: "W3C" },
  { rule: "표 제목은 caption(table의 직접 자식)으로 쓰고, 복잡한 표에는 caption과 겹치지 않는 요약(aria-describedby 등)을 더한다.", src: "W3C" },
  { rule: "병합 머리글은 colgroup/rowgroup과 thead/tbody/tfoot으로 구조를 정의하고 scope=colgroup/rowgroup을 쓴다. 더 복잡하면 id와 headers를 쓰되, 가능하면 표를 쪼갠다.", src: "W3C" },
  { rule: "첫 열은 사람이 읽을 수 있는 식별자(이름)로 둔다. 자동 생성 ID를 첫 열로 두지 않는다.", src: "NN/g" },
  { rule: "열 순서는 중요도 순, 관련 열은 인접하게 배치한다.", src: "NN/g" },
  { rule: "표가 화면보다 크면 머리글 행을 고정하고, 가로 스크롤이 있으면 첫 열(행 머리글)도 고정한다.", src: "NN/g" },
  { rule: "가로 스크롤이 필요하면 마지막 열을 살짝 잘리게 하거나 표 안에 화살표를 둬서 알린다. 점 표시나 페이지 상단 화살표만으로는 부족하다.", src: "NN/g" },
  { rule: "모바일에서 폰 회전을 요구하지 않는다. 열은 확대 없이 읽히는 너비를 유지한다. 열 머리글의 큰 이미지는 모바일에서 줄이거나 이름만 쓴다.", src: "NN/g" },
  { rule: "한 화면에 다 안 들어가면 사용자가 볼 행·열을 고르게 하거나(열 선택 메뉴), 범주별 아코디언으로 묶는다.", src: "NN/g" },
  { rule: "필터가 적용 중이면 눈에 보이게 표시하고, 숨겨진 열이 있으면 개수를 보여준다. 열 숨기기와 순서 바꾸기는 드래그 없이도 가능해야 한다.", src: "NN/g" },
  { rule: "행을 편집할 때 모달로 인접 행을 가리지 않는다. 비모달 사이드 패널을 우선 쓴다. 행 액션이 둘을 넘으면 라벨 있는 메뉴를, 여러 건 처리에는 체크박스와 일괄 작업 버튼을 쓴다.", src: "NN/g" },
  { rule: "숫자 열과 그 헤더는 오른쪽 정렬, 텍스트 열은 왼쪽 정렬. 열 사이 간격은 넉넉하게(Material: 32dp 이상 또는 56dp).", src: "Material" },
  { rule: "행 호버·행 선택은 배경색으로 표시하고, 정렬 열은 화살표 아이콘과 반전 동작을 제공하며, 긴 헤더는 말줄임 + 툴팁 또는 가로 스크롤로 처리한다.", src: "Material" },
  { rule: "선택·정렬 상태는 색에만 의존하지 않는다. 키보드 포커스 표시와 48dp 이상의 터치 영역을 둔다.", src: "Material" },
];

export const aiPrompt = `표를 만들 때 아래 규칙을 지켜줘.
[의미 구조] 레이아웃이 아니라 데이터에는 table을 쓰고, 머리글은 th scope=col/row, 제목은 caption으로 둬. 병합 머리글은 colgroup/rowgroup과 thead/tbody로 구조를 잡고, 너무 복잡하면 표를 쪼개.
[읽기] 첫 열은 사람이 읽는 이름, 열 순서는 중요도 순. 숫자는 오른쪽, 텍스트는 왼쪽 정렬. 행 구분선·지브라·호버로 위치를 놓치지 않게 해.
[모바일] 헤더 행과 첫 열을 고정하고, 가로 스크롤이면 마지막 열을 살짝 잘리게 해서 알려줘. 폰 회전을 요구하지 말고, 필요하면 열 선택이나 아코디언으로 보여줄 데이터를 고르게 해.
[상호작용] 정렬 상태 아이콘, 필터 적용 표시, 숨겨진 열 개수를 보여주고, 편집은 비모달 패널을 쓰며, 여러 행 작업은 체크박스 + 일괄 작업 버튼으로 해줘.
[접근성] 키보드 포커스, 48dp 이상 터치 영역, 색에만 의존하지 않는 상태 표시를 지켜줘.`;

export const demoCss = `.table-scroll { overflow: auto; max-height: 20rem; }
.table-scroll thead th { position: sticky; top: 0; z-index: 2; background: var(--card); }
.table-scroll tbody th { position: sticky; left: 0; z-index: 1; background: var(--card); }
.table-scroll thead th:first-child { left: 0; z-index: 3; }
td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
tbody tr:nth-child(even) { background: var(--muted); }
tbody tr:hover { background: var(--accent); }`;
