import {removeClassActive} from "../utils/helper.js";

(() => {
    const images = document.querySelectorAll('.bg-images__image')

    let i = 0;
    setInterval(() => {
        removeClassActive(images);
        images[i].classList.add('active')
        i++;
        i >= images.length && (i = 0);
    }, 4000)
})()