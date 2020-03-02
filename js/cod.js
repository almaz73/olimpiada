function goPage(val) {
    let divHtml = document.querySelector('.page-frame');
    let tasksDivs = document.querySelector('#tasks-divs');
    let lines = document.querySelector('.lines');

    if (val.includes('.html')) {
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
}

function clearLocalStorage() {
    localStorage.removeItem('olimpiada');
    location.reload();
}