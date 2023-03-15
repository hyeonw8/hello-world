const number = 10;

switch (number) {
    case 1:
        console.log(number);
        break;
    case 10:
        console.log(number);
        break; 
    default:
        console.log('아무것도 해당되지 않아요!'); 
        // 가장 마지막에 작성, 
        //위에 case 중에 해당하는 것이 없을 때 실행
}

//if와 switch 비교
const num = 10;

if (num % 2 == 0) {
    console.log('짝수');
} else {
    console.log('홀수');
}

switch (num % 2) {
    case 0:
        console.log('짝수');
        break;
    case 1:
        console.log('홀수');
        break;
}

// 일반적으로 if 문을 많이 사용하긴 하지만, 결과값이 딱 떨어지는 때나 조건이 복잡하지 않은
// 경우 등 상황에 따라 맞는 함수를 사용하면 됨.