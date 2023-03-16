// 산술 연산자
// +, -, *, /, %(나머지연산자)
   
console.log(10 % 2) //나머지 0
console.log(10 % 3) //나머지 1 

// ** 지수 연산자
console.log(2 ** 3) //결과값은 8

// 증감 연산자
// ++ 1증가, -- 1감소
let number = 10;
number++;
console.log(number); //결과값은 11  

// a=123이고, b='123'일 때
// a==b 결과는 true (추상비교)
// a===b 결과는 false (엄격비교, 타입까지 일치하는 지 확인) 일반적인 case에서 사용
// a!==b 결과는 true

// 논리 연산자 &&, ||, !(not 연산자)

const a = 2 < 3;
const b = 30 > 50;

console.log(a && b) //결과값은 false, 둘다 참(1)이여야 참
console.log(a || b) //결과값은 true, 하나만 참(1)이여도 참
console.log(!a) //원래 a의 결과는 true지만 부정이니까 false

// 삼항 연산자
// 조건 ? 참일 때 실행될 부분 :  거짓일 때 실행될 부분
console.log(2 < 3 ? '참' : '거짓'); //결과값은 참

//널리쉬 Nullish 연산자 ??
//여러 개의 피연산자 중 값이 확정되어 있는 변수를 찾음
/* const a = undefined;
const b = null;
const c = 'hyeon';

console.log(a ?? b ?? c);  결과값은 c
 */

// 비트 연산자 &, |, ~, ^, <<, >>

// 대입 연산자 =
// 복합 대입 연산자 +=. -=. *=, /=, %=, **=

let number1 = 10;
number1 = number1 + 2;
number1 += 2; //위, 아래 식은 동일함

// 전개 구문 (Spread Syntax) ...
const numbers = [1,2,3];
console.log(...numbers); //하면 numbers가 갖고 있는 배열이 출력됨 1 2 3
console.log(numbers); // (3)[1,2,3] 이런식으로 출력