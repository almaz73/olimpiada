let numberTask;
let lastTask = 5;

function page(val) {
    let myIframe = document.querySelector('.iframeDiv');
    myIframe.style.display = val == 'tasks' ? 'block' : 'none';
}

let olimpiada = localStorage.getItem('olimpiada');
if (!olimpiada) localStorage.setItem('olimpiada', JSON.stringify({task: 1, summa: 0}));


function update(olimpiada) {
    olimpiada = olimpiada ? JSON.parse(localStorage.getItem('olimpiada')) : {task: 1, summa: 0};

    if (!document.querySelector('#myframe').src) document.querySelector('#myframe').src = "questions/" + olimpiada.task + ".html";

    document.querySelector('.numberTask').innerHTML = olimpiada.task;
    document.querySelector('.resolve').innerHTML = olimpiada.summa;
    if (olimpiada.task < lastTask) document.querySelector('#myframe2').src = "questions/" + (olimpiada.task + 1) + ".html";
    else document.querySelector('#myframe2').src = "questions/end.html";

    if (olimpiada.task > lastTask) document.querySelector('#myframe').src = "questions/end.html";
}

update(olimpiada);

window.addEventListener('storage', function () {
    let olimpiada = localStorage.getItem('olimpiada');
    next(olimpiada)
});

function next(olimpiada) {
    let myIframe = document.querySelector('.iframeDiv');
    let myIframe2 = document.querySelector('.iframeDiv2');
    myIframe.style.left = -document.body.offsetWidth + 'px';
    myIframe2.style.left = '20px';

    setTimeout(() => {
        myIframe.style.display = 'none';
        document.querySelector('#myframe').src = document.querySelector('#myframe2').src;
        myIframe.style.left = '20px';

    }, 200);
    setTimeout(() => {
        myIframe.style.display = 'block';
        myIframe2.style.display = 'none';
        myIframe2.style.left = 20 + document.body.offsetWidth + 'px';
        update(olimpiada)
    }, 400);
    setTimeout(() => myIframe2.style.display = 'block', 600);
}

function clearLocalStorage(){
    localStorage.removeItem('olimpiada');
}