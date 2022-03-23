// ..??
// const { create } = require("json-server")

;(function () {
  'use strict'

  // ����(target)�� ���������͸� ��ȯ
  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos')

  const createTodoElement = (item) => {
    const { id, content } = item
    const $todoItem = document.createElement('div')
    // class�� item�߰�
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

    // ���� html�� ����
    return $todoItem
  }

  const renderAllTodos = (todos) => {
    // <div class="todos"></div>�ȿ� json���� �ҷ��� ������� ������
    // �ʱ�ȭ
    $todos.innerHTML = '';
    
    // todos�� ���� �迭�� �����µ�, ����Ʈ �������� �ϳ��� ������ �������
    // foreach()���
    todos.forEach((item) => {
      const todoElement = createTodoElement(item);
      $todos.appendChild(todoElement)
    })
  }

  const getTodos = () => {
    // fetch('')�ȿ� ������ json url(json-server)�־��ֱ�
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      // renderAllTodos() �Լ� �ۼ�
      .then((todos) => renderAllTodos(todos))
      // ���� �ڵ鸵
      .catch((error) => console.error(error));
  }

  const init = () => {
    // �Ľ��� �Ϸ�Ǿ��� �� getTodos()�Լ� ȣ��
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })
  }
  init()
})()
