// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/database';
// import "firebase/compat/storage"

// const firebaseConfig = {
//   apiKey: "AIzaSyALt7MmiQ2rYG1pOmX8_avc-6w8GAvzyyA",
//   authDomain: "kitchendiariesbyzubda-9eab6.firebaseapp.com",
//   databaseURL: "https://kitchendiariesbyzubda-9eab6-default-rtdb.firebaseio.com",
//   projectId: "kitchendiariesbyzubda-9eab6",
//   storageBucket: "kitchendiariesbyzubda-9eab6.appspot.com",
//   messagingSenderId: "84275233808",
//   appId: "1:84275233808:web:25af0a31a86d6cd0503695",
//   measurementId: "G-T4YTX3HZ28"

// };

// firebase.initializeApp(firebaseConfig);

// const database = firebase.database();
// export const storage = firebase.storage();

// export default database;

// import { initializeApp } from "firebase/app"; 
// import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//     apiKey: "AIzaSyBdzY6P4Gvd2XESAdOz13oJ2ECEQumf7JU",
//     authDomain: "alaje-connect.firebaseapp.com",
//     databaseURL: "https://alaje-connect-default-rtdb.firebaseio.com",
//     projectId: "alaje-connect",
//     storageBucket: "alaje-connect.appspot.com",
//     messagingSenderId: "1046807771092",
//     appId: "1:1046807771092:web:2a2102970b8f67c556c841",
//     measurementId: "G-3J9SRJPDPF"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);
// export const db = getFirestore()


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBRcZs3nv3uHLH1LdN5Vp3dO2JUpA2LL3o",
    authDomain: "omd-app-76987.firebaseapp.com",
    databaseURL: "https://omd-app-76987-default-rtdb.firebaseio.com",
    projectId: "omd-app-76987",
    storageBucket: "omd-app-76987.appspot.com",
    messagingSenderId: "603565223533",
    appId: "1:603565223533:web:a0e1224d476bd339b21964",
    measurementId: "G-NJRYJWECRX"
};

 initializeApp(firebaseConfig);
export const db = getFirestore()
// const analytics = getAnalytics(app);