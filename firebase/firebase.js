import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQR6Rwrmy4IEclwvyDvRAAipPR3GZksYI",
  authDomain: "exe3-28814.firebaseapp.com",
  databaseURL: "https://exe3-28814-default-rtdb.firebaseio.com",
  projectId: "exe3-28814",
  storageBucket: "exe3-28814.appspot.com",
  messagingSenderId: "556016310883",
  appId: "1:556016310883:web:98cd04aae6f59e831b3656",
  measurementId: "G-Y8VG6Y1TZ2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
