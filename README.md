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

### 깊은 복사법 정리

> 배열을 포함한 javascript 객체가 깊게 중첩된 경우 얕은 복사가 아니라 깊은 복사가 필요하다.

1. 재귀 함수를 통한 딥 카피

```tsx
const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

let originalArray = [37, 3700, { hello: "world" }];
console.log("Original array:", ...originalArray); // 37 3700 Object { hello: "world" }

let shallowCopiedArray = originalArray.slice();
let deepCopiedArray = deepCopyFunction(originalArray);

originalArray[1] = 0; // Will affect the original only
console.log(`originalArray[1] = 0 // Will affect the original only`);
originalArray[2].hello = "moon"; // Will affect the original and the shallow copy
console.log(
  `originalArray[2].hello = "moon" // Will affect the original array and the shallow copy`
);

console.log("Original array:", ...originalArray); // 37 0 Object { hello: "moon" }
console.log("Shallow copy:", ...shallowCopiedArray); // 37 3700 Object { hello: "moon" }
console.log("Deep copy:", ...deepCopiedArray); // 37 3700 Object { hello: "world" }
```

2. JSON.parse/stringfy를 이용한 딥 카피

```tsx
const sampleObject = {
  string: "string",
  number: 123,
  boolean: false,
  null: null,
  notANumber: NaN, // NaN values will be lost (the value will be forced to 'null')
  date: new Date("1999-12-31T23:59:59"), // Date will get stringified
  undefined: undefined, // Undefined values will be completely lost, including the key containing the undefined value
  infinity: Infinity, // Infinity will be lost (the value will be forced to 'null')
  regExp: /.*/, // RegExp will be lost (the value will be forced to an empty object {})
};

console.log(sampleObject);
console.log(typeof sampleObject.date); // object

const faultyClone = JSON.parse(JSON.stringify(sampleObject));

console.log(typeof faultyClone.date); // string
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

# 폴리필

> 자바스크립트는 끊임없이 진화하는 언어이다.
> 새로운 제안은 https://tc39.es/ecma262 에 추가된다.
> 그 후 https://www.ecma-international.org/publications-and-standards/standards/ecma-262 여기에 등록이 된다.
> 엔진별 어떤 기능을 지원하는 지는 여기서 확인이 가능하다. https://kangax.github.io/compat-table/es6

### 바벨

> 바벨은 트랜스파일러로 모던 자바스크립트 코드를 구 표준을 준수하는 코드로 바꿔준다.

- 바벨의 역할 1. 트랜스파일러
  > 바벨은 코드를 재작성해주는 트랜스파일러 프로그램이다. 바벨은 개발자의 컴퓨터에서 돌아간다. 웹팩과 같은 빌드 시스템에서 코드가 수정될 때 마다 자동으로 트랜스파일러를 동작시켜 준다. 요즘은 바벨대신에 swc가 많이 차용되고 있다.
- 바벨의 역할 2. 폴리필
  > 명세서엔 새로운 문법이나 기존에 없던 내장 함수에 대한 정의가 추가되고 한다. 새롭게 표준에 추가된 함수는 명세서 내 정의를 읽고 이에 맞게 직접 함수를 구현해야 할 수 있다. 자바스크립트는 매우 동적인 언어라서 원하기만 하면 어떤 함수라도 스크립트에 추가할 수 있다.
  > 이렇게 변경된 표준을 준수할 수 있게 기존 함수의 동작 방식을 수정하거나, 새롭게 구현할 함수의 스크립트를 "폴리필(polyfill)"이라 부른다. 폴리필은 말 그대로 구현이 누락된 새로운 기능을 메꿔주는(fill in) 역할을 한다.
  - 주목할 만한 폴리필 1. core.js - 다양한 폴리필을 제공, 특정 기능의 폴리필만 사용하는 것도 가능
  - 주목할 만한 폴리필 2. polyfill.io - 기능이나 사용자의 브라우저에 따라 폴리필 스크립트를 제공해주는 서비스이다.
- 인덱스와 length 프로퍼티가 있는 객체는 유사 배열이라 부른다. 유사 배열 객체엔 다양한 프로퍼티와 메서드가 있을 수 있는 배열 내장 메서드는 없다.
- Array.from(obj[, mapFn, thisArg])을 사용하면 이터러블이나 유사 배열인 obj를 진짜 Array로 만들 수 있다. 이렇게 하면 obj에도 배열 메서드를 사용할 수 있다. 선택 인수 mapFn와 thisArg는 각 요소에 함수를 적용할 수 있게 해준다.

