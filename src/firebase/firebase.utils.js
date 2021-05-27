import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBuC77ptQQnewiNF-UNEXCFqWwvrCdXXF8",
  authDomain: "crwn-db-d73a3.firebaseapp.com",
  projectId: "crwn-db-d73a3",
  storageBucket: "crwn-db-d73a3.appspot.com",
  messagingSenderId: "905446213943",
  appId: "1:905446213943:web:48dd03f9b997cd81c372b2",
  measurementId: "G-C19VCZ7YTG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;