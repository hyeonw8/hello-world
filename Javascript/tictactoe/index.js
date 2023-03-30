const $table = document.createElement('table');
const $result = document.createElement('div');
let turn = 'O';

const data = [];
for(i=0; i<3; i++) {
  data.push([]); 
}

for (let i=0; i<3; i++) {
  const $tr = document.createElement('tr');
  for(let i=0; i<3; i++){
    const $td = document.createElement('td');
    $td.addEventListener('click', (event) => {
      if(event.target.textContent) return; //칸에 글자가 있나?
      event.target.textContent = turn;
      if (turn === 'O'){ //턴 넘기기
        turn = 'X';
      } else if (turn === 'X') {
        turn = 'O';
      }
    }); 
    $tr.append($td);
  }
  $table.append($tr);
}
document.body.append($table);
document.body.append($result);