# new Function 문법

> 함수 표현식과 함수 선언문 이외에 함수를 만드는 방법이 하나 더 있다. 바로 new Function이다.
> 특징은 런타임에 받은 문자열을 사용해 함수를 만들 수 있다는 점이다.

- 대표적인 형식

```
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

- 예제

```
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) );
```

### new Function과 다른 함수의 차이점

> 클로저에서 차이점이 발생한다. 함수는 특별한 프로퍼티 [[Environment]]에 저장된 정보를 이용해 자기 자신이 태어난 곳을 기억한다. [[Environment]]는 함수가 만들어진 렉시컬 환경을 참조한다. 그런데 new Function을 이용해 함수를 만들면 함수의 [[Environment]] 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하게 된다. 따라서 new Function을 이용해 만든 함수는 외부 변수에 접근할 수 없고, 오직 전역 변수에만 접근할 수있다.

```
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // ReferenceError: value is not defined

function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // getFunc의 렉시컬 환경에 있는 값 "test"가 출력됩니다.
```

> 다만 압축기 때문에 문제가 발생한다. 구체적으로 어떤 부분이 문제가 되는지 예시를 통해 알아보자. 함수 내부에 let userName라는 변수가 있으면 이 지역변수는 압축기에 의해 let a 등(짧은 이름)으로 대체되는데, 이때 userName 모두가 a로 교체된다. userName은 지역변수이고, 함수 외부에선 함수 내부에 있는 변수에 접근할 수 없기 때문에 이렇게 해도 전혀 문제가 없다. 압축기는 단순히 변수를 찾아서 바꾸지 않고 코드 구조를 분석해 기존에 작성한 코드의 기능을 망가뜨리지 않으면서 영리하게 제 역할을 수행한다.
> 이러한 동작 방식 떄문에 new Function 문법으로 만든 함수 내부에서 외부 변수에 접근하려고 하면 userName은 이미 이름이 변경되었기 때문에 찾을 수 없다.
> 한마디로 압축기가 동작한 이후엔, new Function으로 만든 함수 내부에서 외부 렉시컬 환경에 접근하려고 할 때 문제가 발생할 수 있다.
> 따라서 new Function으로 만든 함수에 무언갈 넘겨주고 싶다면 인수를 사용해야 한다.

```
let func = new Function ([arg1, arg2, ...argN], functionBody);

new Function('a', 'b', 'return a + b'); // 기본 문법
new Function('a,b', 'return a + b'); // 쉼표로 구분
new Function('a , b', 'return a + b'); // 쉼표와 공백으로 구분
```

# 마이크로태스크

> 프라미스 핸들러 <code>.them/catch/finally</code>는 항상 비동적으로 실행된다.
> 프라미스가 즉시 이행되더라도 <code>.then/catch/finally</code> 아래에 있는 코드는 이 핸들러들이 실행되기 전에 실행된다.

ex)

```
let promise = Promise.resolve();

promise.then(() => alert("프라미스 성공!"));

