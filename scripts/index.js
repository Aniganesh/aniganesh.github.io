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
    size = size.replace(/\s+/g, '');
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

const mtSetItems = document.querySelectorAll("[class*='m-t-']");
mtSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[m][\-][t][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-top: " + size + "em" : "margin-top: " + size + "em";
    item.setAttribute("style", style);

});
const ptSetItems = document.querySelectorAll("[class*='p-t-']");
ptSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[p][\-][t][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-top: " + size + "em" : "padding-top: " + size + "em";
    item.setAttribute("style", style);

});
const mbSetItems = document.querySelectorAll("[class*='m-b-']");
mbSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[m][\-][b][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-bottom: " + size + "em" : "margin-bottom: " + size + "em";
    item.setAttribute("style", style);

});
const pbSetItems = document.querySelectorAll("[class*='p-b-']");
pbSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[p][\-][b][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-bottom: " + size + "em" : "padding-bottom: " + size + "em";
    item.setAttribute("style", style);

});
const mlSetItems = document.querySelectorAll("[class*='m-l-']");
mlSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[m][\-][l][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-left: " + size + "em" : "margin-left: " + size + "em";
    item.setAttribute("style", style);

});
const plSetItems = document.querySelectorAll("[class*='p-l-']");
plSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[p][\-][l][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-left: " + size + "em" : "padding-left: " + size + "em";
    item.setAttribute("style", style);

});
const mrSetItems = document.querySelectorAll("[class*='m-r-']");
mrSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[m][\-][r][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-right: " + size + "em" : "margin-right: " + size + "em";
    item.setAttribute("style", style);

});
const prSetItems = document.querySelectorAll("[class*='p-r-']");
prSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[p][\-][r][\-][0-9]/; // Look for a sequence starting with an 'm' followed by a hyphen (-) followed by one number.
    let index = elementClass.search(classRegexp);
    if (index < 0)
        return;
    const size = elementClass[index + 4];
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-right: " + size + "em" : "padding-right: " + size + "em";
    item.setAttribute("style", style);

});