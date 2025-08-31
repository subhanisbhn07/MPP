'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'compare-phones',
  appId: '1:606285287595:web:7f6b8afd33d2012e0867ee',
  storageBucket: 'compare-phones.firebasestorage.app',
  apiKey: 'AIzaSyA6FuJFmgmle35tu6QlCQUTitLvnrw837s',
  authDomain: 'compare-phones-8ae19.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '606285287595',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
