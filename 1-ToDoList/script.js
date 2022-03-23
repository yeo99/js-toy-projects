// ..??
// const { create } = require("json-server")

;(function () {
  'use strict'

  // 인자(target)의 쿼리셀렉터를 반환
  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos')

  const createTodoElement = (item) => {
    const { id, content } = item
    const $todoItem = document.createElement('div')
    // class에 item추가
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
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
      .then((todos) => renderAllTodos(todos))
      // 에러 핸들링
      .catch((error) => console.error(error));
  }

  const init = () => {
    // 파싱이 완료되었을 때 getTodos()함수 호출
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })
  }
  init()
})()
