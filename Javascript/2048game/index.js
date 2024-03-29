const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
let data = [];
const history = [];

$back.addEventListener('click', () => {
  const prevData = history.pop();
  if (!prevData) return; // 되돌릴 게 없으면 종료
  $score.textContent = prevData.score; // 점수도 되돌려야 하기 때문!
  data = prevData.table;
  draw();
});

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

startGame();


// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();

function moveCells(direction) { // 방향에 따라 한쪽으로 몰아주기
  history.push({
    table: JSON.parse(JSON.stringify(data)), // 깊은 복사, 참조가 아니라 복사본을 넣어줘야 함
    score: $score.textContent,
  });
  switch (direction) {
    case 'left': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1]; // 마지막값이 이전 값이 되기 때문에
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
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
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
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
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
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
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
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
  if (data.flat().includes(2048)) { // 승리
    draw();
    setTimeout(() => {
      alert('축하합니다. 2048을 만들었습니다!');
    }, 0);
  } else if (!data.flat().includes(0)) { // 빈 칸이 없으면 패배
    alert(`패배했습니다... ${$score.textContent}점`);
  } else {
    put2ToRandomCell();
    draw();
  }
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