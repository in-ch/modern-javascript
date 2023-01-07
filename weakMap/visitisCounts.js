// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // 위크맵에 사용자의 방문 횟수를 저장함

// 사용자가 방문하면 방문 횟수를 늘려줍니다.
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// 이렇게하면 visitsCountMap을 수동으로 청소핼 줄 필요가 없어진다.
// john을 나타내는 객체가 도달 가능하지 않은 상태가 되면 자동으로 메모리에서 삭제되기 때문이다. 