alert("코드 종료"); // 얼럿 창이 가장 먼저 뜸.
```

위의 코드는 '코드 종료'가 먼저, '프라미스 성공!'이 나중에 출력된다. 프라미스는 즉시 이행상태가 됐는데도 말이다.

### 왜 .then이 나중에 트리거 될까?

> 비동기 작업을 처리하려면 적절한 관리가 필요하다. 이를 위해 ECMA에선 PrommiseJobs라는 내부 큐(internal queue)를 명시한다. v8에선 이를 '마이크로태스크 큐'라고 부른다.

- 마이크로태스크 큐는 먼저 들어온 작업을 먼저 실행한다. (FIFO)
- 실행할 것이 아무것도 남아있지 않을 때만 마이크로태스크 큐에 있는 작업이 실행되기 시작한다.

> 요약하자면, 어떤 프라미스가 준비되었을 때 이 프라미스의 <code>.then/catch/finally</code> 핸들러가 큐에 들어간다고 생각하면 된다. 이때 핸들러들은 여전히 실행되지 않는다. 현재 코드에서 자유로운 상태가 되었을 때에서야 자바스크립트 엔진은 큐에서 작업을 꺼내 실행한다.

- 만약 여러개의 <code>.then/catch/finally</code>를 사용해 만든 체인의 경우, 각 핸들러는 비동기적으로 실행된다.

### 요약

> 모든 프라미스 동작은 '마이크로태스크 큐'라고 불리는 내부 '프라미스 잡' 큐에 들어가서 처리되기 때문에 프라미스 핸들링은 항상 비동기로 처리된다. 따라서 <code>.then/catch/finally</code> 핸들러는 항상 코드가 종료되고 난 후에 호출된다. 만약 어떤 코드 조각을 <code>.then/catch/finally</code>가 호출된 이후에 실행하고 싶다면 <code>.then</code>을 체인에 추가하고 이 안에 코드를 추가하면 된다.

# 프로토타입 메서드와 <code>\_\_proto\_\_</code>가 없는 객체

> <code>**proto**</code> 는 브라우저를 대상으로 개발하고 있다면 다소 구식적인 방법이기 때문에 더는 사용하지 않는 것이 좋다. 대신에 다음과 같은 방법을 사용해야 한다.

- Object.create(proto, [descriptors]): [[Prototype]]이 proto를 참조하는 빈 객체를 만든다. 이때 프로퍼티 설명자를 추가로 넘길 수 있다.
- Object.getPrototypeOf(obj): obj의 [[Prototype]]을 반환한다.
- Object.setPrototypeOf(obj, proto): obj의 [[Prototype]]이 proto가 되도록 설정한다.

```
let animal = {
  eats: true
};

// 프로토타입이 animal인 새로운 객체를 생성합니다.
let rabbit = Object.create(animal);

alert(rabbit.eats); // true

alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // rabbit의 프로토타입을 {}으로 바꿉니다.
```

### Object.create를 사용하면 for..in을 사용해 프로퍼티를 복사하는 것보다 더 효과적으로 객체를 복제할 수 있다.

```
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

> Object.create를 호출하면 obj의 모든 프로퍼티를 포함한 완벽한 사본이 만들어진다.

### Prototype을 변경하지 말아라.

원한다면 언제나 [[Prototype]]을 얻거나 설정할 수 있다. 기술적 제약이 있는 건 아니죠. 하지만 대개는 객체를 생성할 때만 [[Prototype]]을 설정하고 이후엔 수정하지 않습니다. rabbit이 animal을 상속받도록 설정하고 난 이후엔 상속 관계를 잘 변경하지 않습니다.

자바스크립트 엔진은 이런 시나리오를 토대로 최적화되어 있습니다. Object.setPrototypeOf나 obj.**proto**를 써서 프로토타입을 그때그때 바꾸는 연산은 객체 프로퍼티 접근 관련 최적화를 망치기 때문에 성능에 나쁜 영향을 미칩니다. 그러므로 [[Prototype]]을 바꾸는 것이 어떤 결과를 초래할지 확실히 알거나 속도가 전혀 중요하지 않은 경우가 아니라면 [[Prototype]]을 바꾸지 마세요.

### 사용자가 키를 직접 만들지 못하게 하라

> 사용자가 키를 직접 만들 수 있게 허용하면, 내장 **proto**의 getter, setter 떄문에 의도하지 않은 결과가 나올 수 있다. 키가 "**proto**"일 때 에러가 발생할 수 있다.


# 참조 타입 
> 복잡한 상황에서 메서드를 호출하면 this값을 잃어버리는 경우가 발생한다. 

```
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (간단한 호출은 의도한 대로 잘 동작)

// name에 따라 user.hi나 user.bye가 호출되게 해보자
(user.name == "John" ? user.hi : user.bye)(); // TypeError: Cannot read property 'name' of undefined
```

> 뒤에 ()가 있어서 메서드 hi가 즉시 호출될 것이라 예상했으나 원하는데로 되지 않았다. 에러는 메서드를 호출할 때 "this"에 undefined가 할당되었기 때문에 발생한 것이다. 

> <code>user.hi()</code>는 정상적으로 동작하는데 왜 <code>(user.name == "John" ? user.hi : user.bye)();</code>는 오류가 발생하는 것일까? => 원인을 알려면 <code>obj.method()</code>를 호출했을 때, 내부에서 어떤 일이 일어나는지 알아야 한다. 

