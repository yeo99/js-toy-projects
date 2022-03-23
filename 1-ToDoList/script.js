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

  const init = () => {
    // 파싱이 완료되었을 때 getTodos()함수 호출
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })
    // submit 이벤트가 발생할 경우, addTodo()함수를 호출
    $form.addEventListener('submit', addTodo);
    $todos.addEventListener('click', toggleTodo)
  }
  init()
})()
