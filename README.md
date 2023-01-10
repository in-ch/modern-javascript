# 엄격 모드

자바스크립트는 꽤 오랫동안 호환성 이슈 없이 발전해왔다. 기존의 기능을 변경하지 않으면서 새로운 기능이 추가되었다. 덕분에 기존에 작성한 코드를 망치지 않는 장점이 있으나 창시자들이 했던 실수나 불완전한 결정이 계속 남게 되는 단점이 있다.

이런 상황은 ECMAScript5(ES5)가 등장하기 전인 2009년까지 지속되었다.
ES5에서는 새로운 기능이 추가되고 기존 기능 중 일부가 변경되었다. 기존 기능을 변경하였기 때문에 하위 호환성 문제가 생긴다. 그래서 변경사항 대부분은 ES5의 기본 모드에선 활성화되지 않도록 설계되었다. 대신 use string라는 지시자를 통해 스크립트 전체가 모던한 방식으로 동작하도록 할 수 있다.

### use strict

한마디로 엄격모드이다.
엄격한 parsing 및 error handling을 자발적으로 시행하도록 적용함으로써 일반적인 코딩 실수나 안전하지 않은 동작을 포착한다.

- 장점
  1. 디버깅이 쉬워진다.
  2. js 엔진의 최적화
  3. 발생 가능한 에러 예방

```
"use strict";

// 이 코드는 모던한 방식으로 실행됩니다.
...
```

- use strict는 스크립트 최상단에 있어야 한다. 단, 함수 본문 맨 앞에 있을 수도 있다. 잘 안 쓰지만,,
- use strict를 취소할 방법은 없다.
- 브라우저 콘솔을 사용하는 경우 use strict가 적용되어 있지 않다.

# nullish 병합 연산자

??를 통해 '확정되어 있는' 변수를 찾을 수 있다.

ex)

```
let firstName = null;
let lastName = null;
let nickName = "바이올렛";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "익명의 사용자"); // 바이올렛
```

### '??'와 '||'의 차이

둘은 동작이 꽤 비슷하나 ||은 0을 falsey하게 인식하기 때문에 숫자 0를 다룰 때 매우 조심해야 한다.

ex)

```
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

위의 예제에서 ||는 0을 false로 인식했기 때문에 100을 리턴하게 됐다.
반면에 ??는 정확하게 null이나 undefined일 경우에만 100이 된다.

### nullish 병합 연산자의 우선순위

?? 연산자는 우선순위가 낮기 때문에 ()와 같이 써야한다.

# 심볼형

> 유일한 식별자(unique identifier)를 만들고 싶을 때 사용한다.

```
let id = Symbol();
```

> 또한 심볼을 만들 때 심볼 이름이라 불리는 설명을 붙일 수도 있다. 심볼 일므은 디버깅 시 매우 유용하게 쓰일 수 있다.

```
let id = Symbol("id");
```

> 심볼은 똑같은 설명으로 여러개 만들어도 기본적으로 각 값들은 다르다.

```
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

> 심볼은 문자형으로 자동 형 변환이 되지 않는다.

```
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string
```

### 심볼의 쓰임새

> 심볼은 정보 은닉 등에 쓰일 수 있다. (외부 코드에서 접근 불가능하고 값도 덮어쓰일 수 없도록 할 수 있다.)

```
let user = { // 서드파티 코드에서 가져온 객체
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // 심볼을 키로 사용해 데이터에 접근할 수 있습니다.
```

> 그런데 굳이 id를 쓰면 되는데 Symbol("id")를 사용한 걸까?
> 이유는 외부 제 3의 스크립트가 user를 식별해야 하는 상황이 벌어질 경우 충돌할 수도 있기 떄문이다.

심볼은 유일성이 보장되므로 식별자와 제 3의 스크립트에서 만든 식별자가 충돌하지 않는다.

- Symbols in a literal
  > 객체 리터럴 {...}을 사용해 객체를 만든 경우, 대괄호를 사용해 심볼형 키를 만들어야 한다.

```
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // "id": 123은 안됨
};
```

- 심볼은 for...in에서 배제된다.

```
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name과 age만 출력되고, 심볼은 출력되지 않습니다.
```

> 비슷한 원리로 Object.keys(user)에서도 키가 심볼인 프로퍼티는 배제된다.
> 단 Object.assign은 다르다. (심볼도 같이 할당할 수 있다.)

