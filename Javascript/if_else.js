// 조건문 if, else, else if
// 하나의 조건문을 작성할 때 if, else는 한 번만 사용.
// if로 시작, else로 끝나야 함(else는 없어도 됨) 
// else if는 if와 else 사이에 작성, 하나의 조건문에 여러 개 사용 가능!

const a = 10;
const b = 20;
const c = 20;

if (a > b) {
    console.log('a가 더 작아요!');
} else if (b === c) {
    console.log('b랑 c가 같습니다!');
} else {
    console.log('여기는 언제 출력될까요?');
}