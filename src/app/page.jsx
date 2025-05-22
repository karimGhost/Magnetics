"use client";

import { ReceiptForm } from "@/components/receipt-form";
import { Icons } from "@/components/icons"; 
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useUserAuth from "@/hooks/useUserAuth";
import { Navbtn } from "@/components/Navbtn";
// import BlogList from "@/components/Blogs/BlogList";
import TechnicianList from "@/components/Tech/TechnicianList";
export default function HomePage() {

  const [openSetup, setOpenSetup] = useState(false);
  const router = useRouter();
  const user = useUserAuth();

 const username  =  user?.user?.email?.replace("@gmail.com", "") ?? null;

  useEffect(() => {
console.log("username", user)
  },[user])

  const [cartopen, setcartopen] = useState(false);


const [dataPending, setDataPending] = useState(0)

 

if(user?.user?.client){
  return(
    <>
  
     <div style={{marginTop:"80px"}}>

  
      <TechnicianList   />
   
     </div>

</>
  )
}
  return (
    <div  className="container mx-auto px-4 py-8">
   


<main className="pt-[110px]">  


        <ReceiptForm />

        
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()}  Magnetics Repair Shop. All rights reserved.</p>
        <p>Powered by magnetics. made with love by karim 🤍  </p>
      </footer>
    </div>
  );
}
