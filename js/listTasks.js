new Vue({
    el: '#vue-list',
    name: 'listTasks',
    data() {
        return {
            list: [],
            author:''
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
            this.author =  crc16(window.user.email);
            firebase.database().ref('olimpiada').child(this.author).on('value', snap => {
                let votes = snap.val();
                votes && Object.keys(votes).forEach(el => {
                    this.list.push({linked: el, value: votes[el]})
                });
            });
        },
        edit(element) {
            localStorage.setItem('currentTask', JSON.stringify(element));
        },
        createNewTask(){
            let newTask ={"linked":"alm29951630","value":{"author":"Иванов.П","tasks":[{"answers":[{name:''},{name:''}],"hash":"","question":""}],"topic":""}};
            localStorage.setItem('currentTask', JSON.stringify(newTask));
        },
        openTaskLink(link){
            // let zzz = link.split('/');
            // console.log("%c # ","background: orange", "zzz(2), zzz(3)=", zzz[zzz.length-2], zzz[zzz.length-1])
            //
            // firebase.database().ref('olimpiada').child('almaz_73mailru').child('alm29951630').on('value', snap => {
            //     let votes = snap.val();
            //     console.log("%c # ","background: orange", "v2222otes=", votes)
            // })
        }
    }
});