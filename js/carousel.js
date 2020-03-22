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
let alert = document.querySelector('.alert');
let nameClientArea = document.querySelector('#nameClient');
let selected;
let curentTask;
let result = {count: 0, correct: 0};
let counter = 1;
let nameClient = localStorage.getItem('nameClient');
buttonTask.style.display = 'none';

function getDatas() {
    let paths = location.search.slice(3).split('/');
    if (location.href.includes('%3E')) {
        div1.style.left = 0;
        getAndShowTableResults();
        return;
    }

    if (paths[1]) {
        info.innerHTML = '<h2 style="color: orange">Идет загрузка ...</h2>';
        firebase.database().ref('olimpiada').child(paths[0]).child(paths[1]).on('value', snap => {
            let votes = snap.val();
            compilation = votes;
            if (votes) {
                bulidView(compilation.tasks[0], true);
                div1.style.left = 0;
                buttonTask.style.display = 'block';
                if (window.user) nameClient = window.user.displayName;
                if (!nameClient) nameSelection();
            } else {
                console.log("Входная ссылка неверна");
                info.innerHTML = '<h2 style="color: hotpink">Ошибка!</h2><h2 style="color: orange">Ссылка неверна.</h2>'
            }
            getCounter(paths);
        })
    }
}

function getCounter(paths) {
    firebase.database().ref('poll').child(paths[0]).child(paths[1]).child(nameClient)
        .on('value', answer => {
            counter = answer.val().counter || 0;
            counter++;
        });
}

function nameSelection() {
    if (nameClient) nameClientArea.value = nameClient;
    alert.style.display = 'block';
    setTimeout(() => alert.style.opacity = 1, 500);
    trigger(true);
}

function saveSelectedName() {
    nameClient = nameClientArea.value;
    if (nameClient.length > 2) {
        localStorage.setItem('nameClient', nameClient);
        alert.style.display = 'none';
    }
}

function startTest() {
    lineLeft.style.width = '0%';
    lineRight.style.width = '0%';

    result = {count: 0, correct: 0};
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
    if (!task) return testFinished(div, first);

    div.innerHTML = `<h2>${task.question}</h2>`;
    task.answers.forEach((el, id) => {
        div.innerHTML += `<button class="simple-btn" onclick="chosen('${el.name}','${id}')" name="${el.name}">${el.name}</button><br>`
    });
    div.innerHTML += `<button class="check-btn" onclick="check()" disabled>Проверить</button>`;
    if (first) curentTask = task;
}

function testFinished(div, first) {
    if (!first) return div2.innerHTML = '';
    div.innerHTML = `<h2>Тест пройден</h2>`;
    div.innerHTML += `<br></bt><div class="thruth-answer" style="color: white"><br>Результат:  ${result.correct} из ${result.count}</div>`;
    div.innerHTML += `<button class="check-btn finish" onclick="startTest()">Повторить</button>`;
    div.innerHTML += `<div id="tableResults"><a href="javascript:getAndShowTableResults()">К таблице результатов</a></div><br>
                      <span style="color: white">Ваш результат записан под именем ${nameClient}</span>
                      <a href="javascript: nameSelection()">${window.user ? '' : '✎'}</a>`;
    saveResults(result.correct + ' из ' + result.count);
}

function saveResults(result) {
    let paths = location.search.slice(3).split('/');
    let json = {result, counter};
    if (window.user) json.email = window.user.email;

    firebase.database().ref('poll').child(paths[0]).child(paths[1]).child(nameClient).set(json).then(
        res => {
            console.log("success")
        },
        err => console.log("err=", err)
    )
}

function getAndShowTableResults() {
    div1.innerHTML = ' <h2>Загрузка результатов...</h2>';
    let paths = location.search.slice(3).split('/');
    firebase.database().ref('poll').child(paths[0]).child(paths[1]).limitToLast(100)
        .on('value', answer => {
            let list = '<br><div class="thruth-answer" style="color: white"><br>Результаты:</div>';
            list += '<table style="background: #124c12; color: white; width: 100%;">';
            let arr = answer.val();
            Object.keys(arr).forEach(el => {
                list += '<tr><td>' + el;
                if (window.user && crc16(window.user.email) == paths[0]) list += `<td> ${arr[el].email || ''}</td>`;
                list += ' </td><td> ' + arr[el].result + ' </td>';
                if (window.user) list += '<td title="Число повторений">' + arr[el].counter + '</td>';
                list += '</tr>';
            });
            list += '</table>';
            list += `<span style="color: white">Ваш результат записан под именем <strong>${nameClient}</strong></span>`;
            if (!window.user) list += `<a href="javascript: nameSelection()">${window.user ? '' : '✎'}</a>`;
            div1.innerHTML = list;
        });
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
        result.correct++;
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