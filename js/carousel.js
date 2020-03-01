let compilation = {
    author: 'Иванов.П', type: 'simple', tasks: [
        {question: 'Самая большая гора:', answers: ['Калиманджаро', 'Джамалунгма', 'Казбек']},
        {question: 'Самая большая планета солнечной системы:', answers: ['Юпитер', 'Нентун', 'Земля']},
        {question: 'Самая быстрая птица:', answers: ['Стриж', 'Ворона', 'Аист']},
        {question: 'Ближайшая к нам звезда:', answers: ['Сириус', 'Звезда Бернарда', 'Солнце']}
    ]
};

let div1 = document.querySelector('#firstDiv');
let div2 = document.querySelector('#secondDiv');

function startTest() {
    bulidView(compilation.tasks[0], true)
}

startTest();
setTimeout(() => next(compilation.tasks[0], compilation.tasks[1]), 2000);

/**
 * Карусель
 */
function next(prevTask, nextTask) {
    bulidView(nextTask);
    div1.style.left = -document.body.offsetWidth + 'px';
    div2.style.left = 0;
    setTimeout(() => {
        div1.style.display = 'none';
        div1.style.left = 0;
        bulidView(prevTask, true);
    }, 400);
    setTimeout(() => {
        div1.style.display = 'block';
        div2.style.display = 'none';
        div2.style.left = document.body.offsetWidth + 'px';
        bulidView(nextTask, true)
    }, 800);
    setTimeout(() => div2.style.display = 'block', 1200);
}

function bulidView(task, first) {
    let div = first ? div1 : div2;
    div.innerHTML = `<h2>${task.question}</h2>`;
    task.answers.forEach(el=>{
        div.innerHTML += `<button class="simple-button">${el}</button><br>`;
    })

}

function update(task) {
    // olimpiada = olimpiada ? JSON.parse(localStorage.getItem('olimpiada')) : {task: 1, summa: 0};

    // if (!document.querySelector('#myframe').src) document.querySelector('#myframe').src = "questions/" + olimpiada.task + ".html";

    // document.querySelector('.numberTask').innerHTML = olimpiada.task;
    // document.querySelector('.resolve').innerHTML = olimpiada.summa;
    // if (olimpiada.task < lastTask) document.querySelector('#myframe2').src = "questions/" + (olimpiada.task + 1) + ".html";
    // else document.querySelector('#myframe2').src = "questions/end.html";
    //
    // if (olimpiada.task > lastTask) document.querySelector('#myframe').src = "questions/end.html";
}