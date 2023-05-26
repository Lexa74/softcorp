import {addClassActiveElems, removeClassActive} from "./utils/helper.js";
import {getAllPosts} from "./utils/api.js";
import {createStructureOfTabs, dataOutputAndCreateBlock, pastPostTo} from "./engineWinners/creators.js";
import {heading, labels, titlesColumns} from "./constantsWinners/constantsWinners.js";

(async () => {
    createStructureOfTabs(heading, labels, titlesColumns);

    const tabLabels = document.querySelectorAll('.tab-labels__label');
    const tabElems = document.querySelectorAll('.tab-elems__elem');
    const tabs = document.querySelector('.wrapper-tabs');
    const hideTabs = document.querySelector('.tabs .h1');

    const innerDataFromApiInDom = (data, element) => {
        element.innerHTML = ''
        data.map((resData, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('tab-row')
            element.appendChild(newDiv)

            const tabRow = element.getElementsByClassName('tab-row')
            titlesColumns.forEach(() => {
                dataOutputAndCreateBlock(tabRow[index], 'row-container')
            })

            const rowContainer = tabRow[index].getElementsByClassName('row-container')

            // Для вывода данных добавить в эту функцию входным параметром в posts массив с полями вывода
            pastPostTo(rowContainer, [resData.title, resData.body], titlesColumns)
        })
    }

    tabLabels.forEach((label,index) => {
        label.addEventListener('click', async () => {
            const postsFromData = await getAllPosts(index + 1);
            removeClassActive(tabLabels)
            removeClassActive(tabElems)
            addClassActiveElems([tabElems[index], tabLabels[index]])
            innerDataFromApiInDom(postsFromData, tabElems[index])
        })
    })

    hideTabs.addEventListener('click', (event) => {
        tabs.classList.toggle('hide')
        event.target.classList.toggle('hide')
    })

    //Действия при загрузке страницы

    addClassActiveElems([tabElems[0], tabLabels[0]]);
    innerDataFromApiInDom(await getAllPosts(1), tabElems[0])
})()