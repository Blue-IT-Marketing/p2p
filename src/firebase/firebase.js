import firebase from 'firebase/app';
import 'firebase/auth';
    const config = {
        apiKey: "AIzaSyAq7WjAzAJ66ENwUo1B6EzOMRWWR6E3BSM",
        authDomain: "get-ready-investments.firebaseapp.com",
        databaseURL: "https://get-ready-investments.firebaseio.com",
        projectId: "get-ready-investments",
        storageBucket: "get-ready-investments.appspot.com",
        messagingSenderId: "206127445708"
    };


    if (!firebase.apps.length){
    firebase.initializeApp(config); 
    }
const auth = firebase.auth();

export {auth,
    firebase
};