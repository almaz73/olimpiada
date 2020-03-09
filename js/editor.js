new Vue({
    el: '#vue-edit',
    name: 'редактор',
    data() {
        return {
            compilation: null
        }
    },
    mounted(){
      let storage = localStorage.getItem('currentTask');
       if(storage) {
           let task = JSON.parse(storage);
           this.compilation = task.value;
       }
    },
    methods: {
        getRandomNumber() {
            return parseInt(Math.random() * 9) + 1 + '';
        },
        save() {
            let nameTask = window.user.email.slice(0,3) + new Date().getTime().toString().slice(5);
            let author = window.user.email.replace('@', '').replace('.', '');
            firebase.database().ref('olimpiada').child(author).child(nameTask).set( this.compilation )
                .then(
                    res => {
                        console.log("%c # ", "background: green")
                    },
                    err => console.log("%c # ", "background: red", "el=", err)
                )
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