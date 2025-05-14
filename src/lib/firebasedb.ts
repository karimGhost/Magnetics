"use client";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // ✅ Add this

import { Anonymous_Pro } from "next/font/google";
import { useEffect } from "react";
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





// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize both services
const db = getDatabase(app);
const auth = getAuth(app); // <-- Auth added here


// ✅ Export both
export { db, auth };
