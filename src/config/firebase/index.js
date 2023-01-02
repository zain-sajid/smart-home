import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ6zS7-Ch_vVw7XM1Y2PjpWd-QN6SDQ9U',
  authDomain: 'iot-project-3c4d3.firebaseapp.com',
  databaseURL: 'https://iot-project-3c4d3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'iot-project-3c4d3',
  storageBucket: 'iot-project-3c4d3.appspot.com',
  messagingSenderId: '98110709783',
  appId: '1:98110709783:web:791449a977aaafd1e53c52',
  measurementId: 'G-DRCB7SRM0F',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
