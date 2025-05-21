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
      <header className="mb-8 text-center" style={{position:"fixed" ,left:"0", right:"0", top:"0", zIndex:"99" , background:"white"}}>

<div style={{position:"absolute", top:"0", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
  

</div>




        <h1  className="magneticH1 text-4xl font-bold text-primary flex items-center justify-center">
          <Icons.Wrench className="magneticicon mr-3 h-10 w-10" />
          Magnetics Repair Shop
        </h1>
 <p className="text-muted-foreground">
    client communication
         .
        </p>      
      {/* <input /> */}

      </header>
     <div style={{marginTop:"80px"}}>


      <TechnicianList   />

     </div>

</>
  )
}
  return (
    <div  className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center" style={{position:"fixed" ,left:"0", right:"0", top:"0", zIndex:"99" , background:"white"}}>

<div style={{position:"absolute", top:"0", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
  

</div>




        <h1  className="magneticH1 text-4xl font-bold text-primary flex items-center justify-center">
          <Icons.Wrench className="magneticicon mr-3 h-10 w-10" />
          Magnetics Repair Shop
        </h1>

      
        <p className="text-muted-foreground">
          Manage repair receipts and client communication.
        </p>

        <h2 className="text-muted-foreground " style={{fontWeight:"bold", color:"hsl(206.89deg 99.07% 58.04%)", float:"right"}} >
          Hi, {username}
        </h2>
      </header>
      <main>



        <ReceiptForm />

        
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()}  Magnetics Repair Shop. All rights reserved.</p>
        <p>Powered by magnetics. made with love by karim 🤍  </p>
      </footer>
    </div>
  );
}
