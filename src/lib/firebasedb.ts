"use client";

import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // ✅ Add this
import { getFirestore } from "firebase/firestore";
import { Anonymous_Pro } from "next/font/google";
import { useEffect } from "react";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoPc0vgxqMzLh8YhKTlDTQuaxqTjHNzEY",
  authDomain: "magnetics-shop-f9680.firebaseapp.com",
  databaseURL: "https://magnetics-shop-f9680-default-rtdb.firebaseio.com",
  projectId: "magnetics-shop-f9680",
  storageBucket: "magnetics-shop-f9680.firebasestorage.app",
  messagingSenderId: "856005401570",
  appId: "1:856005401570:web:d408e25fb54ff8fa09f7bb",
  measurementId: "G-5DGQ6ZB35M"
};
const firebaseConfig2 = {
  apiKey: "AIzaSyAoA_sDIq7vFJgvp65uS-F_xyTO9jjRW6M",
  authDomain: "magneticblog-7ccda.firebaseapp.com",
  projectId: "magneticblog-7ccda",
  storageBucket: "magneticblog-7ccda.firebasestorage.app",
  messagingSenderId: "461157877053",
  appId: "1:461157877053:web:a962677e7dff5c5b50f154",
  measurementId: "G-ZM3BQF0P5Q"
};



const firebaseConfigMess = {
  apiKey: "AIzaSyDKdTspx1XcVos9BWqHhTclCKP3AQ9F-uw",
  authDomain: "lijlllll.firebaseapp.com",
  databaseURL: "https://lijlllll-default-rtdb.firebaseio.com",
  projectId: "lijlllll",
  storageBucket: "lijlllll.firebasestorage.app",
  messagingSenderId: "1014520233340",
  appId: "1:1014520233340:web:05b46d83eb0368a27fb8f9",
  measurementId: "G-BVL35WYZ8V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize both services
const db = getDatabase(app);
const auth = getAuth(app); // <-- Auth added here
 const dbb = getFirestore(app); // ✅ this must be exported


const app2 = initializeApp(firebaseConfig2, "app2"); // ✅ name it to avoid conflict


const app3 =   initializeApp(firebaseConfigMess, "app3"); // ✅ name it to avoid conflict


export const db2 = getFirestore(app2);
export const  dbmessage = getDatabase(app3)



export const storage = getStorage(app2);

// ✅ Export both
export { dbb,db, auth };


