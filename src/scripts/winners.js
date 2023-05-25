import {addClassActiveElems, removeClassActive} from "./utils/helper.js";
import {getAllPosts} from "./utils/api.js";
import {createStructureOfTabs} from "./engineWinners/creators.js";

(async () => {
    const labels = ['Первая неделя', 'Вторая неделя', 'Третья неделя', 'Четвертая неделя', 'Пятая неделя'];
    createStructureOfTabs(labels)

    const tabLabels = document.querySelectorAll('.tab-labels__label');
    const tabElems = document.querySelectorAll('.tab-elems__elem');
    const tabs = document.querySelector('.tabs');
    const hideTabs = document.querySelector('.winners .title');

    // const getDivWithClass = (className) => {
    //     const childrenDiv = document.createElement("div")
    //     childrenDiv.classList.add(className)
    // }

    const clearDomElems = (domElems) => {
        domElems.forEach((domElem) => {
            domElem.innerHTML = ''
        })
    }

    const dataOutput = (parentBlock, innerClass, data) => {
        const childrenDiv = document.createElement("div")
        childrenDiv.classList.add(innerClass)
        parentBlock.appendChild(childrenDiv)
        childrenDiv.innerHTML = `${data}`
    }

    const innerDataFromApiInDom = (data, element) => {
        const prize = element.getElementsByClassName('prize');
        const email = element.getElementsByClassName('email-winners');
        clearDomElems([prize[0], email[0]]);

        data.map(responseData => {
            dataOutput(prize[0], 'inner-prize', responseData.body)
            dataOutput(email[0], 'inner-email', responseData.title)
        })
    }

    tabLabels.forEach((label,index) => {
        label.addEventListener('click', async () => {
            removeClassActive(tabLabels)
            removeClassActive(tabElems)
            addClassActiveElems([tabElems[index], tabLabels[index]])
            await innerDataFromApiInDom(await getAllPosts(index + 1), tabElems[index])
        })
    })

    hideTabs.addEventListener('click', () => {
        tabs.classList.toggle('hide')
    })

    //Заполнение при загрузки страницы

    addClassActiveElems([tabElems[0], tabLabels[0]]);
    await innerDataFromApiInDom(await getAllPosts(1), tabElems[0])

})()