[모던 JavaScript 튜토리얼](https://ko.javascript.info/)

# 목차

---

[엄격모드](#엄격-모드)

[nullish 병합 연산자](#nullish-병합-연산자)

[심볼형](#심볼형)

[참조에 의한 객체 복사](#참조에-의한-객체-복사)

[얕은 복사와 깊은 복사 방법 정리](#얕은-복사와-깊은-복사-방법-정리)
₩
[가비지 컬렉션](#가비지-컬렉션)

[iterable 객체](#iterable-객체)

[폴리필](#폴리필)``₩

[프로토타입 메서드와 __proto__가 없는 객체](#프로토타입-메서드와-__proto__가-없는-객체)

[함수 바인딩](#함수-바인딩)

[오래된 var](#오래된-var)

[화살표 함수 다시 살펴보기](#화살표-함수-다시-살펴보기)

[커링 (Currying)](#커링-currying)

[객체로서의 함수와 기명 함수 표현식](#객체로서의-함수와-기명-함수-표현식)

[console.log 잘 활용하기](#consolelog-잘-활용하기)

[테스트 자동화와 Mocha](#테스트-자동화와-mocha)

[프라미스와 에러 핸들링](#프라미스와-에러-핸들링)

[마이크로태스크](#마이크로태스크)

[프라미스 API](#프라미스-api)

[브라우저 환경과 다양한 명세서](#브라우저-환경과-다양한-명세서)

[제너레이터](#제너레이터)

[async 이터레이터와 제너레이터](#async-이터레이터와-제너레이터)

[Proxy와 Reflect](#proxy와-reflect)

[객체를 원시형으로 변환하기](#객체를-원시형으로-변환하기)

[동적으로 모듈 가져오기](#동적으로-모듈-가져오기)

[롱 폴링](#롱-폴링)

[커스텀 에러와 에러 확장](#커스텀-에러와-에러-확장)

[주요 노드 프로퍼티](#주요-노드-프로퍼티)

[]

# 엄격 모드

<details>
 <summary>자세히 보기</summary>

 > 자바스크립트는 꽤 오랫동안 호환성 이슈 없이 발전해왔다. 기존의 기능을 변경하지 않으면서 새로운 기능이 추가되었다. 덕분에 기존에 작성한 코드를 망치지 않는 장점이 있으나 창시자들이 했던 실수나 불완전한 결정이 계속 남게 되는 단점이 있다.

 > 이런 상황은 ECMAScript5(ES5)가 등장하기 전인 2009년까지 지속되었다. 
 > ES5에서는 새로운 기능이 추가되고 기존 기능 중 일부가 변경되었다. 기존 기능을 변경하였기 때문에 하위 호환성 문제가 생긴다. 그래서 변경사항 대부분은 ES5의 기본 모드에선 활성화되지 않도록 설계되었다. 대신 use strict라는 지시자를 통해 스크립트 전체가 모던한 방식으로 동작하도록 할 수 있다.


 ### use strict

 > 한마디로 엄격모드이다. 엄격한 parsing 및 error handling을 자발적으로 시행하도록 적용함으로써 일반적인 코딩 실수나 안전하지 않은 동작을 포착한다.

 - 장점
   1. 디버깅이 쉬워진다.
   2. js 엔진의 최적화
   3. 발생 가능한 에러 예방
   
 - 단점
   1. 일부 오래된 코드가 작동하지 않을 수 있다.
   2. 엄격모드를 지원하지 않는 브라우저에서는 엄격 모드 코드가 다른 동작으로 실행될 수 있다. 
   3. 기본 매개변수, 나머지 매개변수 또는 구조 분해 매겨변수가 있는 함수의 본문에 use strict 지시문을 적용할 수 없다. 

 ```tsx
 "use strict";

 // 이 코드는 모던한 방식으로 실행됩니다.
 ...
 ```

 - use strict는 스크립트 최상단에 있어야 한다. 단, 함수 본문 맨 앞에 있을 수도 있다. 잘 안 쓰지만,,
 - use strict를 취소할 방법은 없다.
 - 브라우저 콘솔을 사용하는 경우 use strict가 적용되어 있지 않다.
 
 - Next.js에서는 React의 Strict Mode를 통해 엄격 모드를 사용할 수 있다
 ```ts
 // next.config.js
 module.exports = {
   reactStrictMode: true,
 }
 ```
 
</details>

# nullish 병합 연산자

<details>
 <summary>자세히 보기</summary>

 > ??를 통해 '확정되어 있는' 변수를 찾을 수 있다.

 ex)

 ```tsx
 let firstName = null;
 let lastName = null;
 let nickName = "바이올렛";

 // null이나 undefined가 아닌 첫 번째 피연산자
 alert(firstName ?? lastName ?? nickName ?? "익명의 사용자"); // 바이올렛
 ```

 ### '??'와 '||'의 차이

 둘은 동작이 꽤 비슷하나 ||은 0을 falsey하게 인식하기 때문에 숫자 0를 다룰 때 매우 조심해야 한다.

 ex)

 ```tsx
 let height = 0;

 alert(height || 100); // 100
 alert(height ?? 100); // 0
 ```

 위의 예제에서 ||는 0을 false로 인식했기 때문에 100을 리턴하게 됐다.
 반면에 ??는 정확하게 null이나 undefined일 경우에만 100이 된다.

 ### nullish 병합 연산자의 우선순위

 ?? 연산자는 우선순위가 낮기 때문에 ()와 같이 써야한다.
</details>

# 심볼형

<details>
 <summary>자세히 보기</summary>

 > 유일한 식별자(unique identifier)를 만들고 싶을 때 사용한다.

 ```tsx
 let id = Symbol();
 ```

 > 또한 심볼을 만들 때 심볼 이름이라 불리는 설명을 붙일 수도 있다. 심볼 이름은 디버깅 시 매우 유용하게 쓰일 수 있다.

 ```tsx
 let id = Symbol("id");
 ```

 > 심볼은 똑같은 설명으로 여러개 만들어도 기본적으로 각 값들은 다르다.

 ```tsx
 let id1 = Symbol("id");
 let id2 = Symbol("id");

 alert(id1 == id2); // false
 ```

 > 심볼은 문자형으로 자동 형 변환이 되지 않는다.

 ```tsx
 let id = Symbol("id");
 alert(id); // TypeError: Cannot convert a Symbol value to a string
 ```

 ### 심볼의 쓰임새

 > 심볼은 정보 은닉 등에 쓰일 수 있다. (외부 코드에서 접근 불가능하고 값도 덮어쓰일 수 없도록 할 수 있다.)

 ```tsx
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

 ```tsx
 let id = Symbol("id");

 let user = {
   name: "John",
   [id]: 123 // "id": 123은 안됨
 };
 ```

 - 심볼은 for...in에서 배제된다.

 ```tsx
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

 ```tsx
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

</details>

# 참조에 의한 객체 복사

<details>
 <summary>자세히 보기</summary>

 > 객체와 원시 타입의 근본적인 차이 중 하나는 객체는 '참조에 의해' 저장되고 복사되고 원시값(string, number,...) 등은 값 그대로 저장, 할당되고 복사된다.

 > 그렇다면 객체 복사는 어떤 식으로 복사될까?
 > ex)

 ```tsx
 const user = {
   name: "John"
 }
 let admin = user; // 참조값을 복사함
 ```

 ![스크린샷 2023-01-02 오후 10 59 40](https://user-images.githubusercontent.com/49556566/210241281-dc600b91-bda1-4131-ac57-fb460f6cd419.png)
 ![스크린샷 2023-01-02 오후 10 59 43](https://user-images.githubusercontent.com/49556566/210241287-30386e86-d835-47d6-85b1-07d823f61d79.png)

 단, 객체 비교 시 ==와 ===는 모두 동일하게 동작한다.

 ```tsx
 let a = {};
 let b = a; // 참조에 의한 복사

 alert( a == b ); // true, 두 변수는 같은 객체를 참조합니다.
 alert( a === b ); // true
 ```

 그러나 두 객체 모두 비어있다면 독립된 객체이기 떄문에 일치, 동등 비교하면 false가 나오게 된다.

 ```tsx
 let a = {};
 let b = {}; // 독립된 두 객체

 alert( a == b ); // false
 ```

 ### 객체의 복사

 > 그렇다면 객체가 할당된 변수를 복사하면 동일한 객체에 대한 참조 값이 하나 더 만들어지는데 이렇게 하는 게 아니라 객체를 그대로 복사하고 싶다면 어떻게 해야할까?
 > Object.assign을 사용하면 된다 .

 ```tsx
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
</details>

# 얕은 복사와 깊은 복사 방법 정리

<details>
 <summary>자세히 보기</summary>

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
</details>

# 가비지 컬렉션

<details>
 <summary>자세히 보기</summary>

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

 ```tsx
 // user엔 객체 참조 값이 저장
 let user = {
   name: "John"
 }
 ```

 ![스크린샷 2023-01-03 오후 9 38 27](https://user-images.githubusercontent.com/49556566/210358984-8b9bf698-ce6e-4e63-8c29-41d68e8c8584.png)

 만약 여기서 user의 값을 다른 값으로 덮어쓰면 참조가 사라진다.

 ```tsx
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
</details>

# 워크맵과 위크셋

<details>
 <summary>자세히 보기</summary>
 > 자바스키립트 엔진은 도달 가능한 값을 메모리에 유지합니다.

 ```tsx
 let john = { name: "John" };

 // 위 객체는 john이라는 참조를 통해 접근할 수 있습니다.

 // 그런데 참조를 null로 덮어쓰면 위 객체에 더 이상 도달이 가능하지 않게 되어
 john = null;

 // 객체가 메모리에서 삭제됩니다.
 ```

 > 자료구조를 구성하는 요소도 자신이 속한 자료구조가 메모리에 남아있는 동안 대개 도달 가능한 값으로 취급되어 메모리에서 삭제되지 않는다. => 객체의 프로퍼티나 배열의 요소, 맵이나 셋을 구성하는 요소들이 이에 해당한다.

 > 배열이 메모리에 남아있는 한, 배열의 요소인 객체도 메모리에 남아있게 된다 (이 객체를 참조하는 것이 아무것도 없더라도)

 ```tsx
 let john = { name: "John" };

 let array = [ john ];

 john = null; // 참조를 null로 덮어씀

 // john을 나타내는 객체는 배열의 요소이기 때문에 가비지 컬렉터의 대상이 되지 않습니다.
 // array[0]을 이용하면 해당 객체를 얻는 것도 가능합니다.
 alert(JSON.stringify(array[0]));
 ```

 > 맵에서 객체를 키로 사용한 경우 역시, 맵이 메모리에 있는 한 객체도 메모리에 남는다. (가비지 컬렉터의 대상이 되지 않는다.)

 ```tsx
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

 ```tsx
 let weakMap = new WeakMap();

 let obj = {};

 weakMap.set(obj, "ok"); //정상적으로 동작합니다(객체 키).

 // 문자열("test")은 키로 사용할 수 없습니다.
 weakMap.set("test", "Whoops"); // Error: Invalid value used
                                // as weak map key
 ```

 - 워크맵의 키로 사용된 객체를 참조하는 것이 아무것도 없다면 해당 객체는 메모리와 워크맵에서 자동으로 삭제된다.

 ```tsx
 let john = { name: "John" };

 let weakMap = new WeakMap();
 weakMap.set(john, "...");

 john = null; // 참조를 덮어씀

 // john을 나타내는 객체는 이제 메모리에서 지워집니다!
 ```

 - 워크맵은 맵과 달리 반복 작업과 keys(), values(), entries() 메서드를 지원하지 않는다. -> 워크맵에선 키나 값 전체를 얻는 게 불가능합니다.

 ### 워크맵이 지원하는 메소드

 - weakMap.get(key) : get() 메소드는 weakMap 객체에서 특정 요소를 반환한다.

 ```tsx
 weakmap1.set(object1, 42);

 console.log(weakmap1.get(object1));
 ```

 - weakMap.set(key, value)

 ```tsx
 weakmap1.set(object1, 42);
 ```

 - weakMap.delete(key)

 ```tsx
 weakmap1.set(object1, 42);

 console.log(weakmap1.delete(object1));
 ```

 - weakMap.has(key)

 ```tsx
 weakmap1.set(object1, 'foo');

 console.log(weakmap1.has(object1));
 // expected output: true
 ```

 ### 유스 케이스: 추가 데이터

 > 워크맵은 부차적인 데이터를 저장할 곳이 필요할 때 그 진가를 발휘한다.
 > 특정 사용자를 나타내는 객체가 메모리에서 사라지면 해당 객체에 대한 정보도 우리가 손수 지워줘야하는 상황이 발생되므로 메모리 공간이 한없이 커질 거다. 애플리케이션 구조가 복잡할 땐 이렇게 쓸모 없는 데이터를 수동으로 비워주는 게 꽤 골치 아프므로 워크맵을 사용해 예방할 수 있다.

 ```tsx
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
</details>

# iterable 객체

<details>
 <summary>자세히 보기</summary>

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
</details>

# 폴리필

<details>
 <summary>자세히 보기</summary>
 
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

 ```tsx
 let func = new Function ([arg1, arg2, ...argN], functionBody);
 ```

 - 예제

 ```tsx
 let sum = new Function('a', 'b', 'return a + b');

 alert( sum(1, 2) );
 ```

 ### new Function과 다른 함수의 차이점

 > 클로저에서 차이점이 발생한다. 함수는 특별한 프로퍼티 [[Environment]]에 저장된 정보를 이용해 자기 자신이 태어난 곳을 기억한다. [[Environment]]는 함수가 만들어진 렉시컬 환경을 참조한다. 그런데 new Function을 이용해 함수를 만들면 함수의 [[Environment]] 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하게 된다. 따라서 new Function을 이용해 만든 함수는 외부 변수에 접근할 수 없고, 오직 전역 변수에만 접근할 수있다.

 ```tsx
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

 ```tsx
 let func = new Function ([arg1, arg2, ...argN], functionBody);

 new Function('a', 'b', 'return a + b'); // 기본 문법
 new Function('a,b', 'return a + b'); // 쉼표로 구분
 new Function('a , b', 'return a + b'); // 쉼표와 공백으로 구분
 ```

</details>

# 프로토타입 메서드와 <code>\_\_proto\_\_</code>가 없는 객체

<details>
 <summary>자세히 보기</summary>

> <code>**proto**</code> 는 브라우저를 대상으로 개발하고 있다면 다소 구식적인 방법이기 때문에 더는 사용하지 않는 것이 좋다. 대신에 다음과 같은 방법을 사용해야 한다.

- Object.create(proto, [descriptors]): [[Prototype]]이 proto를 참조하는 빈 객체를 만든다. 이때 프로퍼티 설명자를 추가로 넘길 수 있다.
- Object.getPrototypeOf(obj): obj의 [[Prototype]]을 반환한다.
- Object.setPrototypeOf(obj, proto): obj의 [[Prototype]]이 proto가 되도록 설정한다.

```tsx
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

```tsx
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

```tsx
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

```tsx
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

</details>

# 함수 바인딩

<details>
 <summary>자세히 보기</summary>

> setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 <code>this</code>정보가 사라지는 문제가 생긴다. 

### 사라진 this
> 객체 메서드가 객체 내부가 아닌 다른 곳에 전달되어 호출되면 <code>this</code>가 사라진다.
  왜냐하면 setTimeout에 객체에서 분리된 함수인 user.say가 전달되기 떄문이다. 
  브라우저 환경에서 setTimeout 메서드는 this에 window를 할당한다. (Node.js 환경에서는 this가 타이머 객체가 된다.) 따라서 window객체엔 name이 없으므로 undefined가 출력되는 것이다. 
```tsx
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

```tsx
setTimeout(() => user.say(), 1000); // 정상 출력
```

2. bind 
> 모든 함수는 this를 수정하게 해주는 내장 메서드 <code>bind</code>를 제공한다. 
  <code>func.bind(context)</code>는 함수처럼 호출 가능한 '특수 객체(exotic object)'를 반환한다. 이 객체를 호출하면 <code>this</code>가 <code>context</code>로 고정된 함수 <code>func</code>가 반환된다. 
  
> *한번 bind를 적용하면 bind를 사용해 컨텍스트를 다시 정의할 수 없다.*
- 예제 1
```tsx
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
```tsx
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
```tsx
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

- 인수도 바인딩이 가능하다. 

```tsx
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

</details>

# 오랜된 var

<details>
 <summary>자세히 보기</summary>

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

</details>

# 화살표 함수 다시 살펴보기 

<details>
 <summary>자세히 보기</summary>
 
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

### 여러 인수 전달하기 
> 이제 복수 인수를 가진 메서드, <code>worker.slow</code>를 캐싱해보자.

```tsx
let worker = {
  slow(min, max) {
    return min + max;
  }
};

worker.slow = cachingDecorator(worker.slow);
```
> 이걸 캐싱해볼 거다. 해결 방법은 다음과 같다.
1. 복수 키를 지원하는 맵과 유사한 자료 구조 구현하기
2. 중첩 맵을 사용하기 <code>(max, result)</code> 쌍 저장은 <code>cache.set(min)</code>으로, result는 <code>cache.get(min).get(max)</code>을 사용
3. 두 값을 하나로 합치기, 맵의 키로 문자열 <code>"min, max"</code>를 사용, 여러 값을 하나로 합치는 코든느 해싱 함수에 구현해 유연성을 높임. (이걸 사용할 것이다.)

let worker = {
  slow(min, max) {
    alert(`slow(${min},${max})을/를 호출함`);
    return min + max;
  }
};

```tsx
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // 제대로 동작합니다.
alert( "다시 호출: " + worker.slow(3, 5) ); // 동일한 결과 출력(캐시된 결과)
```

- <code>*</code>로 표시한 줄에서 hash가 호출되면서 <code>arguments</code>를 사용한 단일 키가 만들어짐. 
- <code>**</code>로 표시한 줄에선 <code>func.call(this, ...arguments)</code>를 상ㅇ해 컨텍스트(this)와 래퍼가 가진 인수 전부 (...arguments)를 기존 함수에 전달. 

### func.apply 
> func.call 대신 func.apply 사용 가능. 
  차이점은 <code>call</code>이 복수 인수를 따로따로 받는 대신, <code>apply</code>는 인수를 유사 배열 객체로 받는다. 

```tsx
func.call(context, ...args); // 전개 문법을 사용해 인수가 담긴 배열을 전달하는 것과
func.apply(context, args);   // call을 사용하는 것은 동일
```

### 요약
- 데코레이터는 함수를 감싸는 래퍼로 함수의 행동을 변화시킨다. 다만 주요 작업은 여전히 함수에서 처리
- 데코레이터는 함수에 추가된 '기능' 혹은 '면' 정도로 보면 된다. 하나 혹은 여러 개의 데코레이터를 추가해도 함수의 코드는 변경되지 않는다. 

</details>

# 커링 (Currying)

<details>
 <summary>자세히 보기</summary>
 
> <code>커링</code>은 함수와 함께 사용할 수 있는 고급 기술이다.
  <code>func(a,b,c)</code>처럼 단일 호출로 처리하는 함수를 <code>func(a)(b)(c)</code>와 같이 각각의 인수가 호출 가능한 프로세스로 호출된 후 병합되도록 변환하는 것이다. 
  커링은 함수를 호출하지 않는다. 단지 변환할 뿐이다. 
  사용하는 이유는 가독성을 높이고 함수의 작동방식을 명확하게 하여 유지보수하는데 도움을 주기 위해서다. 

```tsx
const curry = f => a => b => f(a, b);

// f에 전달된 함수
const sum = (a, b) => a + b;

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)); // 3
```

### 고급 커링 구현

```tsx
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, 보통때 처럼 단일 callable 형식으로 호출하기
alert( curriedSum(1)(2,3) ); // 6, 첫 번째 인수를 커링하기
alert( curriedSum(1)(2)(3) ); // 6, 모두 커링하기
```

</details>

# 객체로서의 함수와 기명 함수 표현식

<details>
 <summary>자세히 보기</summary>
 
> 모든 값은 자료형을 가지고 있는데, 함수의 자료형은 객체이다.
  함수는 호출이 가능한(callable) '행동 객체'라고 이해하면 된다. 
  우리는 함수를 호출할 수 있을 뿐만 아니라 객체처럼 함수에 프로퍼티를 추가, 제거하거나 참조를 통해 전달 할 수도 있다.

### name 프로퍼티 (contextual name)
> 함수 객체엔 몇 가지 쓸만한 프로퍼티가 있다.
  'name' 프로퍼티를 사용하면 함수 이름을 가져올 수 있다.

```tsx
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```
> 자바스크립트에서 이걸 'contextual name'이라고 부른다. 

- 여기서 객체 메서드 이름은 함수처럼 자동 할당이 되지 않는다. 다라서 적절한 이름을 추론하는 게 불가능할 때는 빈 문자열이 저장된다. 

### length 프로퍼티 
> 내장 프로퍼티 <code>length</code>는 함수 매개변수의 개수를 반환한다. 

# BigInt
> <code>BigInt</code>는 길이의 제약 없이 정수를 다룰 수 있게 해주는 숫자형이다.  
  정수 리터럴 끝에 <code>n</code>을 붙이거나 함수 <code>BigInt</code>를 호출하면 문자열이나 숫자를 가지고 <code>BigInt</code> 타입의 값을 만들 수 있다. 

```tsx
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 10n과 동일합니다.
```

- 일반 숫자와 큰 차이 없이 사용할 수 있다. 
1. 5/2 결과엔 소수부가 없다. <code>BigInt</code>형 값을 반환하기 때문에
2. <code>BigInt</code>형 값과 일반 숫자를 섞어서 사용할 순 없다.
```tsx
alert(1n + 2n); // 3
alert(5n / 2n); // 2
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

- 만약 굳이 섞어서 쓰고 싶다면 형 변환을 해서 섞어 써야 한다. 

```tsx
let bigint = 1n;
let number = 2;

// 숫자를 bigint로
alert(bigint + BigInt(number)); // 3

// bigint를 숫자로
alert(Number(bigint) + number); // 3
```

- 비교 연산자
> 비교 연산도 모두 사용할 수 있다.

```tsx
alert( 2n > 1n ); // true
alert( 2n > 1 ); // true

alert( 1 == 1n ); // true
alert( 1 === 1n ); // false
```

- 논리 연산
> if 안에서도 일반 숫자와 동일하게 행동한다. 

```tsx
alert( 1n || 2 ); // 1 (1n은 truthy로 판단)
alert( 0n || 2 ); // 2 (0n은 falsy로 판단)
```
</details>


# console.log 잘 활용하기 

<details>
 <summary>자세히 보기</summary>
 
> 만약 정보가 많다면 그냥 <code>,</code>로 하게 되면 읽기가 굉장히 어렵다. 

```tsx
const name = 'in-ch'
const age = 29
const job = 'Front end development engineer'
const hobbies = 'reading book'

console.log(name, age, job, hobbies);
```
<img width="238" alt="스크린샷 2023-02-08 오후 10 56 55" src="https://user-images.githubusercontent.com/49556566/217550194-702f46ab-b9fc-49f2-b0c2-547aaa24ce8d.png">

> 객체로 하면 더 깔끔하게 보여진다. 

```tsx
const name = 'in-ch'
const age = 29
const job = 'Front end development engineer'
const hobbies = 'reading book'

console.log({name, age, job, hobbies});
```
<img width="233" alt="스크린샷 2023-02-08 오후 10 58 23" src="https://user-images.githubusercontent.com/49556566/217550468-09f1d0ae-8d1e-4de0-bf41-0926dc2d3826.png">

- CSS style도 활용 가능하다. 

```tsx
console.log('%cin-ch', 'color: purple; font-size: 28px');
```
<img width="258" alt="스크린샷 2023-02-08 오후 11 00 28" src="https://user-images.githubusercontent.com/49556566/217550973-f7ed50a8-00e9-41cc-ba7c-e5dcbd840a2c.png">

- console.time() & console.timeEnd()

```tsx
let count = 0

console.time();
for (let i = 0; i < 1000000000; i++) {
  count++
}
console.timeEnd();
```
<img width="233" alt="스크린샷 2023-02-08 오후 11 01 50" src="https://user-images.githubusercontent.com/49556566/217551308-dd3ce731-9d83-427d-bb05-244307e95cdc.png">

- console.table()

```tsx
const foods = [
  {
    name: '🍔',
    price: 8000,
    group: 1,
  },
  {
    name: '🍨',
    price: 5000,
    group: 1,
  },
  {
    name: '🍿',
    price: 3000,
    group: 2,
  },
  {
    name: '🍵',
    price: 4000,
    group: 2,
  },
];

console.table(foods);
```
<img width="253" alt="스크린샷 2023-02-08 오후 11 03 59" src="https://user-images.githubusercontent.com/49556566/217551849-6b68a2d5-3643-4a65-9397-05d4d72abc7e.png">

</details>

# 테스트 자동화와 Mocha 

<details>
 <summary>자세히 보기</summary>

- 테스트는 왜 해야 하는가?
  개발자는 무언가를 만들 때 머릿속에 수많은 유스 케이스를 생각하며 코드를 작성하는데, 코드를 변경해야 할 때마다 모든 유스 케이스를 상기하면서 코드를 수정하는 것은 거의 불가능하다. 하나를 고치면 또 다른 문제가 튀어나오기 때문이다. 
  테스트 자동화는 테스트 코드가 실제 동작에 관여하는 코드와 별개로 작성되었을 때 가능하다. 테스트 코드를 이용하면 함수를 다양한 조건에서 실행해 볼 수 있는데, 이때 실행 결과와 기대 결과를 비교할 수 있다.

- Behavior Driven Development
  <code>BDD</code>는 테스트(test), 문서(documentation), 예시(example)를 모아놓은 개념이다.

ex) 
```tsx
describe("pow", function() {

  it("주어진 숫자의 n 제곱", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```
<code>describe("title", function() { ... })</code>
구현하고자 하는 기능에 대한 설명이 들어간다. 

<code>it("유스 케이스 설명", function() { ... })</code>
<code>it</code>의 첫 번째 인수엔 특정 유스 케이스에 대한 설명이 들어간다. 이 설명은 누구나 읽을 수 있고 이애할 수 있는 자연어로 적는 것이 좋다. 

<code>assert.equal(value1, value2)</code>
기능을 제대로 구현했다면 이 코드는 통과될 것이고 문제가 있다면 에러를 뱉을 것이다. 

- BDD의 개발 순서
1. 명세서 초안을 작성한다. 초안엔 기본적인 테스트도 들어간다.
2. 명세서 초안을 보고 코드를 작성한다.
3. 코드가 작동하는지 확인하기 위해 Mocha라는 테스트 프레임워크를 사용해 명세서를 실행한다. 
4. 모든 테스트를 통과하는 코드 초안이 완성되었다.
5. 명세서엔 지금까진 고려하지 않았던 유스케이스 몇 가지를 추가한다. -> 테스트가 실패하기 시작한다.
6. 세 번째 단계로 돌아가 테스트를 모두 통과할 때까지 코드를 수정한다.
7. 기능이 완성될 때까지 3~6단계를 반복한다. 

- 중첩 <code>describe</code>
  중첩해서 <code>describe</code>를 사용할 수 있다. 이는 새로운 테스트 '하위 그룹(subgroup)'을 정의할 때 사용된다. 

- 실행 흐름이 복잡한 경우 모든 입력 값이 한 눈에 확인 가능하게 테스트 코드가 작성되어야 한다.

```tsx
describe("주어진 숫자의 n 제곱", function() {
  it("5를 1 제곱하면 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5를 2 제곱하면 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5를 3 제곱하면 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
</details>

# 프라미스와 에러 핸들링 

<details>
 <summary>자세히 보기</summary>
 
- 프라미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어가기 때문에 프라미스 체인을 사용하면 에러를 쉽게 처리할 수 있다. 
- <code>.catch</code>는 첫번째 핸들러일 필요가 없고 하나 혹은 여러 개의 <code>.then</code> 뒤에 올 수 있다. 
- 정상적인 경우라면 <code>.catch</code>는 절대 트리거 되지 않는다. 그러나 네트워크 문제, 잘못된 형식의 JSON 등으로 인해 프라미스 중 하나라도 거부되면 <code>.catch</code>에서 에러를 잡게 된다. 

예시)
```tsx
fetch('https://no-such-server.blabla') // 거부
  .then(response => response.json())
  .catch(err => alert(err))
```

### 암시적 try...catch
> <code>프라미스 executor</code>와 <code>프라미스 핸들러 코드</code> 주위엔 '보이지 않는 (암시적)' <code>try...catch</code>가 있다.

- 아래 두 코드는 똑같이 동작한다,
- <code>executor</code> 주위의 암시적  <code>try...catch</code>는 스스로 에러를 잡고, 에러를 거부상태의 프라미스로 변경시킨다.

```tsx
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(alert); // Error: 에러 발생!
```

```tsx
new Promise((resolve, reject) => {
  reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!
```

예시)
```tsx
new Promise((resolve, reject) => {
  resolve("OK");
}).then((result) => {
  blabla(); // 존재하지 않는 함수
}).catch(alert); // ReferenceError: blabla is not defined
```
- 여기서 마지막 <code>.catch</code>는 이렇게 명시적인 거부뿐만 아니라 핸들러 위쪽에서 발생한 비정상 에러 또한 잡는다.

### 처리되지 못한 거부
> 만약 <code>.catch</code>를 추가하지 못한 경우는 어떻게 될까?
1. 스크립트가 죽고 콘솔 창에 메시지가 출력된다.
2. 자바스크립트 엔진은 프라미스 거부를 추적하다가 전역 에러를 생헝하게 된다. 

- 브라우저 환경에서 이런 에러는 <code>unhandledrejection</code>이벤트로 처리할 수 있다. 

```tsx
window.addEventListener('unhandledrejection', function(event) {
  // unhandledrejection 이벤트엔 두 개의 특수 프로퍼티가 있습니다.
  alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});

new Promise(function() {
  throw new Error("에러 발생!");
}); // 에러를 처리할 수 있는 .catch 핸들러가 없음
```

### <code>try...catch</code>는 동기적 에러만 처리할 수 있다.
```tsx
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("에러 발생!");
  }, 1000);
}).catch(alert);
```

여기서 에러는 <code>executor(실행자, 실행 함수)</code>가 실행되는 동안이 아니라 나중에 발생한다. 따라서 프라미스는 에러를 처리할 수 없다. 
</details>

# 마이크로태스크

<details>
 <summary>자세히 보기</summary>

> 프라미스 핸들러 <code>.them/catch/finally</code>는 항상 비동적으로 실행된다.
> 프라미스가 즉시 이행되더라도 <code>.then/catch/finally</code> 아래에 있는 코드는 이 핸들러들이 실행되기 전에 실행된다.

ex)

```tsx
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

</details>

# 프라미스 API

<details>
 <summary>자세히 보기</summary>

> <code>Promise</code> 클래스는 5가지 정적 메서드가 있다. 

### Promise.all
> 복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 사용한다. 
```tsx
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); 
```
- <code>Promise.all</code>은 요소 전체가 프라미스인 배열(엄밀히 따지면 이터러블 객체이지만, 대개는 배열임)을 받고 새로운 프라미스를 반환한다. 
- 배열 안 프라미스가 모두 처리되면 새로운 프라미스가 이행되는데, 배열 안 프라미스의 결과값을 담은 배열이 새로운 프라미스의 <code>result</code>가 된다. 
- 위의 예제는 프라미스 전체가 처리되면 1,2,3이 반환된다. <code>Promise.all</code>의 첫번째 프라미스는 가장 늦게 이해오디더라도 처리 결과는 배열의 첫 번째 요소에 저장된다. 
- <code>Promise.all</code>에 전달되는 프라미스 중 하나라도 거부되면 <code>Promise.all</code>이 반환하는 프라미스는 에러와 함께 바로 거부된다. -> 배열에 저장된 다른 프라미스의 결과가 완전히 무시된다. 
- <code>Promise.all</code>에는 취소라는 개념이 없어서 최소되지 않는다. 

### Promise.allSettled 
> <code>Promise.all</code>이 하나라도 취소되면 다 취소되기 때문에 하나가 실패해도 다른 요청 결과가 필요할 때 사용할 수 있다.
```tsx
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/Violet-Bora-Lee',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
   });
 });
  
/*결과값*/
[
  {status: 'fulfilled', value: ...응답...},
  {status: 'fulfilled', value: ...응답...},
  {status: 'rejected', reason: ...에러 객체...}
] 
```
- 다만 <code>Promise.all</code>는 구버전에서 지원하지 않기때문에 폴리필을 구현해야 한다. 

### Promise.race
> <code>Promise.race</code>는 가장 빨리 처리상태가 완료된 프라미스의 결과값을 리턴한다. 말그대로 레이스에서 승리한 결과만 리턴한다.
```tsx
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 결과값: 1
```

### Promise.resolve와 Promise.reject
<code>Promise.resolve</code> <code>Promise.reject</code>는 <code>async</code>과 <code>await</code>를 쓰면 된다. 근래에는 거의 안씀.. 

</details>


# 브라우저 환경과 다양한 명세서

<details>
 <summary>자세히 보기</summary>

> 자바스크립트는 본래 웹 브라우저에서 사용하려고 만든 언어이지만 진화를 거쳐 다양한 사용자와 플랫폼을 지원하는 언어로 변모하였다. 

- 자바스크립트가 돌아가는 플랫폼은 Host(호스트)라고 부른다. (웹서버, 심지어 커피 머신도 호스트가 될 수 있다.)
- 호스트 환경은 플랫폼에 특정되는 객체와 함수를 제공한다. (웹 브라우저는 웹페이지를 제어하기 위한 수단, Node.js는 서버 사이드 기능 등을 제공)

### 호스트 환경이 웹 브라우저일 때 사용할 수 있는 기능 
<img width="377" alt="스크린샷 2023-04-23 오후 4 56 35" src="https://user-images.githubusercontent.com/49556566/233827300-8b7e694a-00c3-49bc-be6b-e2b1ba0ce173.png">

대표적인 예로 최상단엔 <code>window</code>라 불리는 '루트' 객체가 있다. 

- <code>window</code>는 자바스크립트 코드의 전역 객체이다.
- 브라우저 창(browser window)를 대변하고, 이를 제공할 수 있는 메서드를 제공

### 문서 객체 모델(DOM)

> <code>문서 객체 모델</code>은 웹 페이지 내의 모든 콘텐츠를 객체로 나타내준다. 이 객체는 추후 수정이 가능해집니다. 

> <code>document</code> 객체는 페이지의 기본 '진입점' 역할을 합니다. <code>document</code> 객체를 이용해 페이지 내 무엇이든 변경할 수 있고 원하는 것을 만들 수 있습니다.

```tsx
// 배경을 붉은색으로 변경하기
document.body.style.background = "red";

// 1초 후 원상태로 복구하기
setTimeout(() => document.body.style.background = "", 1000);
```

> <code>DOM</code>은 브라우저만을 위한 모델이 아닙니다.
<code>DOM</code> 명세서엔 문서의 구조와 이를 조작할 수 있는 객체에 대한 설명이 담겨있습니다. 예를 들어서 HTML 페이지를 다운로드하고 이를 가공해주는 서버 사이드 스크립트에서도 <code>DOM</code>을 사용할 수 있습니다. 

### 스타일링을 위한 CSSOM
> CSS 규칙과 스타일시트는 HTML과 다른 구조를 띱니다. 따라서 CSS 규칙과 스타일시트를 객체로 나타내고 이 객체를 읽고 쓸지에 대한 설명을 담은 <code>CSS 객체 모델(CSSOM)</code>이 따로 존재합니다.


### 브라우저 객체 모델 (BOM)
> <code>브라우저 객체 모델(BOM)</code>은 문서 이외의 모든 것을 제어하기 위해 브라우저(호스트)가 제공하는 추가 겍체를 나타냅니다.

ex) navigator, location 
```tsx
alert(location.href); // 현재 URL을 보여줌
if (confirm("위키피디아 페이지로 가시겠습니까?")) {
  location.href = "https://wikipedia.org"; // 새로운 페이지로 넘어감
}
```
</details>

# 제너레이터

<details>
 <summary>자세히 보기</summary>
 
> 일반 함수는 하나의 값(혹은 0개의 값)만을 반환한다. 하지만 <code>제너레이터(generator)</code>를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있으며, 제너레이터와 이터러블 객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있다.

### 제너레이터 함수

```tsx
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```
> 제너레이터 함수는 일반 함수와 동작 방식이 다르다. 제너레이터 함수를 호출하면 코드가 실행되지 않고, 대신 실행을 처리하는 특별 객체, <code>제너레이터 객체</code>가 반환된다.
> <code>next()</code>는 제너레이터의 주요 메서드이다. <code>next()</code>를 호출하면 가장 가까운 <code>yield <value></code>문을 만날 때까지 실행이 지속된다. (value를 생략할 수도 있는데, 이 경우엔 undefined이 됨.). 이후, <code>yield <value></code>문을 만나면 실행이 멈추고 산출하고자 하는 값인 <code>value</code>가 바깥 코드에 반환된다.

- next()는 항상 아래 두 프로퍼티를 가진 객체를 반환

1. <code>value</code>: 산출 값
2. <code>done</code>: 함수 코드 실행이 끝났으면 true, 아니라면 false

ex) 제너레이터를 이용해 첫 번째 산출 값을 받는 예시
```tsx
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one));
```

- 여기서 <code>generator.next()</code>를 다시 호출해보자.

```tsx
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

- 마지막으로 <code>generator.next()</code>를 다시 호출하면 <code>return</code>에 다다르고 함수가 종료된다.
```tsx
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}
```

### <code>function* f{...} vs function *f(...)</code>

> 둘 중에 어느 것이 맞을까??
  <code>"*"</code>는 종류를 나타내는 것이지 이름을 나타내는 것이 아니므로 <code>"*"</code>는 <code>function</code>에 붙여야 한다. 
  
### 제너레이터 컴포지션

> <code>제너레이터 컴포지션</code>은 제너레이터 안에 제너레이터를 임베딩 할 수 있는 기능이다. <code>yield*</code>를 사용하면 된다. 

ex) 예시
```tsx
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str);
```
### <code>yield</code>를 사용해 제네레이터 안, 밖으로 정보 교환하기 

- <code>yield</code>는 결과를 바깥으로 전달할 뿐만 아니라 값을 제너레이터 안으로 전달하는 것도 가능하다.
- 값을 안, 밖으로 전달하려면 <code>generator.next(arg)</code>를 호출해야 한다. 이때 인수 <code>arg</code>는 <code>yield</code>의 결과가 된다.
- 일반 함수와 다르게 제너레이터의 외부 호출 코드는 <code>next/yield</code>를 이용해 결과를 전달 및 교환한다. 

예시)
```tsx
function* gen() {
  // 질문을 제너레이터 밖 코드에 던지고 답을 기다립니다.
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield는 value를 반환

generator.next(4); // --> 결과를 제너레이터 안으로 전달
```

1. <code>generator.next()</code>를 처음 호출할 땐 항상 인수가 없어야 한다. 인수가 넘어오더라도 무시되어야 한다. <code>generator.next()</code>를 호출하면 실행이 시작되고 첫 번째 <code>yield "2+2=?"</code>의 결과가 반환된다. 이 시점에는 제너레이터가 (*)로 표시한 줄에서 실행을 잠시 멈춘다.
2. 그 후 <code>yield</code>의 결과가 제너레이터를 호출하는 <code>question</code>에 할당된다.
3. 마지막에 <code>generator.next(4)</code>에서 제너레이터가 다시 시작되고 4는 <code>result</code>에 할당된다. 

예시 2) 
```tsx
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

1. 제너레이터 객체가 만들어지고 첫 번째 .next()가 호출되면, 실행이 시작되고 첫 번째 yield에 다다름,
2. 산출 값은 바깥 코드로 반환
3. 두 번째 <code>.next(4)</code>는 첫 번째 <code>yield</code>의 결과가 될 4를 제너레이터 안으로 전달, 그리고 다시 실행
4. 실행 흐름이 두 번째 <code>yield</code>에 다다르고, 산출 값("3 * 3 = ?")이 제너레이터 호출 결과가 됨.
5. 세 번째 next(9)는 두 번째 yield의 결과가 될 9를 제너레이터 안으로 전달, 그리고 실행이 이어지는데, <code>done: true</code>이므로 제너레이터 함수 종료 

### generator.throw

> <code>제너레이터</code>를 사용할 때 외부 코드가 에러를 만들거나 던질 수도 있다.
  에러를 <code>yield</code> 안으로 전달하려면 <code>generator.throw(err)</code>를 호출해야 한다. <code>generator.throw(err)</code>를 호출하게 되면 <code>err</code>는 <code>yield</code>가 있는 줄로 던져진다.

예시)
```tsx
function* generate() {
  let result = yield "2 + 2 = ?"; // Error in this line
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("데이터베이스에서 답을 찾지 못했습니다."));
} catch(e) {
  alert(e); // 에러 출력
}
```

</details>

# async 이터레이터와 제너레이터

<details>
 <summary>자세히 보기</summary>

> <code>비동기 이터레이터(asyncchronous iterator)</code>를 사용하면 비동기적으로 들어오는 데이터를 필요에 따라 처리할 수 있다.
  네트워크를 통해 데이터가 여러 번에 걸쳐 들어오는 상황을 처리할 수 있게 된다. 
  <code>비동기 이터레이터(asyncchronous iterator)</code>를 사용하면 이런 상황을 쉽게 해결할 수 있다. 
  
### async 이터레이터
- 비동기 이터레이터는 일반 이터레이터와 유사하다. (약간의 문법적인 차이는 있다.) 

ex) 일반적인 이터러블 객체 
```tsx
let range = {
 from: 1,
 to: 5,
 
 // for..of 최초 실행 시, Symbol.iterator가 호출
 [Symbol.iterator]() {
  // Symbol.iterator 메서드는 이터레이터 객체를 반환 
  // 이후 for..of 는 반환된 이터레이터 객체만을 대상으로 동작,
  // 다음 값은 next()에서 정해짐 
  return {
   current: this.from,
   last: this.to,
   
   // for..of 반복문에 의해 각 이터레이션마다 next()가 호출
   next() {
    // next()는 객체 형태의 값, {done:.., value: ..} 를 반환 
    if(this.current <= this.last) {
     return { done: false, value: this.current++ };
    } else {
     return { done: true };
    }
   }
  }
 }
}

for(let value of range) {
 alert(value); // 1, 2, 3, 4, 5
}
```

ex) 비동기 이터러블 객체 
```tsx
let range = {
  from: 1,
  to: 5,

  // for await..of 최초 실행 시, Symbol.asyncIterator가 호출
  [Symbol.asyncIterator]() {
    // Symbol.asyncIterator 메서드는 이터레이터 객체를 반환
    // 이후 for await..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 다음 값은 next()에서 정해짐
    return {
      current: this.from,
      last: this.to,

      // for await..of 반복문에 의해 각 이터레이션마다 next()가 호출
      async next() {
        //  next()는 객체 형태의 값, {done:.., value :...}를 반환
        // (객체는 async에 의해 자동으로 프라미스로 감싸짐.)

        // 비동기로 무언가를 하기 위해 await를 사용
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (let value of range) {
    alert(value); // 1,2,3,4,5
  }
})()
```

- 객체를 비동기적으로 반복 가능하도록 하려면, <code>Symbol.asyncIterator</code> 메서드가 반드시 구현되어 있어야 한다.
- 프라미스를 반환하는 메서드인 <code>next()</code>가 구현된 객체를 반환해야 한다.
- <code>next()</code>는 꼭 <code>async</code> 메서드일 필요는 없다. 
- 전개 문법 <code>...</code>은 비동기적으로 동작하지 않는다. 
  <code>alert( [...range] ); // Symbol.iterator가 없기 때문에 에러 발생</code> -> 전개 문법은 <code>await</code>가 없는 <code>for..of</code>와 마찬가지로 <code>Symbol.asyncIterator</code>가 아닌 <code>Symbol.iterator</code>를 찾기 때문에 에러가 발생

### async 제너레이터 

- 일반 제너레이터는 동기적 문법이므로 모든 값은 동기적으로 생산되고 <code>await</code>를 사용할 수 없다. 
- 단 <code>async</code>를 제너레이터 함수 앞에 붙여줌으로써 비동기적으로 사용할 수 있다. 
- <code>async 제너레이터</code>의 <code>generator.next()</code>메서드는 비동기적이 되고, 프라미스를 반환한다는 점은 일반 제너레이터와 async 제너레이터의 또 다른 차이점이다. 
  <code>await</code>을 <code>next()</code>에 붙여줘야 한다. 

```tsx
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, 2, 3, 4, 5
  }
})();
```

### async 이터러블 

```tsx
let range = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*()와 동일
    for(let value = this.from; value <= this.to; value++) {
      // 값 사이 사이에 약간의 공백
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of range) {
    alert(value); // 1, 2, 3, 4, 5
  }
})();
```

- <code>async *[Symbol.asyncIterator]()</code>는 <code>async function*()</code>와 동일하다. 

</details>

# Proxy와 Reflect

<details>
 <summary>자세히 보기</summary>
 
> <code>Proxy</code>는 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체로, 가로채진 작업은 <code>Proxy</code> 자체에서 처리되기도 하고, 원래 객체가 처리하도록 그대로 전달되기도 함.
  <code>Proxy</code>는 다양한 라이브러리와 몇몇 브라우저 프레임워크에서 사용되고 있다. 
  
### Proxy
```tsx
let proxy = new Proxy(target, handler);
```
- <code>target</code> : 감싸게될 객체로, 함수를 포함한 모든 객체 가능
- <code>handler</code> : 동작을 가로채는 메서드인 '트랩(trap)'이 담긴 객체로, 여기서 프락시를 설정 (예시: get 트랩은 target의 프로퍼티를 읽을 때, set 트랩은 target의 프로퍼티를 쓸 때 활성화됨)
- <code>proxy</code>에 작업이 가해지고, <code>handler</code>에 작업과 상용하는 트랩이 있으면 트랩이 실행되어 프락시가 이 작업을 처리할 기회를 얻게 된다. 트랩이 없으면 <code>target</code>에 작업을 직접 수행함. -> 트랩이 없으면 <code>proxy</code>는 <code>target</code>을 둘러싸는 투명한 래퍼가 된다. 
- 요약: <code>handler</code>가 비어있으면 <code>Proxy</code>에 가해지는 작업은 <code>target</code>에 곧바로 전달

ex) 트랩이 없는 프락시 예시
```tsx
let target = {};
let proxy = new Proxy(target, {}); // 빈 핸들러

proxy.test = 5; // proxy.test=를 이용해 값을 쓰면 target에 새로운 값이 설정
alert(target.test);

alert(proxy.test); // proxy.test를 이용해 값을 읽으면 target에서 값을 읽어옴.

for(let key in proxy) alert(key); // proxy를 대상으로 반복 작업을 하면 target에 저장된 값이 반환
```

### get 트랩으로 프로퍼티 기본값 설정하기 

- 프로퍼티 읽기를 가로채려면 <code>handler</code>에 <code>get(target, property, receiver)</code> 메서드가 있어야 한다.
- <code>get</code>메서드는 프로퍼티를 읽으려고 할 때 작동한다. -> 인수는 다음과 같다.
 1. <code>target</code> - 동작을 전달할 객체로 <code>new Proxy</code>의 첫 번째 인자.
 2. <code>property</code> - 프로퍼티 이름
 3. <code>receiver</code> - 타깃 프로퍼티가 getter라면 <code>receiver</code>는 getter가 호출될 때 <code>this</code>이다. 대개는 <code>proxy</code> 객체 자신이 <code>this</code>가 된다. 프락시 객체를 상속받은 객체가 있다면 해당 객체가 <code>this</code>가 되기도 한다. 

ex) 예제
```tsx
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 기본값
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (해당하는 요소가 배열에 없으므로 0이 반환됨)
```

- <code>dictiionary</code>를 프락시로 감싸서 프로퍼티를 읽으려고 할 때 이를 프락시가 가로채도록 하면 우리가 원하는 기능을 구현할 수 있다.

```tsx
let dictionary = {
  'Hello': '안녕하세요',
  'Bye': '안녕히 가세요'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // 프로퍼티를 읽기를 가로챕니다.
    if (phrase in target) { // 조건: 사전에 구절이 있는 경우
      return target[phrase]; // 번역문을 반환합니다
    } else {
      // 구절이 없는 경우엔 구절 그대로를 반환합니다.
      return phrase;
    }
  }
});

// 사전을 검색해봅시다!
// 사전에 없는 구절을 입력하면 입력값이 그대로 반환됩니다.
alert( dictionary['Hello'] ); // 안녕하세요
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (입력값이 그대로 출력됨)
```

### set 트랩으로 프로퍼티 값 검증하기

- 숫자만 저장할 수 있는 배열을 만들고 싶다고 가정한다면, 숫자형이 아닌 값을 추가하려고 하면 에러가 발생하도록 해야 한다.
- 이를 구현하기 위해 프로퍼티에 값을 쓰려고 할 때 이를 가로채는 <code>set</code> 트랩을 사용해 이를 구현해보도록 하겠다. 

ex) <code>set(target, property, value, receiver)</code>
- <code>target</code>: 동작을 전달할 객체로 <code>new Proxy</code>의 첫 번째 인자.
- <code>property</code>: 프로퍼티 이름
- <code>value</code>: 프로퍼티 값
- <code>receiver</code>: <code>get</code> 트랩과 유사하게 동작하는 객체로, setter 프로퍼티에만 관여

<code>set</code> 트랩은 숫자형 값을 설정하려 할 때만 <code>true</code>를, 그렇지 않은 경우엔 (<code>TypeError</code>)가 트리거되고) <code>false</code>를 반환하도록 해야 한다.

```tsx
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 프로퍼티에 값을 쓰는 동작을 가로챕니다.
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 추가가 성공했습니다.
numbers.push(2); // 추가가 성공했습니다.
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // Error: 'set' on proxy

alert("윗줄에서 에러가 발생했기 때문에 이 줄은 절대 실행되지 않습니다.");
```
 - 배열 관련 기능들은 여전히 사용 가능하다. -> 프락시를 사용해도 기존에 있던 기능은 절대로 손상되지 않는다.
 - <code>push</code>나 <code>unshift</code>같이 배열에 값을 추가해주는 메서드들은 내부에서 <code>[[Set]]</code>을 사용하고 있기 때문에 메서드를 오버라이드 하지 않아도 프락시가 동작을 가로채고 값을 검증해준다. 
 - <code>set</code> 트랩을 사용할 땐 값을 쓰는 게 성공했을 때 반드시 <code>true</code>를 반환해줘야 한다. <code>true</code>를 반환하지 않았거나 falsy한 값을 반환하게 되면 <code>TypeError</code>가 발생한다. 
 
### ownKey와 getOwnPropertyDescriptor로 반복하기 
 - <code>Object.keys</code>, <code>for..in</code> 반복문을 비롯한 프로퍼티 순환 관련 메서드 대다수는 내부 메서드 <code>[[OwnPropertyKeys]]</code>(트랩 메서드는 ownKeys임)를 사용해 프로퍼티 목록을 얻는다.
 - 단, 세부 동작 방식엔 차이가 있다. 
 
 1. <code>Object.getOwnPropertyNames(obj)</code> – 심볼형이 아닌 키만 반환
 2. <code>Object.getOwnPropertySymbols(obj)</code> – 심볼형 키만 반환
 3. <code>Object.keys/values()</code> – <code>enumerable</code> 플래그가 true이면서 심볼형이 아닌 키나 심볼형이 아닌 키에 해당하는 값 전체를 반환
 4. <code>for...in</code> 반복문 - <code>enumerable</code> 플래그가 true인 심볼형이 아닌 키, 프로토타입 키를 순회
</details>
 
# 객체를 원시형으로 변환하기 

<details>
 <summary>자세히 보기</summary>
 
 > 객체를 연산하면 어떻게 될까? ex) <code>obj1 + obj2</code> -> 이 경우 객체는 원시값으로 변환되고, 그 후 의도한 연산이 수행된다. 
 - 객체는 논리 평가시 <code>true</code>를 반환한다. 
 - 숫자형으로 변환은 수학 관련 함수를 적용할 때 일어난다. ex) <code>Date</code> 객체 끼리 빼면 두 날짜의 시간 차이가 반환된다.
 - 문자형으로의 형 변환은 대개 <code>alert(obj)</code> 같이 객체를 출력하려고 할 때 일어난다.
 
 ### ToPrimitive
 > 특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다.
   객체 형 변환은 세 종류로 구분되는데 <code>hint</code>라 불리는 값이 구분 기준이 된다. 
   <code>hint</code>는 '목표로 하는 자료형' 정도로 이해하면 된다. 
 
 - <code>String</code>
 > <code>alert</code> 함수같이 문자열을 기대하는 연산을 수행할 때는 hint가 <code>string</code>이 된다.
 
 - <code>number</code>
 > 수학 연산을 적용하려 할 때(객체-숫자형 변환), hint는 <code>number</code>가 된다. 
 
 - <code>default</code>
 > 연산자가 기대하는 자료형이 '확실하지 않을 때' hint는 <code>default</code>가 된다.
   연산자 ==를 사용해 객체-문자형, 객체-숫자형, 객체-심볼형끼리 비교할 때도, 객체를 어떤 자료형으로 바꿔야 할지 확신이 안 서므로 hint는 default가 된다. 
 
 - 크고 작음을 비교하는 <code>></code>, <code><</code>는 원래 문자형과 숫자형 둘다 허용하지만 <code>hint</code>는 <code>number</code>로 고정된다. 
 - <code>boolean</code> hint는 없다. 모든 객체는 그냥 <code>true</code>로 평가된다. 
 
 - 자바스크립트는 형 변환이 필요할 때, 아래와 같은 순서로 원하는 메서드를 찾고 호출한다. 
 1. 객체에 <code>obj[Symbol.toPrimitive](hint)</code>메서드가 있는지 찾고, 있다면 메서드를 호출
    <code>Symbol.toPrimitive</code>는 시스템 심볼로, 심볼형 키로 사용
 2. 1에 해당하지 않고 hint가 <code>"string"</code>이라면, <code>obj.toString()</code>이나 <code>obj.valueOf()</code>를 호출(존재하는 메서드만 실행됨).
 3. 1과 2에 해당하지 않고, hint가 <code>"number"</code>나 <code>"default"</code>라면 <code>obj.valueOf()</code>나 <code>obj.toString()</code>을 호출합니다(존재하는 메서드만 실행됨).
 
 ### <code>Symbol.toPrimitive</code>
 - 내장 심볼이다.
 - 목표로 하는 자료형(hint)를 명명하는 데 사용된다.
 ```tsx
 obj[Symbol.toPrimitive] = function(hint) {
  // 반드시 원시값을 반환
  // hint는 "string", "number", "default" 중 하나가 될 수 있다.
};
 ```
 
 예제)
 ```tsx
 let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 데모:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```
 - 이렇게 메서드를 구현해 놓으면 <code>user</code>는 hint에 따라 문자열로 변환되기도 하고 돈이라는 숫자로 변환되기도 한다. 
 - <code>user[Symbol.toPrimitive]</code>로 이렇게 메서드 하나로 모든 종류의 형 변환을 다룰 수 있다.
 
 ### 반환 타입
 - <code>toString()</code>, <code>valueOf()</code>, <code>Symbol.toPrimitive</code>는 'hint'에 명시된 자료형으로의 형 변환을 보장해 주지 않는다. 
 - <code>toString()</code>이 항상 문자열을 반환하리라는 보장이 없고, <code>Symbol.toPrimitive</code>의 hint가 "number"일 때 항상 숫자형 자료가 반환되리라는 보장이 없다.
 - 한가지 확신할 수 있는 건 객체가 아닌 원시값을 반환해 준다는 것이다. 
 - <code>toString()</code>, <code>valueOf()</code>가 객체를 반환해도 에러를 발생하지 않는다. 다만 이때는 반환 값이 무시되고, 메서드 자체가 존재하지 않았던 것처럼 동작한다.
 - 이러한 이유는 과거 자바스크립트엔 '에러'라는 개념이 잘 정립되어 있지 않았기 떄문이다. 반면에 <code>Symbol.toPrimitive</code>는 무조건 원시자료를 반환해야 한다. 
 
 ### 요약 
 > 연산자별로 어떤 hint가 적용되는지는 명세서에서 찾아볼 수 있다. 연산자가 기대하는 피연산자를 '확신할 수 없을 때’에는 hint가 <code>"default"</code>가 된다. 이런 경우는 아주 드물게 발생. 내장 객체는 대개 hint가 <code>"default"</code>일 때와 <code>"number"</code> 일 때를 동일하게 처리한다. 따라서 실무에선 hint가 <code>"default"</code>인 경우와 <code>"number"</code>인 경우를 합쳐서 처리하는 경우가 많다.

- 객체-원시형 변환엔 다음 알고리즘이 적용

 1. 객체에 <code>obj[Symbol.toPrimitive](hint)</code>메서드가 있는지 찾고, 있다면 호출
 2. 1에 해당하지 않고 hint가 <code>"string"</code>이라면, <code>obj.toString()</code>이나 <code>obj.valueOf()</code>를 호출
 3. 1과 2에 해당하지 않고, hint가 <code>"number"</code>나 <code>"default"</code>라면 <code>obj.valueOf()</code>나 <code>obj.toString()</code>을 호출
 4. <code>obj.toString()</code>만 사용해도 <code>'모든 변환’</code>을 다 다룰 수 있기 때문에, 실무에선 <code>obj.toString()</code>만 구현해도 충분한 경우가 많다. 반환 값도 <code>‘사람이 읽고 이해할 수 있는’</code> 형식이기 때문에 실용성 측면에서 다른 메서드에 뒤처지지 않는다. <code>obj.toString()</code>은 로깅이나 디버깅 목적으로도 자주 사용
 
</details>
 
# 동적으로 모듈 가져오기
 
<details>
 <summary>자세히 보기</summary>
 
 - <code>export</code>문이나 <code>export</code> 문은 <code>정적인</code> 방식이다. 단순하지만 제약사항이 있다.
 - 제약 사항
 1. <code>import</code>문에 동적 매개변수를 사용할 수 없다.
    ex) 
    ```tsx
    import ... from getModuleName(); // 에러 발생 !!!
    ```
 2. 런타임이나 조건부로 모듈을 불러올 수 없다.
    ```tsx
    if(...) {
      import ...; // 모듈을 조건부로 불러올 수 없으므로 에러 발생
    }

    {
      import ...; // import 문은 블록 안에 올 수 없으므로 에러 발생
    }
    ```
 - 이러한 제약사항이 만들어진 이유는 <code>export</code>문이나 <code>export</code>는 코드 구조의 중심을 잡아주는 역할을 하기 때문이다. 
   코드 구조를 분석해 모듈을 한데 모아 번들링하고, 사용하지 않는 모듈은 제거(가지치기)해야 하는데, 코드 구조가 간단하고 고정되어있을 때만 이런 작업이 가능하다.
 
 ### 동적으로 가져오려면 <code>import</code> 표현식
 
 <code>import(module)</code> 표현식은 모듈을 읽고 이 모듈이 내보내는 것들을 모두 포함하는 객체를 담은 이행된 프라미스를 반환하며 어디에서든 호출이 가능하다.
 > 단, <code>import()</code>는 함수 호출과 문법이 유사해 보이긴 하지만 함수 호출은 아니다. <code>super()</code>처럼 괄호를 쓰는 특별한 문법 중 하나이다. 따라서 <code>import</code>를 변수에 복사하거나 <code>call/apply</code>를 사용하는 것이 불가능하다. -> 함수가 아니기 떄문
 
 ```tsx
 let modulePath = prompt("어떤 모듈을 불러오고 싶으세요?");

 import(modulePath)
  .then(obj => <모듈 객체>)
  .catch(err => <로딩 에러, e.g. 해당하는 모듈이 없는 경우>)
 
 let {hi, bye} = await import('./say.js');

 hi();
 bye();
 ```
 
 만약 <code>export default</code>를 사용하면 다음과 같이 사용하면 된다. <code>default</code>를 쓰면 된다. 
 ```tsx
 // 📁 say.js
 export default function() {
   alert("export default한 모듈을 불러왔습니다!");
 }
 
 let obj = await import('./say.js');
 let say = obj.default;
 // 위 두 줄을 let {default: say} = await import('./say.js'); 같이 한 줄로 줄일 수 있습니다.

 say();
 ```

</details>

# 롱 폴링 

<details>
 <summary>자세히 보기</summary>
 
 > 폴링(long polling)을 사용하면 웹소켓이나 server-sent event 같은 특정한 프로토콜을 사용하지 않아도 아주 간단히 서버와 지속적인 커넥션을 유지할 수 있다. 
 
 ### Regular Polling
 - 방식
  1. 서버는 먼저 클라이언트가 온라인 상태임을 인식
  2. 해당 시점까지 받은 메시지 패킷을 보낸다.

 - 단점
  1. 메시지는 최대 10초까지 지연되어 전달된다.
  2. 메시지가 없는 경우에도 사용자가 다른 곳으로 전환하거나 절전 모드에 있는 경우에도 10초마다 서버에 요청이 전송된다. 
 > 따라서 성능적으로 한계가 있다. (서비스 규모가 작은 경우 폴링은 꽤 괜찮은 방식)
 
### Long polling
> 롱 폴링은 일반 폴링보다 더 나은 방식이다. -> 지연 없이 메시지를 전달한다. 
- 방식
  1. 요청이 서버로 전송된다.
  2. 서버는 보낼 메시지가 있을 때까지 연결을 닫지 않는다.
  3. 메시지가 나타나면 서버는 요청을 응답한다.
  4. 브라우저가 즉시 새 요청을 한다. 
 
 - 롱 폴링을 구현한 함수 <code>subscribe</code>는 <code>fetch</code>를 사용해 요청을 보내고 응답이 올 때까지 기다린다음 응답을 처리하고 스스로 다시 요청을 보낸다. 
 ex) 
 ```tsx
  async function subscribe() {
   let response = await fetch("/subscribe");

   if (response.status == 502) {
     // Status 502 is a connection timeout error,
     // may happen when the connection was pending for too long,
     // and the remote server or a proxy closed it
     // let's reconnect
     await subscribe();
   } else if (response.status != 200) {
     // An error - let's show it
     showMessage(response.statusText);
     // Reconnect in one second
     await new Promise(resolve => setTimeout(resolve, 1000));
     await subscribe();
   } else {
     // Get and show the message
     let message = await response.text();
     showMessage(message);
     // Call subscribe() again to get the next message
     await subscribe();
   }
 }

 subscribe();
 ```
 
</details>
 
# 커스텀 에러와 에러 확장
 
<details>
 <summary>자세히 보기</summary>

> 개발을 하다 보면 자체 에러 클래스가 필요한 경우가 종종 생긴다.
  네트워크 관련 작업 중 에러가 발생했다면 <code>HttpError</code>, 데이터베이스 관련 작업 중 에러가 발생했다면 <code>DbError</code>, 
  검색 관련 작업 중 에러가 발생했다면 <code>NotFoundError</code>를 사용하는 것이 직관적이기 때문이다.

 > 직접 에러 클래스를 만든 경우, 이 에러들은 <code>message</code>이나 <code>name</code>, 가능하다면 <code>stack</code> 프로퍼티를 지원해야 한다. 
   물론 이런 프로퍼티 이외에도 다른 프로퍼티를 지원할 수 있다. 
   <code>HttpError</code> 클래스의 객체에 <code>statusCode</code> 프로퍼티를 만들고 404나 403, 500같은 숫자를 값으로 지정할 수 있다.
 
 > <code>throw</code>의 인수엔 아무런 제약이 없기 때문에 커스텀 에러 클래스는 반드시 <code>Error</code>를 상속할 필요가 없다. 
   그렇지만 <code>Error</code>를 상속받아 커스텀 에러 클래스를 만들게 되면 <code>obj instanceof Error</code>를 사용해서 에러 객체를 식별할 수 있다는 장점이 생긴다. 
   이런 장점 때문에 맨땅에서 커스텀 에러 객체를 만드는 것보다 <code>Error</code>를 상속받아 에러 객체를 만드는 것이 낫다.
 
 ### 에러 확장하기 
 
 - 먼저 <code>Error</code> 클래스 확인하기 
 
 ```tsx
 // 자바스크립트 자체 내장 에러 클래스 Error의 '슈도 코드'
 class Error {
   constructor(message) {
     this.message = message;
     this.name = "Error"; // (name은 내장 에러 클래스마다 다릅니다.)
     this.stack = <call stack>;  // stack은 표준은 아니지만, 대다수 환경이 지원합니다.
   }
 }
 ```
 
 - 이제 <code>ValidationError</code>에서 <code>Error</code>를 상속받아 다음과 같이 만들 수 있다. 
 
 ```tsx
 class ValidationError extends Error {
   constructor(message) {
     super(message);
     this.name = "ValidationError";
   }
 }
 ```

 - 위의 예제에서 부모 생성자를 호출하고 있다는 것에 주목 -> 자바스크립트에서는 자식 생성자 안에서 super를 반드시 호출해야 한다. 

 ### 더 깊게 상속하기 
 
 - 위의 <code>Validation Error</code> 클래스는 너무 포괄적이어서 뭔가 잘못될 확률이 있다. 꼭 필요한 프로퍼티가 누락되거나 잘못된 문자열 값이 들어가는 것처럼 형식이 잘못된 경우를 처리할 수 었다.
 - 필수 프로퍼티가 없는 경우에 대응할 수 있도록 좀 더 구체적인 클래스를 만들어 보자 
 
 ```tsx
 class ValidationError extends Error {
   constructor(message) {
     super(message);
     this.name = "ValidationError";
   }
 }

 class PropertyRequiredError extends ValidationError {
   constructor(property) {
     super("No property: " + property);
     this.name = "PropertyRequiredError";
     this.property = property;
  }
 }
 
 function readUser(json) {
   let user = JSON.parse(json);

   if (!user.age) {
     throw new PropertyRequiredError("age");
   }
   if (!user.name) {
     throw new PropertyRequiredError("name");
   }

   return user;
 }
 
 try {
   let user = readUser('{ "age": 25 }');
 } catch (err) {
   if (err instanceof ValidationError) {
     alert("Invalid data: " + err.message); // Invalid data: No property: name
     alert(err.name); // PropertyRequiredError
     alert(err.property); // name
   } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
   } else {
    throw err; // 알려지지 않은 에러는 재던지기 합니다.
   }
 }
 ```
 
 - 여기서 주목할 점은 <code>PropertyRequiredError</code> 생성자 안에서 <code>this.name</code>을 수동으로 할당해 주었다는 것이다. 그런데 이렇게 매번 커스텀 에러 클래스의 생성자 안에서 <code>this.name</code>를 할당하는 것은 귀찮은 작업이다.
 - 이런 귀찮은 작업은 <b>'기본 에러'</b> 클래스를 만들고 커스텀 에러들이 이 클래스를 상속받게 함으로써 피할 수 있다. <code>this.name = this.constructor.name</code>
 
 ```tsx
 class MyError extends Error {
   constructor(message) {
     super(message);
     this.name = this.constructor.name;
   }
 }

 class ValidationError extends MyError { }

 class PropertyRequiredError extends ValidationError {
   constructor(property) {
     super("No property: " + property);
     this.property = property;
   }
 }

 alert( new PropertyRequiredError("field").name );  
 ```
 
</details>
 

# 주요 노드 프로퍼티
 
<details>
 <summary>자세히 보기</summary>
 
 ### DOM 노드 클래스
 - 모든 DOM 노드는 공통 조상으로부터 만들어지기 때문에 노드 종류는 다르지만, 모든 DOM 노드는 공통된 프로퍼티와 메서드를 지원한다.
 - DOM 노드는 종류에 따라 대응하는 내장 클래스가 다르다.
 - 계층 구조 꼭대기에는 <code>EventTarget</code>이 있는데, <code>Node</code>는 <code>EventTarget</code>을, 다른 DOM 노드들은 <code>Node</code> 클래스를 상속받는다. 
 <img width="485" alt="DOM_extends_tree" src="https://github.com/in-ch/modern-javascript/assets/49556566/f82dd956-8a8d-4bca-953f-79cd811b129e">
 
 - 각 클래스는 다음과 같은 특징을 지닌다.
  - <code>EventTarget</code>: 루트에 있는 추상 클래스로, 이 클래스에 대응하는 객체는 실제로 만들어 지지 않는다. 
    <code>EventTarget</code>가 모든 DOM 노드의 베이스에 있기때문에 DOM 노드에서 '이벤트'를 사용할 수 있다. 
 - <code>Node</code>: 추상 클래스로, DOM 노드의 베이스 역할을 한다. <code>getter</code> 역할을 하는 <code>parentNode</code>, <code>nextSibling</code>, <code>childNodes</code> 등의 주요 트리 탐색 기능을 제공한다. <code>Node</code> 클래스의 객체는 절대 생성되지 않는다. 하지만 이 클래스를 상속받는 클래스는 여럿 있다. 텍스트 노드를 위한 <code>Text</code> 클래스와 요소 노드를 위한 <code>Element</code> 클래스, 주석 노드를 위한 Comment클래스는 <code>Node</code>클래스를 상속받는다.
 - <code>Element</code>: DOM 요소를 위한 베이스 클래스이다. <code>nextElementSibling</code>, <code>children</code>이나 <code>getElementsByTagName</code>, <code>querySelector</code> 같이 요소 전용 탐색을 도와주는 프로퍼티나 메서드가 이를 기반한다.
 - <code>HTMLElement</code> HTML 요소 노드의 베이스 역할을 하는 클래스이다. 
 
 - 이렇게 특정 노드에서 사용할 수 있는 프로퍼티와 메서드는 상속을 기반으로 결정된다. 
 - 브라우저 콘솔에 <code>console.dir(elem)</code>를 입력하면 이런 관계를 쉽게 확인할 수 있다. 
 
 ### 'innerHTML+=' 사용 시 주의점
 ```tsx
 chatDiv.innerHTML += "<div>안녕하세요<img src='smile.gif'/> !</div>";
 chatDiv.innerHTML += "잘 지내죠?";
 ```
 - 위와 같이 사용할 수 있는데 이는 추가가 아니라 내용을 덮어쓰기 때문에 주의해서 사용해야 한다. 
 - 즉, <code>innerHTML+=</code>는 다음과 같은 일을 한다.
  1. 기존 내용 삭제
  2. 기존 내용과 새로운 내용을 합친 새로운 내용을 씀 
 - 따라서 기존 내용이 <code>완전히 삭제</code> 후 밑바닥부터 다시 내용이 쓰여지기 때문에 이미지 등의 리소스 전부가 다시 로딩된다.
 - 이외에도 부작용이 있다. 기존에 있던 텍스트를 마우스로 드래그한 상황이라면 내용을 다시 써야하기 때문에 드래그가 해제될 것이다. <code><input></code> 태그에서 사용자가 입력한 값이 사라지기도 한다. 
 
 ### <code>outerHTML</code> ?? 
 - <code>innerHTML</code>과 달리 <code>outerHTML</code>을 사용해서 HTML을 쓸땐 요소 자체가 바뀌지 않는다. 대신 <code>outerHTML</code>은 DOM 안의 요소를 교체한다. 
 ```tsx
 <div>Hello, world!</div>

 <script>
   let div = document.querySelector('div');

   // div.outerHTML를 사용해 <p>...</p>로 교체
   div.outerHTML = '<p>새로운 요소</p>'; // (*)

   // 어! div가 그대로네 ?
   alert(div.outerHTML); // <div>Hello, world!</div> (**)
 </script>
 ```

 - <code>div.outerHTML=...</code>는 다음과 같은 일을 한다.
 1. 문서에서 div를 삭제
 2. 새로운 HTML 조각인 <code><p>A new element</p></code>을 삭제 후 생긴 공간에 삽입
 3. div엔 여전히 기존 값이 저장되어 있고 새로운 HTML 조각은 어디에도 저장되어있지 않다.
 - 이러한 동작 때문에 <code>outerHTML</code>을 사용할 때는 실수 할 여지가 많다. 
 - 정리하자면 <code>innerHTML</code>은 div를 수정하지만 <code>outerHTML</code>은 div를 수정하지 않는다. 그렇기 때문에 <code>outerHTML</code>에 무언가를 쓸 때는 <code>element</code>이 수정되지 않는 점을 알아야 한다. 할당받은 HTML은 <code>element</code>이 있던 공간에 들어간다. 새롭게 만들어진 요소를 참조하려면 DOM 쿼리 메서드를 사용해야 한다. 
 
 
 
 
</details>
 
# 화살표 함수에 대한 고촬 

<details>
 <summary>자세히 보기</summary>

- 일반 함수는 호출될 때 동적으로 바인딩된 this 값을 가진다. 이것은 함수가 어떻게 호출되느냐에 따라 <code>this</code>가 달라질 수 있음을 의미한다. 예를 들어, 객체의 메서드로 정의된 일반 함수의 경우, <code>this</code>는 해당 객체를 참조한다. 
- 화살표 함수는 자신만의 <code>this</code>를 가지고 있지 않고, 외부 스코프(최상위 함수)의 <code>this</code>를 그대로 사용한다. 이것은 화살표 함수가 생성될 때 결정되며 변경되지 않음을 의미한다. 따라서 화살표 함수 내에서 <code>this</code>를 사용하면 외부 스코프의 <code>this</code>를 사용하게 된다. 
 
```typescript
function outerFunction() {
  const arrowFunction = () => {
    console.log(arguments); // 화살표 함수에서 arguments를 출력
  };
  arrowFunction();
}
outerFunction(1, 2, 3);
```

- arguments 객체에서도 차이가 발생하는데 일반 함수는 <code>arguments</code>객체를 사용하여 함수에 전달된 모든 인수에 접근할 수 있다. 
- 화살표 함수는 그 객체를 가지고 있지 않고 대신, 화살표 함수 외부 스코프에서 인수를 사용해야 한다. -> 만약 <code>arguments</code>를 호출하게 되면 외부 스코프의 <code>arguments</code>를 참조하게 된다. 

- 화살표 함수는 <code>this</code>가 없기 때문에 생성자로 사용이 불가하다. 

- <code>arguments</code> 객체는 JavaScript에서 함수 내부에서 사용할 수 있는 특별한 객체이다. -> 유사 배열 객체인데, 이는 배열과 유사한 인덱스로 인수에 접근할 수 있지만, 배열의 메서드(<code>pop</code>, <code>push</code>, <code>forEach</code>)를 직접 사용할 수는 없다.

- <code>arguments[인덱스]</code>를 사용하여 특정 인덱스에 해당하는 인수에 접근할 수 있다. 

- 만약 react 라이프 사이클에서 arrow function을 사용하게 되면 해당 함수는 자신만의 <code>this</code>를 가지고 있지 않기 때문에 외부 스코프의 <code>this</code>를 상속받게 된다 -> 문제 발생 !!! 따라서 함수 선언문을 통해 콜백 함수 내에서 <code>this</code>가 제대로 컴포넌트 인스턴스를 참조할 수 있도록 해야 한다. 

- 화살표 함수로 객체 메소드를 사용할 때 발생 가능한 오류 

```typescript
const obj = {
  value: 42,
  getValue: () => {
    console.log(this.value); // undefined
  },
};
```

- DOM 이벤트 핸들러로 사용할 때 발생 가능한 예상치 못한 오류 (****)

```typescript
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log(this); // window 객체를 가리킴, 예상과 다름
});
```

</details>