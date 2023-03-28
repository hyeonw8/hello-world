const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime; //안에 선언하면 안됨...! let은 블록이니까,,
let endTime;
$screen.addEventListener('click', (event) => {
  if(event.target.classList.contains('waiting')) { //blue
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요'; 
    setTimeout (function () {
      startTime = new Date(); // 시작 시간 재기
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '클릭하세요!';
      
    }, Math.floor(Math.random() * 1000) + 2000); //2000~3000사이의 수(2초 ~ 3초)
  } else if (event.target.classList.contains('ready')) { //red

  } else if (event.target.classList.contains('now')) { //green
    endTime = new Date(); // 끝 시간 재기
    $result.textContent = `${endTime - startTime}ms`// 시간 차이 저장하기
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요!';
  }
});