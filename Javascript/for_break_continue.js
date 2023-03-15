//for
// for (반복을 위한 조건 명시 - 시작값; 반복의 조건; 증감값;) {

// }

 for (let i = 0; i < 5; i++) {
    console.log(i);
} // 출력값 0,1,2,3,4

/* for (; i < 5; ) {
     console.log(i++);
} 로 도 작성할 수 있음 */

for (let i = 0; i < 5; i++) {
    if (i === 7) {
        break;
    }

    console.log(i);
} // 출력값 0,1,2,3,4,5,6까지만 출력

// continue
// 반복문을 아예 빠져 나가는 것이 아니라 현재 반복문만 종료하고
// 다음 번 반복으로 넘기는 명령어
for (let i = 0; i < 5; i++) {
    if (i === 7) {
        continue;
    }

    console.log(i);
} // 출력값 0,1,2,3,4,5,6,8,9까지 7만 빼고 출력
   
// for of 반복이 가능한 객체, 배열이나 문자열 등에서 사용가능
// 주어진 객체를 차례대로 순회하면서 주어진 코드를 실행하는 방식
const arr = [1, 2, 3];
for (const i of arr) {
    console.log(i);
} // 1,2,3 출력

// while ()안에 조건이 만족할 동안 내부 코드를 반복
let i = 0;
while (i < 10) {
    console.log(i++);
}

// do while 조건문이 반복문 마지막 부분에 위치함
do {
    console.log(i++); // 처음에 이 부분은 무조건 실행되고
} while (i < 10); // 그 다음에 조건을 확인하게 됨.