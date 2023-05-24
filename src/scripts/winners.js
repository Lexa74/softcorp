import {addClassActiveElems, removeClassActive} from "./utils/helper.js";
import {getAllPosts} from "./utils/api.js";

(async () => {
    const tabLabels = document.querySelectorAll('.tab-labels__label');
    const tabElems = document.querySelectorAll('.tab-elems__elem');
    const tabs = document.querySelector('.tabs');
    const hideTabs = document.querySelector('.winners .title');

    hideTabs.addEventListener('click', () => {
        tabs.classList.toggle('hide')
    })

    const clearDomElems = (domElems) => {
        domElems.forEach((domElem) => {
            domElem.innerHTML = ''
        })
    }

    const dataOutput = (parentBlock, innerClass, data) => {
        const childrenDiv = document.createElement("div")
        childrenDiv.classList.add(innerClass)
        childrenDiv.innerHTML = `${data}`
        parentBlock.appendChild(childrenDiv)
    }

    const innerDataFromApiInDom = (data, element) => {
        const prize = element.getElementsByClassName('prize');
        const email = element.getElementsByClassName('email-winners');
        clearDomElems([prize[0], email[0]]);

        data.map(responseData => {
            dataOutput(prize[0], 'inner-prize', responseData.body)
            dataOutput(email[0], 'inner-prize', responseData.title)
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

    //Заполнение при загрузки страницы

    addClassActiveElems([tabElems[0], tabLabels[0]]);
    await innerDataFromApiInDom(await getAllPosts(1), tabElems[0])

})()