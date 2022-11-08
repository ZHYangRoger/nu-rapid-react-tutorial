import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, connectDatabaseEmulator} from 'firebase/database';
import { useCallback} from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUZ4mpRrYmDeS1QyGFkQD3_eS3raxLF8g",
  authDomain: "nu-rapid-react-tutorial.firebaseapp.com",
  databaseURL: "https://nu-rapid-react-tutorial-default-rtdb.firebaseio.com",
  projectId: "nu-rapid-react-tutorial",
  storageBucket: "nu-rapid-react-tutorial.appspot.com",
  messagingSenderId: "854697749894",
  appId: "1:854697749894:web:1cf94c80147f4a354c1007",
  measurementId: "G-FMWWJTTT95"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
//const auth = getAuth(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

if (process.env.REACT_APP_EMULATE) {
  const firebaseTest = initializeApp(firebaseConfig);
  const databaseTest = getDatabase(firebaseTest);
  const authTest = getAuth(firebaseTest);
  //console.log("here");

  connectAuthEmulator(authTest, "http://127.0.0.1:9099");
  connectDatabaseEmulator(databaseTest, "127.0.0.1", 9000);

  signInWithCredential(authTest, GoogleAuthProvider.credential(
    '{"sub": "8eYfls4kC9bqBsW8csNeCgD8VQgq", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};