### 참조 타입 자세히 알아보기 
> 코드를 보면 obj.method()엔 연산이 두 개 있다는 것을 알 수 있다. 

- 1. '.'은 객체 프로퍼티 <code>obj.method</code>에 접근한다.
- 2. 괄호 ()는 접근한 프로퍼티(메서드)를 실행한다. 

- 그렇다면 첫 번째 연산에서 얻은 this 정보가 어떻게 두 번째 연산으로 전달될까? 
- 두 연산을 각각 별도의 줄에 두었다면 this정보를 잃는 건 확실하다. 

```
let user = {
  name: "John",
  hi() { alert(this.name); }
}

// 메서드 접근과 호출을 별도의 줄에서 실행함
let hi = user.hi;
hi(); // this가 undefined이기 때문에 에러가 발생합니다.
```

> <code>hi = user.hi</code>에서는 함수가 변수에 할당된다. 그런데 마지막 줄과는 완전히 독립적으로 동작하므로 this엔 아무런 값도 저장되지 않는다. 
> user.hi()를 의도한 대로 동작하기 위해서는 참조 타입 값을 반환하게 한다. 
> 참조 타입에 속하는 값은 
  - base: 객체
  - name: 프로퍼티의 이름
  - strict: 엄격 모드에서 true
user.hi로 프로퍼티에 접근하면 함수가 아닌, 참조형(참조 타입) 값을 반환하게 된다. 

* 여기서 참조형 값에 괄호 ()를 붙여 호출하면 객체, 객체의 메서드와 연관된 모든 정보를 받고 이 정보를 기반으로 this(=user)를 결정하게 된다. 

# 함수 바인딩
> setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 <code>this</code>정보가 사라지는 문제가 생긴다. 

### 사라진 this
> 객체 메서드가 객체 내부가 아닌 다른 곳에 전달되어 호출되면 <code>this</code>가 사라진다.
  왜냐하면 setTimeout에 객체에서 분리된 함수인 user.say가 전달되기 떄문이다. 
  브라우저 환경에서 setTimeout 메서드는 this에 window를 할당한다. (Node.js 환경에서는 this가 타이머 객체가 된다.) 따라서 window객체엔 name이 없으므로 undefined가 출력되는 것이다. 
```
let user = {
  name: "in-ch",
  say() {
    console.log(this.name);
  }
}

setTimeout(user.say, 1000) // undefined가 출력된다.

let f = user.say;
setTimeout(f, 1000); // user 컨텍스트를 잃어버림
```

### 해결 방법 
1. 래퍼 
> 가장 간단한 해결책은 래퍼 함수를 사용하는 것이다.

```
setTimeout(() => user.say(), 1000); // 정상 출력
```

2. bind 
> 모든 함수는 this를 수정하게 해주는 내장 메서드 <code>bind</code>를 제공한다. 
  <code>func.bind(context)</code>는 함수처럼 호출 가능한 '특수 객체(exotic object)'를 반환한다. 이 객체를 호출하면 <code>this</code>가 <code>context</code>로 고정된 함수 <code>func</code>가 반환된다. 
  
> *한번 bind를 적용하면 bind를 사용해 컨텍스트를 다시 정의할 수 없다.*
- 예제 1
```
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John
```

- 예제 2
```
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John (인수 "Hello"가 say로 전달되었습니다.)
say("Bye"); 
```

- bindAll로 메서드 전체 바인딩하기 
```
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

- 인수도 바인딩이 가능하다. 

```
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

# 오랜된 var
> 오래된 <code>var</code>는 <code>let</code>과 <code>const</code>와 다르게 동작한다. 따라서 <code>var</code>를 바꾸게 된다면 예상치 못한 에러를 만나게 된다. 

1. var는 블록 스코프가 없다.
<code>var</code>로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프이다. 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근이 가능하다.

```tsx
if (true) {
  var test = true; // 'let' 대신 'var'를 사용했습니다.
}

alert(test); // true(if 문이 끝났어도 변수에 여전히 접근할 수 있음)
// var는 코드 블록을 무시하기 때문에 test는 전역 변수가 된다. 전역 스코프에서 이 변수에 접근할 수 있다. 
```

