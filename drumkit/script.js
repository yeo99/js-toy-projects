;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }

  // 원래는 NodeList지만(유사배열) Array.from()을 이용하여 배열로 변환함
  const keys = Array.from(getAll('.key'));

  const soundRoot = 'assets/sounds/'
  const drumSounds = [
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]

  const getAudioElement = (index) => {
    const audio = document.createElement('audio');
    audio.dataset.key = drumSounds[index].key;
    audio.src = soundRoot + drumSounds[index].sound
    return audio
  }

  const onkeydown = (e) => {
    console.log(e.keyCode)
    playSound(e.keyCode)
  }

  const playSound = (keyCode) => {
    const $audio = get(`audio[data-key="${keyCode}"]`);
    const $key = get(`div[data-key="${keyCode}"]`);
    
    if ($audio && $key) {
      // 재생시 확대되면서 색상이 변하는 효과 추가. (스타일시트에 .playing)
      $key.classList.add('playing')
      // 재생시간 초기화
      $audio.currentTime = 0;
      $audio.play();
    }
  }

  const onMouseDown = (e) => {
    const keycode = e.target.getAttribute('data-key');
    playSound(keycode);
  }

  const onTransitionEnd = (e) => {
    // 이벤트의 속성 이름이 transform일 경우
    if (e.propertyName == 'transform') {
      // 이벤트 타겟의 class에서 playing을 없애줌
      e.target.classList.remove('playing');
    }
  }

  const init = () => {
    window.addEventListener('keydown', onkeydown)
    keys.forEach((key, index) => {
      const audio = getAudioElement(index)
      key.appendChild(audio)
      key.dataset.key = drumSounds[index].key;
      key.addEventListener('click', onMouseDown);
      // 트랜지션이 끝났을때에 이벤트를 걸음. .playing 속성 없애야해서
      key.addEventListener('transitionend', onTransitionEnd);
    })
  }
  init();
})()
