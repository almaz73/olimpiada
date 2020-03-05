new Vue({
    el: '#vue-edit',
    name: 'редактор',
    data() {
        return {
            compilation: {
                author: 'Иванов.П',
                type: 'simple',
                tasks: [
                    {
                        id: 0,
                        hash: 2231,
                        question: 'Самая большая гора:',
                        answers: [{name: 'Калиманджаро'}, {name: 'Джамалунгма'}, {name: 'Казбек'}],
                    },
                    {
                        id: 1,
                        hash: 2980,
                        question: 'Самая большая планета солнечной системы:',
                        answers: [{name: 'Юпитер'}, {name: 'Нептун'}, {name: 'Земля'}, {name: 'Туманновсть Андромеды'}, {name: 'Для тестирования длинный текст, на несколько строк, может даже на три и больше строк'}],
                    },
                    {
                        id: 2,
                        hash: 2120,
                        question: 'Самая быстрая птица:',
                        answers: [{name: 'Стриж'}, {name: 'Ворона'}, {name: 'Аист'}]
                    },
                    {
                        id: 3,
                        hash: 2902,
                        question: 'Ближайшая к нам звезда:',
                        answers: [{name: 'Сириус'}, {name: 'Звезда Бернарда'}, {name: 'Солнце'}]
                    }
                ]

            },
            methods: {
                sum() {
                }
            }
        }
    },
    created() {
        this.compilation.tasks.map(el => el.tmp = el.hash && el.hash.toString().slice(3));
    },
    methods: {
        getRandomNumber() {
            return parseInt(Math.random() * 9) + 1 + '';
        },
        save() {
            this.compilation.tasks.map(el => {
                el.hash = this.getRandomNumber() + this.getRandomNumber() + this.getRandomNumber() + (el.tmp + 1);
                delete el.tmp;
            });
        },
        addAnswer(id) {
            this.compilation.tasks[id].answers.push({
                id,
                question: '',
                answers: [{name: ''}]
            })
        },
        deleteAnswer(taskId, name) {
            this.compilation.tasks[taskId].answers = this.compilation.tasks[taskId].answers.filter(el => el.name !== name);
        },
        addQuestion() {
            let id = this.compilation.tasks.length;
            this.compilation.tasks.push({
                id,
                question: '',
                answers: [{name: ''}]
            })
        },
        deleteQuestion(id) {
            this.compilation.tasks = this.compilation.tasks.filter(el => el.id !== id);
        },
    }
});