import {addClassActiveElems, removeClassActive} from "./utils/helper.js";
import {getAllPosts} from "./utils/api.js";
import {createStructureOfTabs} from "./engineWinners/creators.js";

(async () => {
    const labels = ['Первая неделя', 'Вторая неделя', 'Третья неделя', 'Четвертая неделя', 'Пятая неделя', 'Шестая неделя'];
    const titlesColumn = ['E-mail', 'Приз']
    const heading = 'Победители';

    createStructureOfTabs(heading, labels, titlesColumn);

    const tabLabels = document.querySelectorAll('.tab-labels__label');
    const tabElems = document.querySelectorAll('.tab-elems__elem');
    const tabs = document.querySelector('.wrapper-tabs');
    const hideTabs = document.querySelector('.tabs .h1');
    let heightWrapperTabs;
    setTimeout(() => {
        heightWrapperTabs = tabs.offsetHeight
        tabs.style.height = `${heightWrapperTabs}px`;
    },1000)

    const dataOutput = (parentBlock, innerClass, data) => {
        const childrenDiv = document.createElement("div")
        childrenDiv.classList.add(innerClass)
        parentBlock.appendChild(childrenDiv)
        childrenDiv.innerHTML = `${data}`
    }

    const innerDataFromApiInDom = (data, element) => {
        element.innerHTML = ''
        data.map((resData, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('tab-row')
            element.appendChild(newDiv)
            const elementForInner = element.getElementsByClassName('tab-row')
            dataOutput(elementForInner[index], 'email-winners', resData.title)
            dataOutput(elementForInner[index], 'prize', resData.body)
        })
    }

    tabLabels.forEach((label,index) => {
        label.addEventListener('click', async () => {
            const postsFromData = await getAllPosts(index + 1);
            removeClassActive(tabLabels)
            removeClassActive(tabElems)
            addClassActiveElems([tabElems[index], tabLabels[index]])
            await innerDataFromApiInDom(postsFromData, tabElems[index])
        })
    })

    hideTabs.addEventListener('click', (event) => {
        tabs.classList.toggle('hide')
        event.target.classList.toggle('hide')
        // console.log(heightWrapperTabs)
        if(!tabs.classList.contains('hide')) {
            tabs.style.height = `${heightWrapperTabs}px`;
        } else {
            tabs.style.height = `0px`
        }
    })



    //Действия при загрузке страницы

    addClassActiveElems([tabElems[0], tabLabels[0]]);
    await innerDataFromApiInDom(await getAllPosts(1), tabElems[0])

    const wrapperTabs = document.querySelector('.tab-elems__elem.active');
    // console.log(hideTabs.offsetHeight)
    // console.log(heightWrapperTabs)

})()