```
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

## 정리

Symbol은 원시형 데이터로, 유일무이한 식별자를 만드는 데 사용된다.
Symbol()을 호출하면 심볼을 만들 수 있다.
심볼은 이름이 같아도 값이 항상 다르다.
심볼의 주요 사용 케이스는 다음과 같다.

1. 객체의 '숨김' 프로퍼티: 외부 스크립트나 라이브러리에 속한 객체에 새로운 프로퍼티를 추가해 주고 싶다면 심볼을 만들고, 이를 프로퍼티 키로 사용하면 된다.
   for..in의 대상이 되지 않으므로 위도치 않게 프로퍼티가 수정되는 것을 미리 예방할 수 있다. -> 이런 특징을 이용하면 원하는 것을 객체 안에 은밀하게 숨길 수 있다.
2. 자바스크립트 내부에서 사용되는 시스템 심볼은 Symbol.\*로 접근할 수 있다, 시스템 심볼을 이용하면 내장 메서드 등의 기본 동작을 입맛대로 변경할 수 있다.

# 참조에 의한 객체 복사

> 객체와 원시 타입의 근본적인 차이 중 하나는 객체는 '참조에 의해' 저장되고 복사되고 원시값(string, number,...) 등은 값 그대로 저장, 할당되고 복사된다.

> 그렇다면 객체 복사는 어떤 식으로 복사될까?
> ex)

```
const user = {
  name: "John"
}
let admin = user; // 참조값을 복사함
```

![스크린샷 2023-01-02 오후 10 59 40](https://user-images.githubusercontent.com/49556566/210241281-dc600b91-bda1-4131-ac57-fb460f6cd419.png)
![스크린샷 2023-01-02 오후 10 59 43](https://user-images.githubusercontent.com/49556566/210241287-30386e86-d835-47d6-85b1-07d823f61d79.png)

단, 객체 비교 시 ==와 ===는 모두 동일하게 동작한다.

```
let a = {};
let b = a; // 참조에 의한 복사

alert( a == b ); // true, 두 변수는 같은 객체를 참조합니다.
alert( a === b ); // true
```

그러나 두 객체 모두 비어있다면 독립된 객체이기 떄문에 일치, 동등 비교하면 false가 나오게 된다.

```
let a = {};
let b = {}; // 독립된 두 객체

alert( a == b ); // false
```

### 객체의 복사

> 그렇다면 객체가 할당된 변수를 복사하면 동일한 객체에 대한 참조 값이 하나 더 만들어지는데 이렇게 하는 게 아니라 객체를 그대로 복사하고 싶다면 어떻게 해야할까?
> Object.assign을 사용하면 된다 .

```
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
```

### 깊은 복사

> 만약에 객체 안에 또다른 객체가 있다라고 한다면 user[key]의 각 값을 검사하면서, 그 값이 객체인 경우 객체의 구조도 복사해주는 반복문을 사용해야 한다.
> 이런 방식을 '깊은 복사'라고 한다.

### 요약

> 객체는 참조에 의해 할당되고 복사된다. 변수엔 '객체' 자체가 아닌 메모리상의 주소인 '참조'가 저장된다. 따라서 객체가 할당된 변수를 복사하거나 함수의 인자로
> 넘길 땐 객체가 아닌 객체의 참조가 복사된다.
> 그리고 복사된 참조를 이용한 모든 작업(프로퍼티 추가, 삭제 등)은 동일한 객체를 대상으로 이뤄진다.
> 객체의 진짜 복사본을 만드려면 얉은 복사를 가능하게 해주는 Object.assign이나 '깊은 복사'를 해야 한다. (얕은 복사는 중첩 객체를 처리하지 못하기 때문에)

# 얕은 복사와 깊은 복사 방법 정리

> 얕은 복사 : 배열이나 객체의 얕은 복사본을 만드는 것은 객체 내부의 기본 값에 대한 새로운 참조를 만들고 복사한다는 것을 의미한다. 즉, 원래 배열에 대한 변경 사항은 복사된 배열에 영향을 미치지 않으며, 배열에 대한 참조만 복사된 경우 할당 연산자(=)에서 발생하는 것과 같이 비슷하게 동작한다.

> 다른 객체 또는 배열을 포함하는 객체 및 배열의 경우 복사하려면 깊은 복사가 필요하다. 그렇지 않으면 중첩된 참조를 변경하면 원래 객체 또는 배열에 중첩된 데이터가 변경된다.

### 얕은 복사 방법

1. 확산 연산자(...) 사용

```tsx
const array = [1, 2, 3];
const copyWithEquals = array;
const spreadCopy = [...array];

