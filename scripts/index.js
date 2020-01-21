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
    // size = parseInt(size);

    const style = item.getAttribute("style") ? item.getAttribute("style") + "; max-width: " + size + "px" : "max-width:" + size + "px";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding: " + size + "rem" : "padding:" + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin: " + size + "rem" : "margin: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-top: " + size + "rem" : "margin-top: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-top: " + size + "rem" : "padding-top: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-bottom: " + size + "rem" : "margin-bottom: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-bottom: " + size + "rem" : "padding-bottom: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-left: " + size + "rem" : "margin-left: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-left: " + size + "rem" : "padding-left: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; margin-right: " + size + "rem" : "margin-right: " + size + "rem";
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; padding-right: " + size + "rem" : "padding-right: " + size + "rem";
    item.setAttribute("style", style);

});

const maxHeightSetItems = document.querySelectorAll("[class*='h-max'");
maxHeightSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[h][\-][m][a][x][\-][0-9]+/; //Look for a sequence starting with a 'h' followed by a hyphen (-), followed by max and atleast one number
    let index = elementClass.search(classRegexp);
    console.log(index);
    console.log(elementClass[index]);
    if (index < 0)
        return;
    let size = "";
    index += 6;

    while (elementClass[index] && !(isNaN(elementClass[index]))) {
        size += elementClass[index];
        index++;
    }
    size = size.replace(/\s+/g, '');
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; max-height: " + size + "px" : "max-height:" + size + "px";
    item.setAttribute("style", style);
});


const heightSetItems = document.querySelectorAll("[class*='h-'");
heightSetItems.forEach((item) => {
    const elementClass = item.className;
    const classRegexp = /[h][\-][0-9]+/; //Look for a sequence starting with a 'w' followed by a hyphen (-) and atleast one number
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
    const style = item.getAttribute("style") ? item.getAttribute("style") + "; min-height: " + size + "px" : "min-height:" + size + "px";
    item.setAttribute("style", style);
});
