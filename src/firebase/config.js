import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    projectId: 'med-scam',
    appId: '1:310983495648:web:6fe763f40ee61e3da2a585',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}
