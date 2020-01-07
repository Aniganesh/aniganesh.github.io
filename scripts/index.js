"use strict";

const widthSetItems = document.querySelectorAll("[class*='w-'");
widthSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[w][\-][0-9]+/; //Look for a sequence starting with a 'w' followed by a hyphen (-) and atleast one number
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    let size = "";
    index += 2;
    while (elementClass[index] && !(isNaN(elementClass[index]))) {
        size += elementClass[index];
        index++;
    }
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; width: " + size + "px" : "width:" + size + "px";
    item.setAttribute("style", style);
});

const paddingSetitems = document.querySelectorAll("[class*='p-']");
paddingSetitems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[p][\-][0-9]/; // Look for a sequence starting with a 'p' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 2];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding: " + size + "em" : "padding:" + size + "em";
    item.setAttribute("style", style);

});

const marginSetitems = document.querySelectorAll("[class*='m-']");

marginSetitems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[m][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 2];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin: " + size + "em" : "margin: " + size + "em";
    item.setAttribute("style", style);

});