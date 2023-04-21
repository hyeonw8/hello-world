const $timer = document.querySelector('#timer');
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
let openCount = 0;
let startTime = new Date();
const interval = setInterval(() => {
  const time = Math.floor((new Date() - startTime) / 1000);
  $timer.textContent = `${time}초`;
},1000); 



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

// 1 2 3
// 4 5 6
// 7 8 9

function countMine(rowIndex, cellIndex) { //주변 지뢰갯수 세기
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++; // 앞에가 존재하면 뒤에 i++을 실행~
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; // 한번 열은 칸은 다시 안열도록, ?.넣어줘야 함. rowIndex가 undefined 일 수 있으니
  const target = $tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;
  openCount++;
  console.log(openCount);
  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    clearInterval(interal);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    setTimeout(() => { //화면이 바뀔 수 있는 시간을 주기 위해서 
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 0); 
  }
  return count;
}

function openAround(rI, cI) { // 재귀함수
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) { // 0이면 주변 블럭도 다같이 openAround 실행
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0); // 그런데 이런 식으로 하면 에러가 또 발생하게 됨 => 느리게 열리고, 브라우저가 멈추는 현상 발생
 
}

function onLeftClick(event) {
  const target = event.target; // td가 이벤트타켓
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.NORMAL) { // 닫힌 칸이면
   openAround(rowIndex, cellIndex); // 내 칸을 먼저 열고 내 칸이 0이면 주변 칸도 같이 여는 
  } else if (cellData === CODE.MINE) { // 지뢰 칸이면 ~펑
    target.textContent = 'bomb!';
    target.className = 'opened';
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);

  } // 나머지는 무시
  // 아무 동작도 안 함
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
