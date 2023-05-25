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

export const createContainers = (parentClassName, childrenClassname, count, innerData = '') => {
    const parentDiv = document.querySelector(parentClassName);
    for (let i = 0; i < count; i++) {
        const container = document.createElement("div");
        container.classList.add(childrenClassname);
        container.innerHTML = innerData;
        parentDiv.appendChild(container);
    }
}