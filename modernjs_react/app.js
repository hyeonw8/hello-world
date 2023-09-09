const onClick = () => {
  const textEl = document.getElementById('add-text');
  const text = textEl.value;
  textEl.value=''; 

  const li = document.createElement('li');
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';

  deleteButton.addEventListener("click", () => {
    const deleteTarget = deleteButton.closest("li");
    //closet은 부모 요소와 일치하는 문자열을 찾는 메서드
    document.getElementById('memo-list').removeChild(deleteTarget);
  });

  div.appendChild(p);
  div.appendChild(deleteButton);

  li.appendChild(div);

  document.getElementById('memo-list').appendChild(li);
  // 메모 목록 리스트에 li 태그 설정
}

//[추가]버튼 클릭 시 onclick 함수를 실행하도록 등록
document.getElementById('add-button').addEventListener(
  "click", ()=> onClick()
)