console.log(array === copyWithEquals); // true
console.log(array === spreadCopy); // false
```

2. slice() 사용

```tsx
const array = [1, 2, 3];
const copyWithEquals = array;
const sliceCopy = array.slice();

console.log(array === copyWithEquals); // true
console.log(array === sliceCopy); // false
```

3. assign() 사용

```tsx
const array = [1, 2, 3];
const copyWithEquals = array;
const assignCopy = [];
Object.assign(assignCopy, array);

console.log(array === copyWithEquals); // true
console.log(array === assignCopy); // false
```

4. Array.from() 사용

```tsx
const array = [1, 2, 3];
const copyWithEquals = array;
const fromCopy = Array.from(array);

console.log(array === copyWithEquals); // true
console.log(array === fromCopy); // false
```

# 가비지 컬렉션

> 자바스크립트에서는 GC를 통해서 자동으로 메모리 관리를 하게 된다.
> 자바스크립트 엔진 내에선 garbage collector가 끊임없이 동작하고 모든 객체를 모니터링한 후 도달할 수 없는 객체는 삭제한다.

### 도달 가능성?(reachability)

> '도달 가능한'값은 쉽게 말해 어떻게든 접근하거나 사용할 수 있는 값을 의미한다.
> 도달 가능한 값은 메모리에서 삭제되지 않는다.

1. 아랫값들은 태생부터 도달 가능하기 때문에, 명백한 이유 없이는 삭제되지 않는다.

   - 현재 함수의 지역 변수와 매개변수
   - 중첩 함수의 체인에 있는 함수에서 사용되는 변수와 매개변수
   - 전역 변수
   - 기타 등 등
     이러한 값들은 루트(root)라고 부른다.

2. 루트가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값은 도달 가능한 값이 된다.
   전역 변수에 객체가 저장되어 있다고 가정해보자. 이 객체의 프로퍼티가 또 다른 객체를 참조하고 있다면, 프로퍼티가 참조하는 객체는
   도달 가능한 값이 된다. 이 객체가 참조하는 다른 모든 것들도 도달 가능하다고 여겨진다.

```
// user엔 객체 참조 값이 저장
let user = {
  name: "John"
}
```

![스크린샷 2023-01-03 오후 9 38 27](https://user-images.githubusercontent.com/49556566/210358984-8b9bf698-ce6e-4e63-8c29-41d68e8c8584.png)

만약 여기서 user의 값을 다른 값으로 덮어쓰면 참조가 사라진다.

```
user = null;
```

![스크린샷 2023-01-03 오후 9 38 30](https://user-images.githubusercontent.com/49556566/210358993-f3076438-2ce9-4219-9bab-99a56c70ecd1.png)

> 그런데 여기서 name: "John"을 두개가 가르키고 있다면 어떻게 될까? => 하나가 사라져도 하나가 남아있기 때문에 메모리에서 해제되지 않는다.

### 도달할 수 없는 섬

> 객체들이 연결되어 섬 같은 구조를 만드는데, 이 섬에 도달할 방법이 없는 경우, 섬을 구성하는 객체 전부가 메모리에서 삭제된다.

### 메모리 생존주기

- 필요할 때 할당
- 할당된 메모리를 사용 (읽기, 쓰기)
- 더 이상 필요하지 않으면 해제

### 요약

- 가비지 컬렉션은 엔진이 자동으로 수행하므로 개발자는 이를 억지로 실행하거나 막을 수 없다.
- 객체는 도달 가능한 상태일 때 메모리에 남는다.
- 참조된다고 해서 도달 가능한 것은 아니다. 서로 연결된 객체들도 도달 불가능할 수 있다.

# 워크맵과 위크셋

> 자바스키립트 엔진은 도달 가능한 값을 메모리에 유지합니다.

```
let john = { name: "John" };

// 위 객체는 john이라는 참조를 통해 접근할 수 있습니다.

// 그런데 참조를 null로 덮어쓰면 위 객체에 더 이상 도달이 가능하지 않게 되어
john = null;

