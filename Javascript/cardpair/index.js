const $wrapper = document.querySelector('#wrapper');

const total = 12; // 처음 카드 12장 만들어서 배치
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
let colorCopy = colors.concat(colors); // concat 원본수정하지 않고 새로운 배열 생성,얕은 복사
let shuffled = [];
let clicked = [];
let completed = [];

function shuffle() { // 피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}
// > 자식 표시
function createCard(i) { // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement('div');
  card.className = 'card'; // .card 태그 생성
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // .card-inner 태그 생성
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // .card-front 태그 생성
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // .card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

function onClickCard() {
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) {
      return;
    }
    setTimeout(() => {
      alert('축하합니다!');
      resetGame();
    }, 1000);
    return;
  }
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
  }, 1000);
  
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll('.card').forEach((card, index) => { // 초반 카드 공개
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => { // 카드 감추기
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}
startGame(); 

function resetGame() {
  $wrapper.innerHTML='';
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}