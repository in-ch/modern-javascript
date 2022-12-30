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