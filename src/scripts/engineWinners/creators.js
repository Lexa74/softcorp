import {createContainers} from "../utils/helper.js";

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