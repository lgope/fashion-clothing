import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAs9yDV6FeU8p1XLy4SUDUJ5dqzfPnDevI',
  authDomain: 'crwn-fashion-clothing-db.firebaseapp.com',
  databaseURL: 'https://crwn-fashion-clothing-db.firebaseio.com',
  projectId: 'crwn-fashion-clothing-db',
  storageBucket: 'crwn-fashion-clothing-db.appspot.com',
  messagingSenderId: '883278772802',
  appId: '1:883278772802:web:68a1964cb5ad02e1954bdb',
  measurementId: 'G-V6BJ556WCR',
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  // for crud we use documentRef
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    console.log(displayName, email);

    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
