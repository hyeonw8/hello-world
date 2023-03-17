const form  = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

/*
    1. 삭제 버튼 추가
    2. 저장 기능 추가
    3. 삭제 버튼 클릭 -> 저장된 데이터 업데이트 (새로고침 시 사라지는 문제 해결)
 */

const delItem = (event) => {
    const target = event.target.parentElement;
    target.remove(); 
}

const addItem = (text) => { //input.value가 여기선 text로 취급
    if(text !== '') {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerText = text;
        // li.innerText = text; text가 혼자 li 태그 자체에 들어가 있으니까 text를 별도의 span 태그를 묶어줌
        button.innerText = 'delete';
        button.addEventListener('click', delItem);
        
        ul.appendChild(li);
        li.appendChild(span);
        li.appendChild(button);
    }
}

const handler = (event) => {
    event.preventDefault();
    addItem(input.value);
    input.value = '';
}

form.addEventListener('submit', handler);