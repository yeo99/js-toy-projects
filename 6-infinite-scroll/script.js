;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    // 현재 페이지에서 onScroll()의 if문을 만족할 시 1씩 더해주는 방식으로 페이지를 불러옴
    let page = 1;
    // 한 loadPost()당 10개로 제한하기 위해 limit 변수 추가
    const limit = 10;
    const $posts = get('.posts');
    // 불러올 수 있는 총 post의 개수. 사용중인mockDB의 json객체가 100개니까 100으로 지정
    const end = 100;
    // 현재까지 불러온 post의 개수
    let total = 10;
    // Loader를 가져옴
    const $loader = get('.loader');

    const getPost = async () => {
     const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
     const response = await fetch(API_URL)
     if (!response.ok) {
         throw new Error('Error')
     }
     return await response.json();
    }

    const showPosts = (posts) => {
        posts.forEach((post) => {
            // fetch로 받은 내용을 div에 넣어주기위해 div 생성
            const $post = document.createElement('div');
            // 만든 div에 .post추가
            $post.classList.add('post');
            $post.innerHTML = `
                <div class="header">
                    <div class="id">${post.id}</div>
                    <div class="title">${post.title}</div>
                </div>
                <div class="body">
                    ${post.body}
                </div>
            `
            $posts.appendChild($post);
        })
    }

    const showLoader = () => {
        // css파일을 보면 loader에 show라는 클래스가 붙어있을 경우 opacity가 1로 변경됨.
        // 이를 이용하여 .show를 스크립트를 통해 추가해줌
        $loader.classList.add('show');
    }

    const hideLoader = () => {
        // 로딩이 다 되었다면 $loader에 show클래스를 제거하여 opacity를 0으로 돌려줌
        $loader.classList.remove('show');
    }

    const loadPost = async () => {
    // 원래 opacity가 0인 로딩 엘레먼트(로딩할때 꼼지락꼼지락하는 그거)를 보여주게함.
    showLoader();
    try{
        const response = await getPost();
        console.log(response);
        showPosts(response);
        }catch(error) {
            console.error(error);
        } finally {
        // 로딩 엘레먼트를 사라지게
        hideLoader();
        }
    }

    const onScroll= () => {
        // progressbar 만들었을 때 활용했었던 scrollheight, scrolltop 활용해야함.
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
        // 현재까지 불러온 값이 불러올 수 있는(=mockDB의 총 json 객체 수)와 같으면 더 이상 불러오지 않게
        // 개발자도구에서 Network 탭으로 봤을 때, 100개 이상은 더이상 불러오지 않는다. (원래는 계속 파라미터값이 올라갔음)
        if (total == end) {
            // 모든 post를 보여줬을 때, 더이상 scroll이벤트 리스너가 필요 없으므로, remove해준다.
            window.removeEventListener('scroll', onScroll)
            return
        }
        // scrollTop과 clientHeight를 더한 값이 scrollHeight-5와 같다면(살짝 미리 API를 불러오기위해서)
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            page++;
            total += 10;
            loadPost();
            console.log(page);
        }
    }

    // DOMContentLoaded가 발생할 때 블럭 안의 내용들이 실행
    // DOMContentLoaded는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생
    window.addEventListener('DOMContentLoaded', () => {
        // Post를 불러오는 함수
        loadPost();
        // scroll 이벤트가 발생할 때, onScroll()이라는 함수를 불러옴
        window.addEventListener('scroll', onScroll)
    });
})()