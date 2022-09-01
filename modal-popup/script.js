;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }

  // dom요소 저장
  const $button = get('.modal_open_button');
  const $modal = get('.modal');
  const $body = get('body');
  const $modalCancleButton = get('.modal_button.cancel');
  const $modalConfirmButton = get('.modal_button.confirm');

  const toggleModal = () => {
    $modal.classList.toggle('show');
    $body.classList.toggle('scroll_lock');
  }

  $button.addEventListener('click', () => {
    toggleModal();
  });

  $modalCancleButton.addEventListener('click', () => {
    toggleModal();
  })

  $modalConfirmButton.addEventListener('click', () => {
    toggleModal();
  })

  // 모달 영역 밖을 클릭할 시 모달 창 닫음
  window.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target === $modal) {
      toggleModal();
    }
  })
})()
