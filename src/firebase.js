import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStripePayments } from '@stripe/firestore-stripe-payments';
const key = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: 'netflix-clone-507b4.firebaseapp.com',
  projectId: 'netflix-clone-507b4',
  storageBucket: 'netflix-clone-507b4.appspot.com',
  messagingSenderId: '678539840425',
  appId: '1:678539840425:web:d10bfefa605a1c512292b8',
};

let app;

if (app == null) {
  app = initializeApp(firebaseConfig);
} else {
  app = app();
}

const db = getFirestore();
const auth = getAuth();
const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

export { db, auth, payments };
