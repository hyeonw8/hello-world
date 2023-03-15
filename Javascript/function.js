// 인자 하나 받는 함수
function bok(main) {
    console.log(`${main} 볶음밥`);
}

bok('새우');
bok('제육');

// 인자 두개 받는 함수
function sum(a,b) {
    console.log(a + b);
}

sum(10,20); // 30 출력

/* function a() {
    const b = 10;
    console.log(b);
}

a(); // 10 출력
console.log(b); // 출력안됨. b가 지역변수로 선언되었기 때문에

const b = 10;
function a() {
    console.log(b);
}

a(); // 10 출력
console.log(b); // 출력됨. b가 전역변수로 선언되었기 때문에

const b = 10;
function a() {
    const b = 20;
    console.log(b);
}

a(); // 20 출력 -> 지역변수 b가 더 먼저 인식.
console.log(b); //10 출력 -> 전역변수 b   */

// 함수의 표현식
/* function sum(a,b) {
    console.log(a + b);
}
=
const sum = function (a,b) {
    console.log(a + b);
} */

// 화살표 함수 
/* const sum = (a, b) => console.log(a + b); 코드가 한줄이라면 괄호 생략하고 가능
   const sum = (a, b) => {
    console.log(a + b); // return 값이 없을 때는 return을 안적어도 ㄱㅊ
    return a + b;                   // return 값이 있을 때는 return을 적어야 함
    }


*/

// 일반 함수를 화살표 함수로 바꾸기 예제 -> 노션 참고