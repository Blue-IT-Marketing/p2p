import firebase from 'firebase/app';
import 'firebase/auth';
    const config = {
    apiKey: "AIzaSyATnH54OeLn-T1c3D_clH2lo2FFz4IHRQA",
    authDomain: "p2ptraders-app.firebaseapp.com",
    databaseURL: "https://p2ptraders-app.firebaseio.com",
    projectId: "p2ptraders-app",
    storageBucket: "p2ptraders-app.appspot.com",
    messagingSenderId: "339827645019"

    };


    if (!firebase.apps.length){
    firebase.initializeApp(config); 
    }
const auth = firebase.auth();

export {auth,
    firebase
};