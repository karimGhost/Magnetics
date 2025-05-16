"use client";

import { ReceiptForm } from "@/components/receipt-form";
import { Icons } from "@/components/icons"; 
import { useState } from "react";
import { useRouter } from 'next/navigation';
import useUserAuth from "@/hooks/useUserAuth";

export default function HomePage() {

  const [openSetup, setOpenSetup] = useState(false);
  const router = useRouter();
  const user = useUserAuth();


  const [cartopen, setcartopen] = useState(false);


const [dataPending, setDataPending] = useState(0)

 
  return (
    <div  className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">

<div style={{position:"absolute", top:"0", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
  

<span style={{display:"flex", flexDirection:"row"}}>

 <span  onClick={() => router.push('/')}>
  { cartopen &&
  <Icons.HomeIcon
     
      style={{ cursor: 'pointer' }}
      className="ml-3 h-5 w-5"
    />}        </span>

  <span>
<Icons.BellIcon style={{cursor:"pointer"}}  className="ml-3 h-5 w-5" />
        </span>


<span     onClick={() => router.push('/cart')}>

        <Icons.ShoppingCart style={{cursor:"pointer"}} className="ml-2 h-5 w-5" />

</span>



</span>

<span onClick={ () => setOpenSetup(pre => !pre)} style={{marginLeft:"20px"}}> 

          <Icons.UserCog style={{cursor:"pointer", marginTop:"-7px", color:"hsl(206.89deg 99.07% 58.04%)"}}  className="ml-2 mb-3 h-7 w-7" />

{ openSetup &&
<span style={{zIndex:"99", position:"absolute", top:"50px", right:"20px"}}>
  <ul style={{background:"white", height:"100px", width:"100px", marginTop:"5px", paddingTop:"20px" }}>
    <li  style={{display:"flex", flexDirection:"row", marginBottom:"10px", cursor:"pointer"}}>
                <Icons.UserCog style={{cursor:"pointer", }}  className="ml-2  h-5 w-5" />

      <p style={{marginLeft:"5px"}}>
        profile
        </p> 
       
       </li>

    <li style={{display:"flex", flexDirection:"row",  cursor:"pointer"}}>

                <Icons.LogOut style={{cursor:"pointer", }}  className="ml-2  h-5 w-5" />

     <p style={{marginLeft:"5px"}}>
      Logout
      </p> 
      
      </li>
  </ul>
</span>

}

</span>




</div>




        <h1  className="magneticH1 text-4xl font-bold text-primary flex items-center justify-center">
          <Icons.Wrench className="magneticicon mr-3 h-10 w-10" />
          Magnetics Repair Shop
        </h1>

      
        <p className="text-muted-foreground">
          Manage repair receipts and client communication.
        </p>

        <h2 className="text-muted-foreground " style={{fontWeight:"bold", color:"hsl(206.89deg 99.07% 58.04%)", float:"right"}} >
          Hi, {user}
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