// 객체가 메모리에서 삭제됩니다.
```

> 자료구조를 구성하는 요소도 자신이 속한 자료구조가 메모리에 남아있는 동안 대개 도달 가능한 값으로 취급되어 메모리에서 삭제되지 않는다. => 객체의 프로퍼티나 배열의 요소, 맵이나 셋을 구성하는 요소들이 이에 해당한다.

> 배열이 메모리에 남아있는 한, 배열의 요소인 객체도 메모리에 남아있게 된다 (이 객체를 참조하는 것이 아무것도 없더라도)

```
let john = { name: "John" };

let array = [ john ];

john = null; // 참조를 null로 덮어씀

// john을 나타내는 객체는 배열의 요소이기 때문에 가비지 컬렉터의 대상이 되지 않습니다.
// array[0]을 이용하면 해당 객체를 얻는 것도 가능합니다.
alert(JSON.stringify(array[0]));
```

> 맵에서 객체를 키로 사용한 경우 역시, 맵이 메모리에 있는 한 객체도 메모리에 남는다. (가비지 컬렉터의 대상이 되지 않는다.)

```
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 참조를 null로 덮어씀

// john을 나타내는 객체는 맵 안에 저장되어있습니다.
// map.keys()를 이용하면 해당 객체를 얻는 것도 가능합니다.
for(let obj of map.keys()){
  alert(JSON.stringify(obj));
}

alert(map.size);
```

> 이런 관점에서 워크맵(WeakMap)은 일반 맵과 전혀 다른 양상을 보인다. 워크맵을 사용하면 키로 쓰인 객체가 가비지 컬렉션의 대상이 된다.

### 워크맵 vs 맵

- 맵과 달리 워크맵의 키가 반드시 객체여야 한다. (원시값은 워크맵의 키가 될 수 없다. )

```
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); //정상적으로 동작합니다(객체 키).

// 문자열("test")은 키로 사용할 수 없습니다.
weakMap.set("test", "Whoops"); // Error: Invalid value used
                               // as weak map key
```

- 워크맵의 키로 사용된 객체를 참조하는 것이 아무것도 없다면 해당 객체는 메모리와 워크맵에서 자동으로 삭제된다.

```
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 참조를 덮어씀

// john을 나타내는 객체는 이제 메모리에서 지워집니다!
```

- 워크맵은 맵과 달리 반복 작업과 keys(), values(), entries() 메서드를 지원하지 않는다. -> 워크맵에선 키나 값 전체를 얻는 게 불가능합니다.

### 워크맵이 지원하는 메소드

- weakMap.get(key) : get() 메소드는 weakMap 객체에서 특정 요소를 반환한다.

```
weakmap1.set(object1, 42);

console.log(weakmap1.get(object1));
```

- weakMap.set(key, value)

```
weakmap1.set(object1, 42);
```

- weakMap.delete(key)

```
weakmap1.set(object1, 42);

console.log(weakmap1.delete(object1));
```

- weakMap.has(key)

```
weakmap1.set(object1, 'foo');

console.log(weakmap1.has(object1));
// expected output: true
```

### 유스 케이스: 추가 데이터

> 워크맵은 부차적인 데이터를 저장할 곳이 필요할 때 그 진가를 발휘한다.
> 특정 사용자를 나타내는 객체가 메모리에서 사라지면 해당 객체에 대한 정보도 우리가 손수 지워줘야하는 상황이 발생되므로 메모리 공간이 한없이 커질 거다. 애플리케이션 구조가 복잡할 땐 이렇게 쓸모 없는 데이터를 수동으로 비워주는 게 꽤 골치 아프므로 워크맵을 사용해 예방할 수 있다.

```
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // 위크맵에 사용자의 방문 횟수를 저장함

// 사용자가 방문하면 방문 횟수를 늘려줍니다.
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

### 유스 케이스: 캐싱

> 워크맵은 캐싱(caching)이 필요할 때 유용하다.
> 객체가 메모리에서 삭제되면, 캐시에 저장된 결과(함수 연산 결과) 역시 메모리에서 자동으로 삭제되기 떄문이다.

### 워크셋

- 워크셋은 셋과 유사한데, 객체만 저장할 수 있다는 점이 다르다.
- 셋 안에 객체는 도달 가능할 때만 메모리에서 유지된다.
- 셋과 마찬가지로 워크셋이 지원하는 메서드는 단출하다. add, has, delete를 사용할 수 있고, size, keys()나 반복 작업 관련 메소드는 사용할 수 없다.

### 워크맵과 워크셋

