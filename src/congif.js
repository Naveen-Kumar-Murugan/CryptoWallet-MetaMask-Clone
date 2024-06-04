import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBB6VQ3GvMFcnWuajeVfD3Uy7WTyqAWI7M",
    authDomain: "metamask-clone-90ff1.firebaseapp.com",
    projectId: "metamask-clone-90ff1",
    storageBucket: "metamask-clone-90ff1.appspot.com",
    messagingSenderId: "1067140143272",
    appId: "1:1067140143272:web:1a8b9e284eea992b184a9d",
    measurementId: "G-LM11CEPFRM"
};


const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export{firebase};