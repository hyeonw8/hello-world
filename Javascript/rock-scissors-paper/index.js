const buttons = document.querySelectorAll('button');
const computerChoice = document.querySelector('.computer-choice');
const myChoice = document.querySelector('.my-choice');
const winner = document.querySelector('.result');

const gm_result = ['가위', '바위', '보'];

const show = (user, computer, result) => {
    computerChoice.innerText = computer;
    myChoice.innerText = user;
    winner.innerText = result;
}

const game = (user, computer) => {
    let message;

    if(user === computer){
        message = '무승부';
    } else {
        switch (user + computer) {
            case '가위바위':
            case '바위보':
            case '보가위':
                message = 'you lose,,,';
                break;
            case '가위보':
            case '바위가위':
            case '보바위':
                message = 'you win!!!';
                break;
        }
    }
    show(user, computer, message);
}

const play = (event) => {
    const user = event.target.innerText;
    const randomIndex = Math.floor(Math.random() * 3);
    const computer = gm_result[randomIndex];
    game(user, computer);
}

buttons.forEach((button) => {
    button.addEventListener('click', play);
});