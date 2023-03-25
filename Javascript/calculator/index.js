let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator'); //tag 저장할 때 $붙여서 표현해주면 좋음
const $result = document.querySelector('#result');
const onClickNumber =  (event)  => {// {}와 return 붙으면 생략 가능
    //return undefined; 함수 자리인데 undefined를 넣어놔서 오류 발생, 따라서 함수를 넣어주어야함
    // 안에 내용이 없어서 실행안됨, 따라서 return 하는 함수에 실제로 어떤 동작을 하는 지를 넣어줘야(여기선 return 생략)
        if(!operator) { // empty
            numOne += event.target.textContent;
            $result.value += event.target.textContent;
            return;
        } 
         if(!numTwo) {
            $result.value='';
         }
        numTwo += event.target.textContent;
        $result.value += event.target.textContent;
    };// 고차 함수 (high  order function)

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);

const onClickOperator = (op) => () => {
    if (numOne) {
        operator = op;
        $operator.value = op;
    } else {
        alert('숫자를 먼저 입력하세요.');
    }
}
document.querySelector('#plus').addEventListener('click', onClickOperator("+"));
document.querySelector('#minus').addEventListener('click', onClickOperator("-"));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#calculate').addEventListener('click', () => {
    if(numTwo) {
        switch (operator) {
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                break;
            case '-':
                $result.value = numOne - numTwo;
                break;
            case '*':
                $result.value = numOne * numTwo;
                break;
            case '/':
                $result.value = numOne / numTwo;
                break;
            default:
                break;
        }
    } else {
        alert('숫자를 먼저 입력하세요');
    }
});
document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
});

