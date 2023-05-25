(() => {
    const layout = document.querySelector('.layout');
    const burgerMenu = document.querySelector('.burger');
    const header = document.querySelector('header');

    burgerMenu.addEventListener('click', () => {
        header.classList.toggle('active');
        layout.classList.toggle('active');
    })

    layout.addEventListener('click', () => {
        header.classList.remove('active')
        layout.classList.remove('active')
    })
})()