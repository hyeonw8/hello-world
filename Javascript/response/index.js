const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime; //안에 선언하면 안됨...! let은 블록이니까,,
let endTime;
const records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
  if(event.target.classList.contains('waiting')) { //blue
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요'; 
    timeoutId = setTimeout(function () { //타이머가 그대로 남아있기 때문에 성급하시군요 다음에도 클릭하세요로 넘어감! 그래서 timeoutId 추가
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '클릭하세요!';
    }, Math.floor(Math.random() * 1000) + 2000); //2000~3000사이의 수(2초 ~ 3초)
  } else if (event.target.classList.contains('ready')) { //red
    clearTimeout(timeoutId); // 타이머 필요없으면 지워야함
    $screen.classList.remove('ready');
    $screen.classList.add('waiting');
    $screen.textContent = '너무 성급하시군요!';
  } else if (event.target.classList.contains('now')) { //green
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
    startTime = null; //위에 거 초기화하기 위해서, 이전 값이 혹시나 있을 수도 있기 때문에 해주면 좋음.
    endTime = null;
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요!';
  }
});