let compilation = {};

let div1 = document.querySelector('#firstDiv');
let div2 = document.querySelector('#secondDiv');
let divTruth = document.querySelector('#truth');
let divError = document.querySelector('#error');
let thruthAnswer = document.querySelector('.thruth-answer');
let lineLeft = document.querySelector('.line_left');
let lineRight = document.querySelector('.line_right');
let info = document.querySelector('#info');
let buttonTask = document.querySelector('#buttonTask');
let selected;
let curentTask;
let result = {count: 0, right: 0};
buttonTask.style.display = 'none';

function getDatas() {
    let paths = location.search.slice(3).split('/');

    if (paths[1]) {
        info.innerHTML = '<h2 style="color: orange">Идет загрузка ...</h2>';
        firebase.database().ref('olimpiada').child(paths[0]).child(paths[1]).on('value', snap => {
            let votes = snap.val();
            compilation = votes;
            if (votes) {
                bulidView(compilation.tasks[0], true);
                div1.style.left = 0;
                buttonTask.style.display = 'block';
            } else {
                console.log("Входная ссылка неверна");
                info.innerHTML = '<h2 style="color: hotpink">Ошибка!</h2><h2 style="color: orange">Ссылка неверна.</h2>'
            }
        })
    }
}

function startTest() {
    lineLeft.style.width = '0%';
    lineRight.style.width = '0%';

    result = {count: 0, right: 0};
    if (!compilation.tasks) getDatas();
    else {
        div1.style.left = 0;
        bulidView(compilation.tasks[0], true);
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
        div.innerHTML += `<button class="simple-btn" onclick="chosen('${el.name}','${id}')" name="${el.name}">${el.name}</button><br>`
    });
    div.innerHTML += `<button class="check-btn" onclick="check()" disabled>Проверить</button>`;
    if (first) curentTask = task;
}

function testFinished(div) {
    div.innerHTML = `<h2>Тест пройден</h2>`;
    div.innerHTML += `<br></bt><div class="thruth-answer" style="color: white"><br>Результат:  ${result.right} из ${result.count}</div>`;
    div.innerHTML += `<button class="check-btn finish" onclick="startTest()">Повторить</button>`;
    // div.innerHTML += `<button class="check-btn finish2">К другим тестам</button>`
}

function chosen(el, id) {
    document.querySelector('.check-btn').removeAttribute('disabled');
    document.querySelectorAll('button[name]').forEach(el => el.style.background = 'orange');
    document.querySelector('button[name="' + el + '"]').style.background = 'red';
    selected = id;
}

function check() {
    result.count++;
    if (selected == +curentTask.hash.toString().slice(3) - 1) {
        divTruth.style.bottom = 0;
        result.right++;
    } else {
        divError.style.bottom = 0;
        thruthAnswer.innerHTML = curentTask.answers[+curentTask.hash.toString().slice(3) - 1].name;
    }
}

function continueTest() {
    divTruth.style.bottom = '-170px';
    divError.style.bottom = '-170px';
    let nextnumber = compilation.tasks.findIndex(el => el.question === curentTask.question);
    if (nextnumber < compilation.tasks.length) {
        next(compilation.tasks[nextnumber], compilation.tasks[nextnumber + 1])
    } else {
        alert('Что-то пошло не так!')
    }
}