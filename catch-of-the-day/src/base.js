import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCJMTIwEqGTcUKskmCa1juSJUPGxsJfSyM",
        authDomain: "wesbos-react-course.firebaseapp.com",
        databaseURL: "https://wesbos-react-course.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export

export {firebaseApp};

// This is a default export

export default base;