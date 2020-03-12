new Vue({
    el: '#vue-list',
    name: 'listTasks',
    data() {
        return {
            list: []
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
            let author = window.user.email.replace('@', '').replace('.', '');
            firebase.database().ref('olimpiada').child(author).on('value', snap => {
                let votes = snap.val();
                Object.keys(votes).forEach(el => {
                    this.list.push({linked: el, value: votes[el]})
                });
            });
        },
        edit(element) {
            localStorage.setItem('currentTask', JSON.stringify(element));
        },
        createNewTask(){
            let newTask ={"linked":"alm29951630","value":{"author":"Иванов.П","tasks":[{"answers":[],"hash":"","question":""}],"topic":""}};
            localStorage.setItem('currentTask', JSON.stringify(newTask));
        }
    }
});