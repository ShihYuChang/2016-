import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getLegislators() {
  const data = [];
  const q = query(collection(db, 'legislators'), orderBy('總收入', 'desc'));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => data.push(doc.data()));
  return data;
}
