new Vue({
    el: '#vue-list',
    name: 'listTasks',
    data() {
        return {
            list: [],
            author: '',
            numers: [],
            canReady: false,
            stage: 0,
            themeName: ''
        }
    },
    created() {
        localStorage.removeItem('currentTask');
        this.getFBReady()
    },
    methods: {
        getFBReady() {
            if (window.user) return this.getDatas();
            setTimeout(() => this.getFBReady(), 200);
        },
        getDatas() {
            setTimeout(() => this.canReady = true, 2000);
            let pathname = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
            let siteName = location.origin + pathname + '/?v=';
            this.author = crc16(window.user.email);
            firebase.database().ref('olimpiada').child(this.author).on('value', snap => {
                let votes = snap.val();
                this.canReady = true;
                votes && Object.keys(votes).forEach(el => {
                    this.numers.push(el);
                    this.list.push({nameTask: el, value: votes[el], link: siteName + this.author + "/" + el})
                });
            });
        },
        edit(element) {
            localStorage.setItem('currentTask', JSON.stringify(element));
        },
        createNewTask() {
            let nameTask = 1;
            while (this.numers.includes("" + nameTask)) {
                nameTask++;
            }


            let newTask = {
                "nameTask": nameTask,
                "value": {
                    "tasks": [{"answers": [{name: ''}, {name: ''}], "hash": "", "question": ""}],
                    "topic": this.themeName
                }
            };
            localStorage.setItem('currentTask', JSON.stringify(newTask));
        },
        removeTask(element) {
            let doit = confirm('Вы действительно хотите удалить опрос? Восстановление будет невозможно.');
            if (doit) {
                let userRef = firebase.database().ref('olimpiada').child(this.author).child(element.nameTask);
                if (userRef) {
                    this.list = [];
                    userRef.remove();
                }
            }
        },
        copyLink(text) {
            // сохраним ссылку в буфер обмена
            this.list.map(el => el.copied = false);
            this.list.map(el => el.copied = el.link == text);
            this.$forceUpdate();
            var input = document.createElement('input');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.select();
            var result = document.execCommand('copy');
            document.body.removeChild(input);
            return result;
        }
        /**
         * @param link (чейТест/номерТеста/комуПоказать/ктоПроходит)
         */
    }
});