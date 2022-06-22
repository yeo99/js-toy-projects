// ..??
// const { create } = require("json-server")

;(function () {
  'use strict'

  // 인자(target)의 쿼리셀렉터를 반환
  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos');
  // 할 일 입력했을때 서버로 데이터 쏴주도록 하기위해 form의 DOM 가져옴
  const $form = get('.todo_form');
  const $todoInput = get('.todo_input');
  const API_URL = `http://localhost:3000/todos`
  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const $todoItem = document.createElement('div')
    const isChecked = completed ? 'checked' : ''
    // class에 item추가
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox'
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `

    // 만든 html을 리턴
    return $todoItem
  }

  const renderAllTodos = (todos) => {
    // <div class="todos"></div>안에 json에서 불러온 내용들이 들어가야함
    // 초기화
    $todos.innerHTML = '';
    
    // todos가 지금 배열로 들어오는데, 리스트 형식으로 하나씩 렌더링 해줘야함
    // foreach()사용
    todos.forEach((item) => {
      const todoElement = createTodoElement(item);
      $todos.appendChild(todoElement)
    })
  }

  const getTodos = () => {
    // fetch('')안에 가져올 json url(json-server)넣어주기
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      // renderAllTodos() 함수 작성
      .then((todos) => {
        renderAllTodos(todos)
      })
      // 에러 핸들링
      .catch((error) => console.error(error.message));
  }

  // 새로고침됨. Ajax통신할건데 새로고침이 굳이 필요 없으므로 preventDefault() 추가
  const addTodo = (e) => {
    e.preventDefault()
    const content = $todoInput.value
    if (!content) return
    const todo = {
      content,
      completed: false,
    }
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then(getTodos)
      .then(() => {
        $todoInput.value = ''
        $todoInput.focus()
      })
      .catch((error) => console.error(error.message))
  }

  const toggleTodo = (e) => {
    // todos에 이벤트 리스너가 걸려있으면 아무곳이나 클릭해도 함수가 호출되니까. if문과 .className을 통해 예외처리
    if(e.target.className !== 'todo_checkbox') return
    // 체크박스가 몇번째인지를 모르니까 data-id번호로 판단하기 위해 .item을 가진 엘리먼트의 data-id를 가져옴
    const $item = e.target.closest('.item')
    const id = $item.dataset.id;
    const completed = e.target.checked;
    console.log(id);
    fetch(`${API_URL}/${id}`, {
      method:'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({completed}),
    })
      .then(getTodos)
      .catch(error => console.error(error))
  }

  // Todo List 수정기능 추가
  const changeEditMode = (e) => {
    // 수정 버튼 눌렀을때 보이거나, 보이지 않아야하는 부분들
    const $item = e.target.closest('.item');
    const $label = $item.querySelector('label');
    const $editInput = $item.querySelector('input[type="text"]');
    const $contentButtons = $item.querySelector('.content_buttons');
    const $editButtons = $item.querySelector('.edit_buttons');
    const value = $editInput.value;

    if (e.target.className === 'todo_edit_button') {
      // 수정할 내용이 사라지는게 자연스럽기에 해당 display 속성을 변경
      $label.style.display = 'none';
      // 수정버튼 클릭 후 입력하는 텍스트는 display block으로
      $editInput.style.display = 'block';
      // 수정버튼 클릭 전 표시되던 수정/삭제 버튼이 가려지고 확인 취소 버튼이 떠야하므로
      $contentButtons.style.display = 'none';
      $editButtons.style.display = 'block';

      // 수정 버튼 눌렀을때 수정하려는 문구에 focus기능 추가(.focus())
      $editInput.focus()
      // 커서가 value 맨 뒤로가야하는데.. 맨 앞으로간다. 일단 $editInput.value를 초기화
      $editInput.value = ''
      // 초기화된 $editInput.value에 원래 value값을 다시 넣어준다. 커서가 끝으로 간다.
      $editInput.value = value;
    }
    // x(취소) 버튼 누르면 반대로 동작하게 해야함
    if (e.target.className === 'todo_edit_cancel_button') {
      $label.style.display = 'block';
      $editInput.style.display = 'none';
      $contentButtons.style.display = 'block';
      $editButtons.style.display = 'none';

      // 수정중 취소 버튼을 누른 후, 다시 수정 버튼을 누르면 취소했던 수정내용이 다시 뜬다.
      // value값을 변경해주어야 함
      $editInput.value = $label.innerText;
    }
  }

  const editTodo = (e) => {
    // className이 일치하지 않을경우 return시킴
    if (e.target.className !== 'todo_edit_confirm_button') return
    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const $editInput = $item.querySelector('input[type="text"]');
    // 수정값을 넣은 Input의 value를 저장함
    const content = $editInput.value

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      // JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환합니다.
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ content }),
      // then체이닝으로 PATCH한 후 다시 GET해옴
    }).then(getTodos)
      .catch((error) => console.error(error))
  }

  // 함수들 기능이 다 비슷비슷.. TODO: 공통화하여 코드 길이 줄이기
  const removeTodo = (e) => {
    if (e.target.className !== 'todo_remove_button') return;
    const $item = e.target.closest('.item');
    const id = $item.dataset.id

    fetch(`${API_URL}/${id}`, {
      // 헤더나 바디는 필요 없음. 데이터를 보내는게 아니기 때문에
      method: 'DELETE',
      // getTodos로 다시 받아오고 에러 핸들링
    }).then(getTodos)
      .catch((error) => console.error(error));
  }

  const init = () => {
    // 파싱이 완료되었을 때 getTodos()함수 호출
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })
    // submit 이벤트가 발생할 경우, addTodo()함수를 호출
    $form.addEventListener('submit', addTodo);
    $todos.addEventListener('click', toggleTodo);
    $todos.addEventListener('click', changeEditMode);
    $todos.addEventListener('click', editTodo);
    $todos.addEventListener('click', removeTodo);
  }
  init()
})()
