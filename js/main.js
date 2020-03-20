let menuButton = document.querySelector('#menuToggle');
let menu = document.querySelector('#theMenu');
let closeButton = document.querySelector('.menu-close');
let hidefon = document.querySelector('#hide-fon');

function trigger(val) {
    let isOpen = menu.attributes.class.value.includes('menu-open');
    if (val !== undefined) isOpen = val;
    hidefon.style.display = isOpen ? 'none' : 'block';

    if (isOpen) menu.classList.remove('menu-open');
    else menu.classList.add('menu-open');


    if (!isOpen && localStorage.getItem('currentTask') == null) {
        document.querySelector('#buttonEdit').style.visibility = 'hidden';
    }
}

menuButton.onmousedown = () => trigger();
closeButton.onmousedown = () => trigger();

function goPage(val) {
    let divHtml = document.querySelector('.page-frame');
    let tasksDivs = document.querySelector('#tasks-divs');
    let lines = document.querySelector('.lines');

    if (val && val.includes('.html')) {
        divHtml.style.visibility = 'visible';
        divHtml.src = val;
        tasksDivs.style.visibility = 'hidden';
        lines.style.visibility = 'hidden';
    } else {
        divHtml.style.visibility = 'hidden';
        startTest();
        tasksDivs.style.visibility = 'visible';
        lines.style.visibility = 'visible';
    }
    trigger();
}

function clearLocalStorage() {
    localStorage.removeItem('currentTask');
    document.querySelector('#buttonEdit').style.visibility = 'hidden';
    location.reload();
}

window.addEventListener('storage', function (e) {
    if (e.key === "currentTask" && !!localStorage.getItem('currentTask')) {
        trigger();
        goPage('editor.html');
    }
});