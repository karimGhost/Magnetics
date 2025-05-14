// app/LayoutWrapper.jsx
"use client";

import { useState, useEffect, cloneElement } from "react";
import React from "react";
import useUserAuth from "@/hooks/useUserAuth";
import LoginPopup from "@/components/LoginPopup";

export default function LayoutWrapper({ children }) {
  const user = useUserAuth();
  const [use, setUse] = useState(null);
const [dataPending, setDataPending] = useState(null)

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? cloneElement(child, { user,  setDataPending }) : child
  );

  return (
    <>
      {!user && <LoginPopup user={user} />}  {/* Show LoginPopup if user is null */}
      {childrenWithProps}
    </>
  );
}
