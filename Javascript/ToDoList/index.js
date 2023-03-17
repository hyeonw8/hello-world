const form  = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

/*
    1. 삭제 버튼 추가
    2. 저장 기능 추가
    3. 삭제 버튼 클릭 -> 저장된 데이터 업데이트 (새로고침 시 사라지는 문제 해결)
 */

let todos = []; //전체 item을 저장할 배열 생성

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos)); //JSON.stirng 저장하려는 배열을  text 형식으로 바꿔서 저장해줌
} //새로운 item이 추가될 때 마다 로컬 스토리지에 저장된 정보로 업데이트가 되어야 하기 때문에

const delItem = (event) => {
    const target = event.target.parentElement;

    todos = todos.filter((todo) => todo.id !== parseInt(target.id)); //각각의 요소들에 필터를 적용해서 지우려는 타겟의 값과 같지 않은 것들만
                  // todo.id는 숫자고 target.id는 문자라 똑같이 숫자로 맞춰줌  //즉. 지우려는 요소가 아닌 것들만 모아서 다시 그 값을 todos에 저장
    save();
    target.remove(); 
}

const addItem = (todo) => { //input.value가 여기선 text로 취급
    if(todo.text !== '') {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerText = todo.text;
        // li.innerText = text; text가 혼자 li 태그 자체에 들어가 있으니까 text를 별도의 span 태그를 묶어줌
        button.innerText = 'delete';
        button.addEventListener('click', delItem);
        
        ul.appendChild(li);
        li.appendChild(span);
        li.appendChild(button);
        li.id = todo.id;
    }
}

const handler = (event) => {
    event.preventDefault();

    const todo = { // 새로운 item 을 하나의 object로 만들어서 todos 라는 배열에 저장을 해줘야 함, hondler 쪽에서 todo라는 object로 포장
        id: Date.now(),
        text: input.value,
    };

    todos.push(todo); // todos라는 배열에 todo 추가
    addItem(todo); // item을 todo라는 object로 포장했기 때문에 input.value를 todo로 바꿔줘야 함
    save();

    input.value = ''; 
};

const init = () => { //페이지가 로드(초기화) 되면 로컬스토리지에 저장된 기존의 정보가 있다면 해당 정보를 알아서 생성해서 그리게 하기위함
    const userTodos = JSON.parse(localStorage.getItem('todos')); //저장된 todos 가져와서 userTodos에 저장, 아까 문자열 형태로 해놔서 다시 js의 배열 형태로 파싱해줌
    
    if (userTodos) { //usertodos가 있을 때만 forEach문이 실행되게끔
        userTodos.forEach((todo) => {
            addItem(todo);
        });
    
        todos = userTodos; // 전역 todos에도 저장
    }
};

init(); 
form.addEventListener('submit', handler);


 