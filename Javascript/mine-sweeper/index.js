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
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
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
  for (let k = 0; k< shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // (85 /10); // 8번째 줄
    const hor = shuffle[k] % cell; // 85 % 10; // 5번째 칸
    data[ver][hor] = CODE.MINE;
  }
  return data;
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
    })
}