import {createContainers} from "../utils/helper.js";

export const createStructureOfTabs = (tabNames) => {
    createContainers('.tabs', 'tab-labels', 1);
    createContainers('.tab-labels', 'tab-labels__label', tabNames.length);
    createContainers('.tabs', 'tab-elems', 1);
    createContainers('.tab-elems', 'tab-elems__elem', tabNames.length);

    const domLabels = document.querySelectorAll('.tab-labels__label');
    domLabels.forEach((label, index) => {
        label.innerHTML = tabNames[index];
    })
}