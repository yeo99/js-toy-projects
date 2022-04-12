;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    const $posts = get('.posts');

    const getPost = async () => {
     const API_URL = 'https://jsonplaceholder.typicode.com/posts'
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

    const loadPost = async () => {
        const response = await getPost();
        console.log(response);
        showPosts(response);
    }

    // DOMContentLoaded가 발생할 때 블럭 안의 내용들이 실행
    // DOMContentLoaded는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생
    window.addEventListener('DOMContentLoaded', () => {
        // Post를 불러오는 함수
        loadPost();
    });
})()