import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDFbe_fq0T_9Ve1jEv_TbZ9xb-yXbaWrBU',
  authDomain: 'forum-64b81.firebaseapp.com',
  databaseURL:
    'https://forum-64b81-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'forum-64b81',
  storageBucket: 'forum-64b81.firebasestorage.app',
  messagingSenderId: '1001058422129',
  appId: '1:1001058422129:web:6fb09e104639d205053ad0',
  measurementId: 'G-64WRXCQ5HG',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
