// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyDUjPW9YH7uyCdg5l87EqWlZIlS5Gy2I1w",
//   authDomain: "toxlight-221fd.firebaseapp.com",
//   databaseURL: "https://toxlight-221fd-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "toxlight-221fd",
//   storageBucket: "toxlight-221fd.firebasestorage.app",
//   messagingSenderId: "123229599194",
//   appId: "1:123229599194:web:3c2b879f1649b32e62fce3",
//   measurementId: "G-RG4D96GL1L"
// };

// const app = initializeApp(firebaseConfig);
// const rtdb = getDatabase(app);

// export { rtdb };
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyDUjPW9YH7uyCdg5l87EqWlZIlS5Gy2I1w",
//   authDomain: "toxlight-221fd.firebaseapp.com",
//   databaseURL: "https://toxlight-221fd-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "toxlight-221fd",
//   storageBucket: "toxlight-221fd.firebasestorage.app",
//   messagingSenderId: "123229599194",
//   appId: "1:123229599194:web:3c2b879f1649b32e62fce3",
//   measurementId: "G-RG4D96GL1L"
// };

// const app = initializeApp(firebaseConfig);
// const rtdb = getDatabase(app);

// const saveRecordToFirebase = (record) => {
//   const recordsRef = ref(rtdb, 'records');
//   const newRecordRef = push(recordsRef);
//   return set(newRecordRef, record);
// };

// const deleteRecordFromFirebase = (recordKey) => {
//   const recordRef = ref(rtdb, `records/${recordKey}`);
//   return remove(recordRef);
// };

// export { rtdb, ref, saveRecordToFirebase, deleteRecordFromFirebase };

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDUjPW9YH7uyCdg5l87EqWlZIlS5Gy2I1w",
  authDomain: "toxlight-221fd.firebaseapp.com",
  databaseURL: "https://toxlight-221fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toxlight-221fd",
  storageBucket: "toxlight-221fd.firebasestorage.app",
  messagingSenderId: "123229599194",
  appId: "1:123229599194:web:3c2b879f1649b32e62fce3",
  measurementId: "G-RG4D96GL1L"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

const saveRecordToFirebase = (record) => {
  const recordsRef = ref(rtdb, 'records');
  const newRecordRef = push(recordsRef);
  return set(newRecordRef, record);
};

const deleteRecordFromFirebase = (recordKey) => {
  const recordRef = ref(rtdb, `records/${recordKey}`);
  return remove(recordRef);
};


export { rtdb, ref, saveRecordToFirebase, deleteRecordFromFirebase };
