import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAEFInn683EKs1KYFhpCb4njmviKnf7Pd8",
    authDomain: "nicola-murphy-design.firebaseapp.com",
    databaseURL: "https://nicola-murphy-design.firebaseio.com",
    projectId: "nicola-murphy-design",
    storageBucket: "nicola-murphy-design.appspot.com",
    messagingSenderId: "596769845694",
    appId: "1:596769845694:web:f24fa65011d76a103e89ef",
    measurementId: "G-P35J3B1G2F"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;