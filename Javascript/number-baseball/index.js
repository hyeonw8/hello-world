const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n <= 3; n++) { //4번 반복
  const index = Math.floor(Math.random() * numbers.length); // 0~8 정수 => 새로 뽑아서 넣어주고 원래있던거에서 삭제하지만
  // 여전히 뽑는 갯수는 똑같아서 5개밖에 없는데 8을 뽑으면 undefined가 나오게 됨
  answer.push(numbers[index]); //뽑은 값 answer에 넣어주고
  numbers.splice(index, 1); //원래 있던 numbers에서는 삭제하고
}
console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) { //길이는 4가 아닌가
    return alert('4자리 숫자를 입력해 주세요.');
  }
  if (new Set(input).size !== 4) { //중복된 숫자가 있는가
    return alert('중복되지 않게 입력해 주세요.');
  }
  if (tries.includes(input)) { //이미 시도한 값은 아닌가
    return alert('이미 시도한 값입니다.'); // => 이 값들은 undefined인데 if문에 들어가서 false값임
  }
  return true;
} //검사하는 코드

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
  $logs.appendChild(message);
}

let out = 0;
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = '';
  if (!checkInput(value)) {
    return;
  }
  //입력값 문제없음
  if (answer.join('') === value) { // ''안써주면 ,가 붙음
    $logs.textContent = '~~~ HOME RUN ~~~';
    return;
  }
  if (tries.length >= 9) { //10번째 시도일 때 tries에는 9개이기 때문에
    defeated();
    return;
  }
  // 몇 s 몇 B인지 검사
  let strike = 0;
  let ball = 0;
  //ex) answer:3146, value:1347
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) { //겹치는게 있으면 indexOf가 -1보다 큼
      if (index === i) { //index랑 자리가 같은지 확인
        strike = strike + 1;
      } else {
        ball = ball + 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}아웃!`, document.createElement('br'));
  } else {
    $logs.append(`${value}: ${strike}S ${ball}B`, document.createElement('br'));
  }
  if(out === 3) {
    defeated();
    return;
  }
  tries.push(value);


});