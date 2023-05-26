export const createContainers = (parentClassName, childrenClassname, count, innerData = ['']) => {
    const parentDiv = document.querySelector(parentClassName);
    for (let i = 0; i < count; i++) {
        const container = document.createElement("div");
        container.classList.add(childrenClassname);
        container.innerHTML = innerData[i];
        parentDiv.appendChild(container);
    }
}

export const dataOutputAndCreateBlock = (parentBlock, innerClass, data = '') => {
    const childrenDiv = document.createElement("div")
    childrenDiv.classList.add(innerClass)
    childrenDiv.innerHTML = `${data}`
    parentBlock.appendChild(childrenDiv)
}

export const pastPostTo = (to, posts, titlesColumns) => {
    for(let i = 0; i < to.length; i++) {
        const title = document.createElement('div')
        const content = document.createElement('div')

        title.classList.add('row-container__mobile-title')
        content.classList.add('row-container__content')

        title.innerHTML = titlesColumns[i]
        content.innerHTML = posts[i]

        to[i].appendChild(title)
        to[i].appendChild(content)
    }
}

export const createStructureOfTabs = (heading, labels, titleColumn) => {
    createContainers('.tabs', 'h1', 1, [heading]);
    createContainers('.tabs', 'wrapper-tabs', 1, );
    createContainers('.wrapper-tabs', 'tab-labels', 1);
    createContainers('.tab-labels', 'tab-labels__label', labels.length);
    createContainers('.wrapper-tabs', 'tabs-titles', 1);
    createContainers('.tabs-titles', 'tabs-titles__title', titleColumn.length, titleColumn);
    createContainers('.wrapper-tabs', 'tab-elems', 1);
    createContainers('.tab-elems', 'tab-elems__elem', labels.length);

    const domLabels = document.querySelectorAll('.tab-labels__label');
    domLabels.forEach((label, index) => {
        label.innerHTML = labels[index];
    })
}