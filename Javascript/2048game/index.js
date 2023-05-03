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
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2; // 2넣기
}
startGame();

data = [
  [0, 2, 4, 2],
  [0, 0, 8, 0],
  [2, 2, 4, 8],
  [0, 16, 0, 4],
];
draw();
function moveCells(direction) { // 방향에 따라 한쪽으로 몰아주기
  switch (direction) {
    case 'left': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1]; // 마지막값이 이전 값이 되기 때문에
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
              currentRow[currentRow.length - 1] *= -2; // 연속적으로 합쳐지는 것을 방지하기 위해 2가 아니고 -2
            } else {
              newData[i].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0; // 그래서 이부분에서 -없애기 위해 절댓값 씌어줌!
        });
      });
      break;
    }
    case 'right': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1]; // 마지막값이 이전 값이 되기 때문에
            if (prevData === rowData[3 - j]) { // 이전 값과 지금 값이 같으면
              currentRow[currentRow.length - 1] *= -2; // 연속적으로 합쳐지는 것을 방지하기 위해 2가 아니고 -2
            } else {
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][rowData[3 - j]] = Math.abs(newData[i][j]) || 0; // 그래서 이부분에서 -없애기 위해 절댓값 씌어줌!
        });
      });
      break;
    }
    case 'up': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1]; // 마지막값이 이전 값이 되기 때문에
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
              currentRow[currentRow.length - 1] *= -2; // 연속적으로 합쳐지는 것을 방지하기 위해 2가 아니고 -2
            } else {
              newData[j].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[j][cellData] = Math.abs(newData[i][j]) || 0; // 그래서 이부분에서 -없애기 위해 절댓값 씌어줌!
        });
      });
      break;
    }
    case 'down': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (data[3 - i][j]) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1]; // 마지막값이 이전 값이 되기 때문에
            if (prevData === data[3 - i][j]) { // 이전 값과 지금 값이 같으면
              currentRow[currentRow.length - 1] *= -2; // 연속적으로 합쳐지는 것을 방지하기 위해 2가 아니고 -2
            } else {
              newData[j].push(data[3 - i][j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0; // 그래서 이부분에서 -없애기 위해 절댓값 씌어줌!
        });
      });
      break;
    }
  }
  put2ToRandomCell();
  draw();
}
window.addEventListener('keyup', (event) => {
  if (event.key === 'Arrowup') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});

let startCoord;
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY];
});
window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left');
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right');
  } else if (diffX > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down');
  } else if (diffX < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up');
  }
});