// 📁 cache.js
let cache = new WeakMap();

// 연산을 수행하고 그 결과를 위크맵에 저장합니다.
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 연산 수행 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* ... 객체 ... */};

let result1 = process(obj);
let result2 = process(obj);

// 객체가 쓸모없어지면 아래와 같이 null로 덮어씁니다.
obj = null;

// 이 예시에선 맵을 사용한 예시처럼 cache.size를 사용할 수 없습니다.
// 하지만 obj가 가비지 컬렉션의 대상이 되므로, 캐싱된 데이터 역시 메모리에서 삭제될 겁니다.
// 삭제가 진행되면 cache엔 그 어떤 요소도 남아있지 않을겁니다.