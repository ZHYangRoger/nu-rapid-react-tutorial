import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';
import { useCallback} from 'react';

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