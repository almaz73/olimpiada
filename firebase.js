var app_firebase = {};
(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyBG-JTEatQGl7crnowv5fD7MuHSTpVwhpw",
        authDomain: "myexperiment-169dd.firebaseapp.com",
        databaseURL: "https://myexperiment-169dd.firebaseio.com",
        projectId: "myexperiment-169dd",
        storageBucket: "myexperiment-169dd.appspot.com",
        messagingSenderId: "382700959515",
        appId: "1:382700959515:web:b61b2a07505b9e712ac5be"
    };
    
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
})()