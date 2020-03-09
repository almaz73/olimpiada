new Vue({
    el: '#vue-list',
    name: 'listTasks',
    data() {
        return {
            list: []
        }
    },
    created() {
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
        edit(element){
            localStorage.setItem('currentTask', JSON.stringify(element));
        }
    }
});