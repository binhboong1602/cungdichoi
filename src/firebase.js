import firebase from 'firebase'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDajm4Gzdw6bnuK4_NJqNA3uIRLkHiLQWk",
    authDomain: "auth-development-b38d7.firebaseapp.com",
    projectId: "auth-development-b38d7",
    storageBucket: "auth-development-b38d7.appspot.com",
    messagingSenderId: "15700494190",
    appId: "1:15700494190:web:9a7c0151f779efa438637f"
})

export const auth = app.auth();
export default app;