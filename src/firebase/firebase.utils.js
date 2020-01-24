import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCUkjxEBC35ekRQpNrKrRSjC5HwUf763sA',
  authDomain: 'fashion-clothing-db-22544.firebaseapp.com',
  databaseURL: 'https://fashion-clothing-db-22544.firebaseio.com',
  projectId: 'fashion-clothing-db-22544',
  storageBucket: 'fashion-clothing-db-22544.appspot.com',
  messagingSenderId: '77564044607',
  appId: '1:77564044607:web:736a47f9c9a3cfa11d1f8a',
  measurementId: 'G-W28P7BM1EC'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // gives access to this new google auth provider class from the authentication library
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
