// app/LayoutWrapper.jsx
"use client";

import { useState, useEffect, cloneElement } from "react";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebasedb";
import LoginPopup from "@/components/LoginPopup";

export default function LayoutWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [use, setUse] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("Logged in user:", currentUser.email);
      } else {
        setUser(null);
        console.log("No user logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? cloneElement(child, { user, setUser }) : child
  );

  return (
    <>
      {!user && <LoginPopup user={user} />}  {/* Show LoginPopup if user is null */}
      {childrenWithProps}
    </>
  );
}
