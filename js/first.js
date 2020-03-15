// let firebase = parent.window.firebase;
// let dbRef = firebase.database().ref('guest');
//
//
// dbRef.on('value', snap => {
//     document.getElementById('guest_answer').innerHTML = "<h3 style='color:#a3eaa3'>Значение поля в Firebase: " + snap.val().text + "</h3>"
// });
//
// var dbRef2 = firebase.database().ref('txt');
// dbRef2.on('value', snap => {
//     document.getElementById('account_answer').innerHTML = "<h3 style='color:#a3eaa3'>Текст записан: " + snap.val().text + "</h3>"
// });
//
// function submit() {
//     let value = document.querySelector('#text').value;
//
//     dbRef2.set({
//         text: value,
//     }).then(
//         res => {},
//         err => div.innerHTML = "<h3 style='color:red'>Ошибка, текст не записан. Вы не авторизованы</h3>"
//     )
// }
