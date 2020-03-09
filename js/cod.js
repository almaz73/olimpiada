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
    localStorage.removeItem('olimpiada');
    location.reload();
}

window.addEventListener('storage', function (e) {
    if (e.key === "currentTask" && !!localStorage.getItem('currentTask')) {
        trigger();
        goPage('editor.html');
    }
});