new Vue({
    el: '#vue-edit',
    name: 'редактор',
    data() {
        return {
            compilation: null,
            isDirty: false,
            nameTask: null
        }
    },
    mounted() {
        let storage = localStorage.getItem('currentTask');
        if (storage) {
            let compilation = JSON.parse(storage);
            this.compilation = compilation.value;
            this.nameTask = compilation.nameTask;
        }
    },
    methods: {
        getRandomNumber() {
            return parseInt(Math.random() * 9) + 1 + '';
        },
        save() {
            let author = crc16(window.user.email);
            if (this.checkingBeforeSave()) return;
            this.compilation.author = window.user.email;
            firebase.database().ref('olimpiada').child(author).child(this.nameTask).set(this.compilation)
                .then(
                    res => {
                        this.isDirty = false;
                    },
                    err => console.log("%c # ", "background: red", "el=", err)
                )
        },
        /**
         * требования:
         * - у всех вопросов должны быть хеши
         * - вариантов ответа должно быть не меньше двух
         */
        checkingBeforeSave() {
            let error = '';
            Object.keys(this.compilation).forEach(el => {
                this.compilation.tasks.forEach(item => {
                    if (!item.hash) error = 'Не указан парвильный ответ для вопроса: ' + item.question;
                    if (item.answers.length < 2) error = 'Вариантов ответа должно быть больше единицы';
                    item.answers.forEach(it => {
                        if (!it.name) error = "Пустой ответ для вопроса: " + item.question;
                    });

                    if (!item.question) error = "Не задан вопрос";
                });
                if (!this.compilation.topic) error = 'Нет названия опроса';
            });
            return error;
        },
        changeRadio(element, ind) {
            this.isDirty = true;
            element.tmp = ind;
            element.hash = this.getRandomNumber() + this.getRandomNumber() + this.getRandomNumber() + (element.tmp + 1);
            this.$forceUpdate();
        },
        addAnswer(place) {
            this.isDirty = true;
            this.compilation.tasks[place].answers.push({
                question: '',
                answers: [{name: ''}]
            })
        },
        deleteAnswer(place, name) {
            this.isDirty = true;
            this.compilation.tasks[place].answers = this.compilation.tasks[place].answers.filter(el => el.name !== name);
        },
        addQuestion() {
            this.isDirty = true;
            this.compilation.tasks.push({question: '', answers: [{name: ''}]})
        },
        deleteQuestion(element) {
            this.isDirty = true;
            this.compilation.tasks = this.compilation.tasks.filter(el => el.question !== element.question);
        },
    }
});