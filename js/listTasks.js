new Vue({
    el: '#vue-list',
    name: 'listTasks',
    data() {
        return {
            list: [],
            author: '',
            numers: []

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
            let siteName = location.origin + "/olimpiada/?v=";
            this.author = crc16(window.user.email);
            firebase.database().ref('olimpiada').child(this.author).on('value', snap => {
                let votes = snap.val();
                votes && Object.keys(votes).forEach(el => {
                    this.numers.push(el);
                    this.list.push({linked: el, value: votes[el], link: siteName + this.author + "/" + el})
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
                "value": {"tasks": [{"answers": [{name: ''}, {name: ''}], "hash": "", "question": ""}], "topic": ""}
            };
            localStorage.setItem('currentTask', JSON.stringify(newTask));
        },
        /**
         * @param link (чейТест/номерТеста/комуПоказать/ктоПроходит)
         */
    }
});