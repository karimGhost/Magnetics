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



  
  
  return (
    <>
      {!user && <LoginPopup user={username} />}  {/* Show LoginPopup if user is null */}

 <div style={{position:"absolute", top:"0", zIndex:"199", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
      
    <Navbtn />

    
    
    </div>      {childrenWithProps}
    </>
  );
}