> 위크맵과 위크셋의 가장 큰 단점은 반복 작업이 불가능하다는 점이다. 위크맵이나 위크셋에 저장된 자료를 한 번에 얻는 게 불가능하죠. 이런 단점은 불편함을 초래하는 것 같아 보이지만, 위크맵과 위크셋을 이용해 할 수 있는 주요 작업을 방해하진 않는다. 위크맵과 위크셋은 객체와 함께 ‘추가’ 데이터를 저장하는 용도로 쓸 수 있다.

### 요약

객체엔 '주요' 자료를, 워크맵과 워크셋엔 '부수적인' 자료를 저장하는 형태로 워크맵과 워크셋을 활용할 수 있다. 객체가 메모리에서 삭제되면, (그리고 오로지 워크맵과 워크셋의 키만 해당 객체를 참조하고 있다면) 워크맵이나 워크셋에 저장된 연관 자료들 역시 메모리에서 자동으로 삭제된다.

# iterable 객체

> 반복 가능한 (iterable, 이터러블)객체는 배열을 일반화한 객체이다.
> 이터러블이라는 개념을 사용하면 어떤 객체에든 for..of 반복문을 적용할 수 있다.

> 배열은 대표적인 이터러블인데 배열이 아닌 객체도 이 객체가 어떤 것들의 컬렉션(목록, 집합 등 나타내고 있는 경우, for...of 문법을 적용할 수 있다면 컬렉션을 순회하는데 유용할 것이다.

ex) range을 만들어서 이터러블하게 만들어 for..of가 동작하도록 하자.

```tsx
let range = {
  from: 1,
  to: 5,
};

// 1. for..of 최초 호출 시, Symbol.iterator가 호출됩니다.
range[Symbol.iterator] = function () {
  // Symbol.iterator는 이터레이터 객체를 반환합니다.
  // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해집니다.
  return {
    current: this.from,
    last: this.to,

    // 3. for..of 반복문에 의해 반복마다 next()가 호출됩니다.
    next() {
      // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야 합니다.
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// 이제 의도한 대로 동작합니다!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

- range엔 메서드 next()가 없다.
- 대신 range[Symbol.iterator]()를 호출해서 만든 '이터레이터' 객체와 이 객체의 메서드 next()에서 반복에 사용될 값을 만들어 낸다.
- 여기서 range 자체를 이터레이터로 만들면 코드가 더 간단해진다.

```tsx
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

### 문자열도 이터러블이다.

```tsx
let str = "𝒳😂";
for (let char of str) {
  alert(char); // 𝒳와 😂가 차례대로 출력됨
}
```

### 이터러블과 유사 배열

> 비슷해 보이지만 아주 다른 용어 두 가지가 있다.

- 이터러블(iterable)은 위에서 설명한 바와 같이 메서드 Symbol.iterator가 구현된 객체이다.
- 유사 배열(array-like)은 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체이다.
  > 물론 보통 이터러블 객체(for..of를 사용할 수 있음)면서 유사배열 객체(숫자 인덱스와 length 프로퍼티가 있음)인 문자열 같은 것들도 많다.
  > 다만 이터러블 객체라고 해서 유사 배열 객체는 아니고, 유사 배열 객체라고 해서 이터러블 객체인 것도 아니다.

### Array

> Array.form을 사용해서 배열을 생성하면 이터러블 객체여서 for..of를 쓸 수 있다.

### iterable 요약

- for..of를 사용할 수 있는 객체를 이터러블이라고 부른다.

  1. 이터러블엔 메서드 Symbol.iterator가 반드시 구현되어 있어야 한다.
  2. 이터레이터엔 객체 {done: Boolean, value: any}을 반환하는 메서드 next()가 반드시 구현되어 있어야 한다.
  3. 문자열이나 배열 같은 내장 이터러블에도 Symbol.iterator가 구현되어 있다.

- 인덱스와 length 프로퍼티가 있는 객체는 유사 배열이라 부른다. 유사 배열 객체엔 다양한 프로퍼티와 메서드가 있을 수 있는 배열 내장 메서드는 없다.
- Array.from(obj[, mapFn, thisArg])을 사용하면 이터러블이나 유사 배열인 obj를 진짜 Array로 만들 수 있다. 이렇게 하면 obj에도 배열 메서드를 사용할 수 있다. 선택 인수 mapFn와 thisArg는 각 요소에 함수를 적용할 수 있게 해준다.