또한 반복문에서도 유사한 일이 발생한다.

```tsx
for (var i = 0; i < 10; i++) {
  // ...
}

alert(i); // 10, 반복문이 종료되었지만, 'i'는 전역 변수이므로 여전히 접근 가능
```

단, 코드 블록이 함수 안에 있다면, <code>var</code>는 함수 레벨 변수가 된다.
```tsx
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 제대로 출력됩니다.
}

sayHi();
alert(phrase); // Error: phrase is not defined
```

2. var는 변수의 중복 선언을 허용한다.
```tsx
let user;
let user; // SyntaxError: 'user' has already been declared

var user = "Pete";

var user = "John"; // 이 "var"는 아무것도 하지 않습니다(이전에 이미 선언됨).
// ...에러 또한 발생하지 않습니다.

alert(user); // John
```

3. 선언하기 전 사용할 수 있는 var
함수 본문 내에서 <code>var</code>로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의된다. (단, 변수가 중첩 함수 내에서 정의되지 않아야 이 규칙이 적용된다.)

```tsx
function sayHi() {
  phrase = "Hello";

  alert(phrase);

  var phrase;
}
sayHi();


function sayHi() {
  var phrase;

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

위의 코드는 동일하게 동작한다. 또한 코드 블록은 무시되기 때문에, 아래 코드 역시 동일하게 동작한다.

```tsx
function sayHi() {
  phrase = "Hello"; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();
```

> <code>let</code>과 <code>const</code>로 선언된 변수가 호이스팅이 되지 않는 것은 아니다. 단, 선언하기 전에 사용할 수는 없는데, <code>Cannot access '변수명' before initialization</code> 에러가 나온다. 
> <code>let</code>과 <code>const</code>로 선언된 변수는 TDZ에 영향을 받기 때문인데, TDZ(일시적 사각지대 같은 느낌이다.)에 있는 변수들은 사용할 수 없다. 

# 화살표 함수 다시 살펴보기 
> 화살표 함수는 단순히 함수를 '짧게' 쓰기 위한 용도로 사용되지 않다. 
  어딘가에 함수를 전달하게 되면 함수의 컨텍스트를 잃을 수 있다. 이럴 때 화살표 함수를 사용하면 현재 컨텍스트를 잃지 않아 편리하다.

### 화살표 함수에는 'this'가 없습니다.
> 화살표 함수엔 <code>this</code>가 없다. 화살표 함수 본문에서 <code>this</code>에 접근하면, 외부에서 값을 가져온다. 
  이런 특징은 객체의 메서드(<code>showList()</code>)안에서 동일 객체의 프로퍼티(<code>students</code>)를 대상으로 순회를 하는 데 사용할 수 있다. 
```tsx
let group = {
  title: "1모둠",
  students: ["보라", "호진", "지민"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```
> 예시의 <code>forEach</code>에서 화살표 함수를 사용했기 때문에 화살표 함수 본문에 있는 <code>this.title</code>은 화살표 함수 바깥에 있는 메서드인 <code>showList</code>가 가리키는 대상과 동일해진다. 즉 <code>this.title</code>은 <code>group.title</code>과 같다. 
  만약 화살표 함수 대신 일반 함수였다면 에러가 발생했을 것이다. 

### 화살표 함수는 new와 함께 사용할 수 없다.
> <code>this</code>가 없기 때문에 생성자 함수로 사용할 수 없다는 제약이 있다. 화살표 함수는 <code>new</code>와 함께 호출할 수 없다. 

### 화살표 함수는 어떤 것도 바인딩시키지 않는다. 
> <code>this</code>의 값을 외부 렉시컬 환경에서 찾는다. 

### 화살표 함수는 super도 없다. 


# Call/apply와 데코레이터, 포워딩
> 함수는 이곳저곳 전달될 수 있고, 객체로도 사용될 수 있다. 
  함수 간에 호출을 어떻게 포워딩하는지, 함수를 어떻게 데코레이팅 하는지에 대해 알아보자.

### 코드 변경 없이 캐싱 기능 추가하기 
> 래퍼 함수를 사용해서 함수를 캐싱하고 결과를 어딘가에 저장(캐싱)해 재연산에 걸리는 시간을 줄일 수 있다.

> 함수의 행동을 변경시켜주는 함수를 데코레이터(decorator)라고 부른다. 
> 모든 함수를 대상으로 <code>cachingDecorator</code>를 호출할 수 있는데, 이때 반환되는 것은 캐싱 래퍼이다. 

```tsx
function slow(x) {
  // CPU 집약적인 작업이 여기에 올 수 있습니다.
  alert(`slow(${x})을/를 호출함`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 cache에서 읽어옵니다.
    }

    let result = func(x);  // 그렇지 않은 경우엔 func를 호출하고,

    cache.set(x, result);  // 그 결과를 캐싱(저장)합니다.
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1)이 저장되었습니다.
alert( "다시 호출: " + slow(1) ); // 동일한 결과

alert( slow(2) ); // slow(2)가 저장되었습니다.
alert( "다시 호출: " + slow(2) ); // 윗줄과 동일한 결과
```

- 이렇게 사용하면 이점은 다음과 같다.
1. <code>cachingDecorator</code>를 사용할 수 있다. 원하는 함수 어디에든 <code>cachingDecorator</code>를 적용할 수 있다.
2. 캐싱 로직이 분리되어 <code>slow</code>자체의 복잡성이 증가하지 않는다.
3. 필요하다면 여러 개의 데코레이터를 조합해서 사용할 수도 있다. (추가 데코레이터는 <code>cachingDecorator</code> 뒤를 따른다.)

### 'func.call'를 사용해 컨텍스트 지정하기
> 사실 위에 캐싱 데코레이터는 객체 메서드에 사용하기엔 적합하지 않는다.
  객체 메서드 <code>worker.slow()</code>는 데코레이터 적용 후 제대로 동작하지 않는다.

```tsx
// worker.slow에 캐싱 기능을 추가해봅시다.
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // CPU 집약적인 작업이라 가정
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod(); // (*)
  }
};

// 이전과 동일한 코드
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // 기존 메서드는 잘 동작합니다.

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert( worker.slow(2) ); // 에러 발생!, Error: Cannot read property 'someMethod' of undefined
```

(*)로 표시한 줄에서 <code>this.someMethod</code> 접근에 실패했기 때문에 에러가 발생했다.
원인은 (**)로 표시한 줄에서 래퍼가 기존 함수 <code>func(x)</code>를 호출하면 <code>this</code>가 <code>undefined</code>가 되기 때문이다.
아래 코드도 비슷한 증상이 나온다.

```tsx
let func = worker.slow;
func(2);
```
* 왜냐하면 레퍼가 기존 메서드 호출 결과를 전달하려 했지만 <code>this</code>의 컨택스트가 사라졌기 떄문에 에러가 발생하는 것이다. 
* 만약 이를 수정하기 위해서 <code>this</code>를 명시적으로 고정해 함수를 호출할 수 있게 해주는 내장 함수 메서드 <code>func.call(context, ...args)</code>를 사용해야 한다.

```tsx
func.call(context, arg1, arg2, ...)

func(1, 2, 3);
func.call(obj, 1, 2, 3) // 차이점은 func.call에선 this가 obj로 고정된다는 것이다. 
```

```tsx
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// call을 사용해 원하는 객체가 'this'가 되도록 합니다.
sayHi.call( user ); // this = John
sayHi.call( admin ); // this = Admin
```

- 이걸 사용해 래퍼 안에서 <code>call</code>을 사용해 컨텍스트를 원본 함수로 전달하면 에러가 발생하지 않는다.

```tsx
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 이젠 'this'가 제대로 전달됩니다.
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert( worker.slow(2) ); // 제대로 동작합니다.
alert( worker.slow(2) ); // 제대로 동작합니다. 다만, 원본 함수가 호출되지 않고 캐시 된 값이 출력됩니다.
```

### this는 어떤 과정을 거치게 될까
1. 데코레이터를 적용한 후에 <code>worker.slow</code>는 래퍼 <code>function (x) {...}가 된다.</code>

2. <code>worker.slow(2)</code>를 실행하면 래퍼 2를 인수로 받고, <code>this = worker</code>가 된다.

3. 결과가 캐시되지 않는 상황이라면 <code>func.call(this,x)</code>에서 현재 <code>this (=worker)와 인수(=2)</code>를 원본 메서드에 전달한다. 