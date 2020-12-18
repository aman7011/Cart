import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore';

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyB_CP0h_ingl9U3lWhffo6EZVqOeRlwRW0",
    authDomain: "cart-27c6d.firebaseapp.com",
    projectId: "cart-27c6d",
    storageBucket: "cart-27c6d.appspot.com",
    messagingSenderId: "492252990612",
    appId: "1:492252990612:web:56c4eb643b78865a46b881"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />, document.getElementById('root')
);


