export const removeClassActive = (elems) => {
    elems.forEach((elem) => {
        elem.classList.remove('active');
    })
}

export const addClassActiveElems = (elems) => {
    elems.forEach((elem) => {
        elem.classList.add('active');
    })
}