import {removeClassActive} from "../utils/helper.js";

(() => {
    const images = document.querySelectorAll('.bg-images__image');
    const handlerNews = document.querySelector('.logo-block__news-mobile');
    const newsBlock = document.querySelector('.news');

    handlerNews.addEventListener('click', () => {
        handlerNews.classList.toggle('active')
        newsBlock.classList.toggle('active')
    })

    let i = 0;
    setInterval(() => {
        removeClassActive(images);
        images[i].classList.add('active')
        i++;
        i >= images.length && (i = 0);
    }, 4000)
})()