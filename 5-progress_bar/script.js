;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let timerId;

  // throttle 조정
  const throttle = (callback, time) => {
    if (timerId) return;
    timerId = setTimeout( () => {
      callback();
      // throttle을 구현하려면 계속 초기화를 해줘야해서...
      timerId = undefined;
    }, time)
  } 

  const $progressBar = get('.progress-bar');

  const onScroll = () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // scrollTop을 이용하여 스크롤바 위치 받아오기
    const scrollTop = document.documentElement.scrollTop;


    const width = (scrollTop / height) * 100;
    /* width를 0으로 지정해놓고, width의 %값을 변경해주는 방식으로 progress-bar 제작 */
    $progressBar.style.width = width + '%';
    

  }

  // ms 단위로 쓰로틀 정도를 조절(=100ms)
  window.addEventListener('scroll', () => throttle(onScroll, 100));
})()
