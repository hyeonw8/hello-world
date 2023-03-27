const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];

while (candidate.length > 0){ // 45개 전체를 섞어서 랜덤으로 하나씩 뽑아서 다른 배열을 만드는 것
    const random = Math.floor(Math.random() *  candidate.length); // 무작위 인덱스 불가
    const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
    const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
    shuffle.push(value); // shuffle 배열에 넣기
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) =>  a - b); //a-b 오름차순
// 작은 수부터 보여주기 위해 뽑은 6개를 순서대로 정렬
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

const showBall = (number, $target) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number
    $target.appendChild($ball);
}

for (let i = 0; i < winBalls.length; i++) {
    setTimeout(() => {
        showBall(winBalls[i], $result);
    }, (i + 1) * 1000);
}

setTimeout(() => {
    showBall(bonus, $bonus);
}, 7000);