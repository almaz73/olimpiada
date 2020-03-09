let menuButton = document.querySelector('#menuToggle');
let menu = document.querySelector('#theMenu');
let closeButton = document.querySelector('.menu-close');

function trigger() {
    let isOpen = menu.attributes.class.value.includes('menu-open');

    if (isOpen) menu.classList.remove('menu-open');
    else menu.classList.add('menu-open');
}

menuButton.onmousedown = () => trigger();
closeButton.onmousedown = () => trigger();