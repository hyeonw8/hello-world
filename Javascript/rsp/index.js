const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $scissors = document.querySelector('#scissors');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = `auto 200px`;

const rspX = {
    scissors: '0',
    rock: '-220px',
    paper: '-440px',
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
    if(computerChoice === 'rock') {
        computerChoice = 'scissors';
    } else if (computerChoice === 'scissors') {
        computerChoice = 'paper';
    } else if (computerChoice === 'paper') {
        computerChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`; //rspX.computerChoice로 쓰지 않게 주의
    $computer.style.backgroundSize = `auto 200px`;
}

let intervalID = setInterval(changeComputerHand, 50);

const scoreTable = {
    rock: 0,
    scissors: 1,
    paper: -1,
};

let clickable = true;
let score = 0;
const clickButton = (event) => {
    if(clickable) {
        clearInterval(intervalID);
        clickable = false;
        //점수 계산 및 화면 표시
        const myChoice  = event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
            ? 'scissors'
            : 'paper';
        const myScore = scoreTable[myChoice];
        const computerScore = scoreTable[computerChoice];
        const diff = myScore - computerScore;

        let message;
        if(diff === 2 || diff === -1) { // ||로 연결된 식이 많다면 => [2, -1].includes(diff) 더 편리
            score = score + 1;
            message = 'Win!';
        } else if (diff === -2 || diff === 1) {
            score = score - 1;
            message = 'Lose,,,';
        } else {
            message = '무승부';
        }
        $score.textContent = `${message} Total: ${score}point`;
        setTimeout(() => {
            clickable = true;
            intervalID = setInterval(changeComputerHand, 50);
        }, 1000);
    }  
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);