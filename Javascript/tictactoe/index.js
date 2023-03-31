const { body } = document; //const body = documnet.body; {}안에 여러 쓸 수 도 있음, 구조분해할당

const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

const callback = (event) => {
  if (event.target.textContent !== '') { //칸에 글자가 있나?
    console.log('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  event.target.textContent = turn;
  if (turn === 'O') { //턴 넘기기
    turn = 'X';
  } else if (turn === 'X') {
    turn = 'O';
  }
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $td.addEventListener('click', callback);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
body.append($table);
body.append($result);
