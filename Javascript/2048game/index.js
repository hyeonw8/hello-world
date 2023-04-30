const $table = document.querySelector('#table');
const $socre = document.querySelector('#socre');
let data = [];

function startGame() {
  const $fragement = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () { // 2차원 배열 생성
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragement.appendChild($tr);
  });
  $table.appendChild($fragement);
  put2ToRandomCell();
  draw();
};

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j]; //td
      if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = 'color-' + cellData;
      } else {
        $target.textContent = '';
        $target.className = '';
      }
    });
  });
}

function put2ToRandomCell() { // 2를 랜덤하게 불러는 주는 함수
  const emptyCells = []; // 빈칸들이 각각 몇번째 칸, 몇번째 줄인지 찾아서 넣기 ex) [[i1, j1], [i2, j2], [i3, j3]]
  data.forEach(function (rowData, i) {
    rowData.forEach(function (cellData, j) {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  }); 
  // randomCell === [i,j]
  const randomCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2; // 2넣기
}
startGame(); 