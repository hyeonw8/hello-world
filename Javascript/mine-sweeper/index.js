const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
let row = 10; // 줄
let cell = 10; // 칸
let mine = 10;
const CODE = {
  NORMAL: -1, // 닫힌 칸(지뢰 없음)
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 다모두 열린 칸
};
let data;

function planeMine() {
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // shuffle = [85, 19, 93]
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // (85 /10); // 8번째 줄
    const hor = shuffle[k] % cell; // 85 % 10; // 5번째 칸
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target; // td가 이벤트타켓
  const rowIndex = target.parentNode.rowIndex; //target.parentNode = tr, tr의 로우인덱스
  const cellIndex = target.cellIndex; // td의 셀인덱스. 우리가 몇번째 줄 몇변재 칸인지 알기 위해
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.MINE) { // 지뢰면
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) { // 물음표 지뢰면
    data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG_MINE) { // 깃발 지뢰면
    data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
    target.className = '';
    target.textContent = '';
  } else if (cellData === CODE.NORMAL) { // 닫힌 칸이면
    data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) { // 물음표면
    data[rowIndex][cellIndex] = CODE.FLAG; // 깃발로
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG) { //깃발이면
    data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
    target.className = '';
    target.textContent = '';
  }
}

function onLeftClick(event) {
  const target = event.target; // td가 이벤트타켓
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.NORMAL) {
    const count = countMine(rowIndex, cellIndex);
    if (cellData === CODE.NORMAL) { // 닫힌 칸이면
      openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.MINE) { // 지뢰 칸이면
      target.textContent = '펑';
      target.className = 'opened';
      clearInterval(interval);
      $tbody.removeEventListener('contextmenu', onRightClick);
      $tbody.removeEventListener('click', onLeftClick);
    } // 나머지는 무시
    // 아무 동작도 안 함
  }
}

function drawTable() {
  data = planeMine();
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        $td.textContent = 'X'; // 개발 편의를 위해
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick); // 이벤트 버블링
    $tbody.addEventListener('click', onLeftClick);
  });
}
drawTable();
