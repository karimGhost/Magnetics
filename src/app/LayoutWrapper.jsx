// app/LayoutWrapper.jsx
"use client";

import { useState, useEffect, cloneElement } from "react";
import React from "react";
import useUserAuth from "@/hooks/useUserAuth";
import LoginPopup from "@/components/LoginPopup";
import { Navbtn } from "@/components/Navbtn";
import ScrollToTop from "@/components/ScrollToTop";
export default function LayoutWrapper({ children }) {
  const {user} = useUserAuth();

   const username  =  user?.user?.email?.replace("@gmail.com", "") ?? null;
const [clientName, setClientNames] = useState(null);

  const [use, setUse] = useState(null);
const [dataPending, setDataPending] = useState(null)
const [loadedRepairs, setloadedRepairs] = useState(null)
  const [active , setActive] = useState(false)
    const [login, setLogin] = useState(false)

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? cloneElement(child, {active, setClientNames, username, login, setLogin, setDataPending, setloadedRepairs, loadedRepairs}) : child
  );



 
 useEffect(() => {
if(user){
  setActive(true)
}else if(clientName && clientName !== null){
    setActive(true)

}else{
  setActive(false)
}



 }, [])

  // UseEffect to control the popup visibility based on user state
useEffect(() => {
  const storedClient = localStorage.getItem("clientUser");
  if (storedClient) {
    try {
      const parsed = JSON.parse(storedClient);
      setClientNames(parsed); // This should be an object now
    } catch (err) {
      console.error("Invalid JSON in clientUser:", err);
    }
  }else{
    setClientNames(null)
  }
}, []);



  

//  if(!active){
//   return <LoginPopup user={clientName?.username} />;

//  }


  return (
    <>

      {/* Show LoginPopup if user is null */}


 <div className="topbottom" style={{position:"fixed", top:"0", zIndex:"199", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
      <main className="pt-[140px]">
{ 
   <Navbtn  login={login} setLogin ={ setLogin} />
}
   
   <ScrollToTop />

    </main>
    
    </div>   
       {childrenWithProps}
    </>
  );
}


