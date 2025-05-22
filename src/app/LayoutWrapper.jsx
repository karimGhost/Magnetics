// app/LayoutWrapper.jsx
"use client";

import { useState, useEffect, cloneElement } from "react";
import React from "react";
import useUserAuth from "@/hooks/useUserAuth";
import LoginPopup from "@/components/LoginPopup";
import { Navbtn } from "@/components/Navbtn";
export default function LayoutWrapper({ children }) {
  const user = useUserAuth();

   const username  =  user?.user?.email?.replace("@gmail.com", "") ?? null;

  const [use, setUse] = useState(null);
const [dataPending, setDataPending] = useState(null)
const [loadedRepairs, setloadedRepairs] = useState(null)
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? cloneElement(child, { username,  setDataPending, setloadedRepairs, loadedRepairs}) : child
  );


const [clientName, setClientName] = useState(null);

  // UseEffect to control the popup visibility based on user state
useEffect(() => {
  const storedClient = localStorage.getItem("clientUser");
  if (storedClient) {
    try {
      const parsed = JSON.parse(storedClient);
      setClientName(parsed); // This should be an object now
    } catch (err) {
      console.error("Invalid JSON in clientUser:", err);
    }
  }
}, []);


  return (
    <>
      {/* Show LoginPopup if user is null */}
{ (!user?.user && !clientName?.username) && (
    <LoginPopup user={username} />
) }

 <div className="topbottom" style={{position:"fixed", top:"0", zIndex:"199", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
      <main className="pt-[140px]">

    <Navbtn />

    </main>
    
    </div>   
       {childrenWithProps}
    </>
  );
}


