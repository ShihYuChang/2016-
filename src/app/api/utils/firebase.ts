import { Legislator } from '@/context/context';
import { DonationData } from '@/utils/api';
import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
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
  const data: Legislator[] = [];
  const q = query(collection(db, 'legislators'), orderBy('總收入', 'desc'));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => data.push(doc.data() as Legislator));
  return data;
}

export async function getDonations(selectedLegislator: string | null) {
  const data: DonationData[] = [];
  const q = query(
    collection(db, 'donations'),
    where('候選人', '==', selectedLegislator),
    orderBy('序號', 'asc')
  );
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => data.push(doc.data() as DonationData));
  const sortedData = data.map((obj) => {
    return {
      序號: obj.序號,
      '捐贈者／支出對象': obj['捐贈者／支出對象'],
      交易日期: obj.交易日期,
      收入金額: obj.收入金額,
      支出金額: obj.支出金額,
      收支科目: obj.收支科目,
      金錢類: obj.金錢類,
      統一編號: obj.統一編號,
      地址: obj.地址,
      當選註記: obj.當選註記,
      推薦政黨: obj.推薦政黨,
      候選人: obj.候選人,
      P: obj.P,
    };
  });
  return sortedData;
}
