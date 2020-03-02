let compilation = {
    author: 'Иванов.П',
    type: 'simple',
    tasks: [
        {id: 0, hash: 2231, question: 'Самая большая гора:', answers: ['Калиманджаро', 'Джамалунгма', 'Казбек']},
        {
            id: 1,
            hash: 2980,
            question: 'Самая большая планета солнечной системы:',
            answers: ['Юпитер', 'Нептун', 'Земля', 'Туманновсть Андромеды', 'Для тестирования длинный текст, на несколько строк, может даже на три и больше строк']
        },
        {id: 2, hash: 2120, question: 'Самая быстрая птица:', answers: ['Стриж', 'Ворона', 'Аист']},
        {id: 3, hash: 2902, question: 'Ближайшая к нам звезда:', answers: ['Сириус', 'Звезда Бернарда', 'Солнце']}
    ]
};

let div1 = document.querySelector('#firstDiv');
let div2 = document.querySelector('#secondDiv');
let divTruth = document.querySelector('#truth');
let divError = document.querySelector('#error');
let thruthAnswer = document.querySelector('.thruth-answer');
let lineLeft = document.querySelector('.line_left');
let lineRight = document.querySelector('.line_right');
let selected;
let curentTask;
let result = {count: 0, right: 0};

function startTest(repeate) {
    lineLeft.style.width = '0%';
    lineRight.style.width = '0%';

    result = {count: 0, right: 0};
    if (repeate) {
        next(null, compilation.tasks[0])
    } else {
        bulidView(compilation.tasks[0], true)
    }
}

startTest();

/**
 * Карусель
 */
function next(prevTask, nextTask) {
    setLines(prevTask);
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

function setLines(prevTask) {
    let procent = 100 / compilation.tasks.length;
    let widthLeft = procent * (prevTask.id + 1);
    lineLeft.style.width = widthLeft + '%';
    lineRight.style.width = (99 - widthLeft) + '%';
}

function bulidView(task, first) {
    let div = first ? div1 : div2;
    if (!task) return testFinished(div);

    div.innerHTML = `<h2>${task.question}</h2>`;
    task.answers.forEach((el, id) => {
        div.innerHTML += `<button class="simple-btn" onclick="chosen('${el}','${id}')" name="${el}">${el}</button><br>`
    });
    div.innerHTML += `<button class="check-btn" onclick="check()" disabled>Проверить</button>`;
    if (first) curentTask = task;
}

function testFinished(div) {
    div.innerHTML = `<h2>Тест пройден</h2>`;
    div.innerHTML += `<br></bt><div class="thruth-answer" style="color: white"><br>Результат:  ${result.right} из ${result.count}</div>`;
    div.innerHTML += `<button class="check-btn finish" onclick="startTest(true)">Повторить</button>`;
    div.innerHTML += `<button class="check-btn finish2">К другим тестам</button>`
}

function chosen(el, id) {
    document.querySelector('.check-btn').removeAttribute('disabled');
    document.querySelectorAll('button[name]').forEach(el => el.style.background = 'orange');
    document.querySelector('button[name="' + el + '"]').style.background = 'red';
    selected = id;
}

function check() {
    result.count++;
    if (selected == +curentTask.hash.toString().slice(3)) {
        divTruth.style.bottom = 0;
        result.right++;
    } else {
        divError.style.bottom = 0;
        thruthAnswer.innerHTML = curentTask.answers[+curentTask.hash.toString().slice(3)];
    }
}

function continueTest() {
    divTruth.style.bottom = '-170px';
    divError.style.bottom = '-170px';
    let nextnumber = curentTask.id;
    if (nextnumber < compilation.tasks.length) {
        next(compilation.tasks[nextnumber], compilation.tasks[nextnumber + 1])
    } else {
        alert()
    }
}