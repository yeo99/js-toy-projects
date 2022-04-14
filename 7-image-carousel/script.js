;(function () {
    'use strict';

    const get = (target) => {
        return document.querySelector(target);
    }


    class Carousel{
        constructor(carouselElement) {
            this.carouselElement = carouselElement;
            this.itemClassName = 'carousel_item';
            // carouselElement안에 있는 모든 아이템들을 가져옴(nodeList로)
            this.items = this.carouselElement.querySelectorAll('.carousel_item');

            this.totalItems = this.items.length;    // 5
            this.current = 0    // 처음으로 뜨는 이미지
            this.isMoving = false   // isMoving이 true인 경우에는 버튼을 눌러도 이벤트가 동작하지 않게 작업
        }

        initCarousel() {
            this.isMoving = false
            this.items[0].classList.add('active');
            this.items[1].classList.add('next');
            this.items[this.totalItems-1].classList.add('prev');
        }

        disabledInteraction() {
            this.isMoving = true;
            // 콜백 500ms
            setTimeout(() => {
                this.isMoving = false;
            }, 300)
        }

        // previous, next로 가는 버튼 클릭시 사용될 이벤트 지정
        setEventListener() {
            this.prevButton = this.carouselElement.querySelector('.carousel_button--prev');
            this.nextButton = this.carouselElement.querySelector('.carousel_button--next');

            this.prevButton.addEventListener('click', () => {
                // prev버튼 클릭시 movePrev()메서드 실행
                this.movePrev();
            })
            this.nextButton.addEventListener('click', () => {
                // next버튼 클릭시 moveNext()메서드 실행
                this.moveNext();
            })
        }

        moveCarouselTo() {
            // 캐러셀이 움직이는 동안에 moveCarousel()이 호출되면 return해버림
            if (this.isMoving) return;
            this.disabledInteraction();
            let prev = this.current - 1;
            let next = this.current + 1;
            
            if (this.current === 0) {
                prev = this.totalItems - 1; // 4
            } else if (this.current == this.totalItems -1) {
                next = 0;
            }

            for (let i=0; i<this.totalItems; i++) {
                if ( i == this.current ) {
                    // 띄워쓰기 해줘야함. class="a b"
                    this.items[i].className = this.itemClassName + ' active';
                } else if ( i == prev) {
                    this.items[i].className = this.itemClassName + ' prev';
                } else {
                    this.items[i].className = this.itemClassName
                }
            }
        }

        moveNext() {
            // 근데 계속 올라가면 안되니까 current값을 조정해줌
            if(this.current === this.totalItems - 1) {
                this.current = 0
                // next누르면 페이지가 변경(올라가야)함.
            } else {
                this.current++
            }
            // 캐러셀 움직이게 메서드 작성
            this.moveCarouselTo();
        }

        movePrev() {
            // 현재 current가 0인 경우인데 movePrev를 눌렀다면(current는 무조건 1이상이므로)
            if (this.current === 0) {
                // 제일 끝 이미지로 보내줌
                this.current = this.totalItems - 1;
            } else {
                this.current--
            }
            // 캐러셀 움직이게 메서드 작성
            this.moveCarouselTo();
        }
    }

    // DOMContentLoaded가 발생할 때 블럭 안의 내용들이 실행
    // DOMContentLoaded는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생
    document.addEventListener('DOMContentLoaded', () => {
        const carouselElement = get('.carousel');
        const carousel = new Carousel(carouselElement);

        // 초기화
        carousel.initCarousel();
        // 이벤트 리스너를 각 버튼에다가 달아주는 함수
        carousel.setEventListener();
    })
})()