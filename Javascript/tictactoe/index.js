const { body } = document; //const body = documnet.body; {}안에 여러 쓸 수 도 있음, 구조분해할당

const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

// [
//   [td, td, td],
//   [td, td, td],
//   [td, td, td],
// ]

const checkWinner = (target) => { //target은 tag
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

const callback = (event) => {
  if (event.target.textContent !== '') { //칸에 글자가 있나?
    console.log('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  event.target.textContent = turn;
  //승부 판단하기
  const hasWinner = checkWinner(event.target);
  if (hasWinner) {
    $result.textContent = `${turn}님의 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }
  //무승부 검사
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }
 // turn = trun === 'X' ? 'O' : 'X';
   if (turn === 'O') { //턴 넘기기
    turn = 'X';
  } else if (turn === 'X') {
    turn = 'O';
  };
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener('click', callback);
body.append($table);
body.append($result);
