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
                        hash: 2231,
                        question: 'Самая большая гора:',
                        answers: [{name: 'Калиманджаро'}, {name: 'Джамалунгма'}, {name: 'Казбек'}],
                    },
                    {
                        hash: 2981,
                        question: 'Самая большая планета солнечной системы:',
                        answers: [{name: 'Нептун'}, {name: 'Юпитер'}, {name: 'Земля'}, {name: 'Туманновсть Андромеды'}, {name: 'Для тестирования длинный текст, на несколько строк, может даже на три и больше строк'}],
                    },
                    {
                        hash: 2120,
                        question: 'Самая быстрая птица:',
                        answers: [{name: 'Стриж'}, {name: 'Ворона'}, {name: 'Аист'}]
                    },
                    {
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
            console.log("%c # ", "background: orange", "el=", this.compilation)
        },
        changeRadio(element, ind) {
            element.tmp = ind;
            element.hash = this.getRandomNumber() + this.getRandomNumber() + this.getRandomNumber() + (element.tmp + 1);
            this.$forceUpdate();
        },
        addAnswer(place) {
            this.compilation.tasks[place].answers.push({
                question: '',
                answers: [{name: ''}]
            })
        },
        deleteAnswer(place, name) {
            this.compilation.tasks[place].answers = this.compilation.tasks[place].answers.filter(el => el.name !== name);
        },
        addQuestion() {
            this.compilation.tasks.push({question: '', answers: [{name: ''}]})
        },
        deleteQuestion(element) {
            this.compilation.tasks = this.compilation.tasks.filter(el => el.question !== element.question);
        },
    }
});