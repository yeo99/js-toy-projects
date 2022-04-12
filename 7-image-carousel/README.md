## carousel

- .carousel-wrapper 안에 carousel이 있고, 이 carousel 안에 item들을 구성하는 방식으로 구현
- item들은 캐러셀에 쓰일 이미지들이다.
- carousel 안에는 공통적인 carousel_item 클래스 외에도, active, next, previous가 있다.
- 순서대로 이전 이미지, 다음 이미지, 현재 이미지이다.
- active(현재 보고있는 이미지)가 아닌 이미지들은 opacity 0으로 가려져 있으며, 이미지를 넘길 시 opacity속성이 변경되며 transition효과로 넘어가는듯한 애니메이션을 구현한다.
- previous(이전 이미지)의 경우 transform: translateX(100%)속성이 부여되어있는데, 이는 왼쪽에서 넘어오는듯한 효과를 주기 위해 사용되었다.
- 캐러셀은 class로 구현되어있다.