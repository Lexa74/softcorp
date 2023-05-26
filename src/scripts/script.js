import {removeClassActive} from "./utils/helper.js";

(() => {
    const select = document.querySelector('.select');
    const resultSelect = document.querySelector('.select__result');
    const resultRange = document.querySelector('.range-result');
    const rangeVal = document.querySelector('.range-block__input-range');
    const options = document.querySelectorAll('.select ul li');



    select.addEventListener('click', () => {
        select.classList.toggle('active')
    })

    options.forEach((option) => {
        option.addEventListener('click', () => {
            const val = option.textContent;
            removeClassActive(options);
            option.classList.add('active');
            resultSelect.innerHTML = val;
        })
    })

    rangeVal.addEventListener('input', (e) => {
        resultRange.innerHTML = `${e.target.value} %`
    })
})
()