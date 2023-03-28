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

let interbalID = setInterval(changeComputerHand, 50);

let clickable = true;

const clickButton = () => {
    if(clickable) {
        clearInterval(interbalID);
        clickable = false;

        setTimeout(() => {
            interbalID = setInterval(changeComputerHand, 50);
        }, 1000);
    }  
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);