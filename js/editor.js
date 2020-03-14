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
            firebase.database().ref('olimpiada').child(author).child(this.nameTask).set(this.compilation)
                .then(
                    res => {
                        this.isDirty = false;
                    },
                    err => console.log("%c # ", "background: red", "el=", err)
                )
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