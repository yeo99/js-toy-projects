// ..??
// const { create } = require("json-server")

;(function () {
  'use strict'

  // ����(target)�� ���������͸� ��ȯ
  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos');
  // �� �� �Է������� ������ ������ ���ֵ��� �ϱ����� form�� DOM ������
  const $form = get('.todo_form');
  const $todoInput = get('.todo_input');

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

  // ���ΰ�ħ��. Ajax����Ұǵ� ���ΰ�ħ�� ���� �ʿ� �����Ƿ� preventDefault() �߰�
  const addTodo = (e) => {
    e.preventDefault();
    
    // ������ ������ todo���� content, completed, (id�� �ڵ����� ��)
    const todo = {
      content: $todoInput.value,
      completed: false,
    }

    // $form���� submit �̺�Ʈ�� �߻��� ���, �̺�Ʈ�����ʷ� ���� addTodo()ȣ��, $todoInput�� �Էµ� value���� �ֿܼ� ����
    // console.log($todoInput.value);
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
      // CREATE�ϰ� ���� �ٽ� ���θ���Ʈ�� �޾ƿ�
    }).then(getTodos)
      .then(() => {
        // CREATE�� Input �Է�ĭ ����ְ�
        $todoInput.value = '';
        // focus�� Input �Է�ĭ���� �����
        $todoInput.focus();
      })
  }

  const init = () => {
    // �Ľ��� �Ϸ�Ǿ��� �� getTodos()�Լ� ȣ��
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })
    // submit �̺�Ʈ�� �߻��� ���, addTodo()�Լ��� ȣ��
    $form.addEventListener('submit', addTodo);
  }
  init()
})()
