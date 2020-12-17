import firebase from 'firebase';
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
    apiKey: "AIzaSyA9BIF8vpxV8LryiacgpXT4LLGD552OnTw",
    authDomain: "auth-form-657bf.firebaseapp.com",
    projectId: "auth-form-657bf",
    storageBucket: "auth-form-657bf.appspot.com",
    messagingSenderId: "195777756165",
    appId: "1:195777756165:web:3b1d3a764d2cd48474b06c"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);