"use client";
// components/InvoiceCard.tsx
import React, {useEffect, useState} from "react";
import useUserAuth from "@/hooks/useUserAuth";
import { db, auth } from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { useRouter } from 'next/navigation';
import { Icons } from "@/components/icons";
import { signOut } from "firebase/auth";

export const Navbtn = () => {
  const [cartopen, setcartopen] = useState(false);
const [loadedRepairs, setloadedRepairs] = useState(null);
  const user = useUserAuth();
 const username  =  user?.user?.email?.replace("@gmail.com", "") ?? null;
 const [openSetup, setOpenSetup] = useState(false);
  const router = useRouter();




const [dataPending, setDataPending] = useState(0);


const handleLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (!confirmLogout) return;

  try {
    await signOut(auth);
    console.log("User logged out");
    // Optional: Redirect or update UI
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Failed to log out!");
  }
};

  useEffect(() => {
    if (!username) return; // exit early if not ready
  
    const repairsRef = ref(db, `/${username}/pendingRepairs`);
  
    const unsubscribe = onValue(repairsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedRepairs = [];
  
      if (data) {
        console.log("db data", data);
  
        Object.entries(data).forEach(([clientName, entries]) => {
          Object.entries(entries).forEach(([id, repairData]) => {
            loadedRepairs.push({
              id,
              clientName,
              data: repairData,
            });
          });
        });
      }
  
     
  setloadedRepairs(loadedRepairs)
    });
  
  
   
  
  
    return () => unsubscribe();
  }, []); // 👈 depends on technicianName
  


  if(user?.user?.client){


  return (

    <>
<span style={{display:"flex", flexDirection:"row"}}>
 <span  onClick={() => router.push('/')}>
  { 
  <Icons.HomeIcon
     
      style={{ cursor: 'pointer' }}
      className="ml-3 h-5 w-5"
    />}        </span>

 <span  onClick={() => router.push('/Blog')}>
  { 
  <Icons.Rss
     
      style={{ cursor: 'pointer' }}
      className="ml-3 h-5 w-5"
    />}        </span>


</span>


<span>


<Icons.BellIcon style={{cursor:"pointer"}}  className="ml-3 h-5 w-5" />
        </span>








<span  onClick={() => router.push('/Techs') } style={{marginLeft:"20px"}}> 

          <Icons.UserCog style={{cursor:"pointer", marginTop:"-7px", color:"hsl(206.89deg 99.07% 58.04%)"}}  className="ml-2 mb-3 h-7 w-7" />


</span>
</>
)

}
  
  


  return (

    <>
<span style={{display:"flex", flexDirection:"row"}}>

 <span  onClick={() => router.push('/')}>
  { 
  <Icons.HomeIcon
     
      style={{ cursor: 'pointer' }}
      className="ml-3 h-5 w-5"
    />}        </span>





 <span  onClick={() => router.push('/Blog')}>
  { 
  <Icons.Rss
     
      style={{ cursor: 'pointer' }}
      className="ml-3 h-5 w-5"
    />}        </span>

 

  <span>


<Icons.BellIcon style={{cursor:"pointer"}}  className="ml-3 h-5 w-5" />
        </span>


<span onClick={() => router.push('/cart')} className="relative inline-block">
  <Icons.Wrench style={{ cursor: "pointer" }} className="ml-2 h-5 w-5" />

  { loadedRepairs?.length >= 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] leading-none font-semibold rounded-full px-1.5 min-w-[16px] h-[16px] flex items-center justify-center">
 {loadedRepairs?.length > 9 ? "9+" : loadedRepairs?.length} 
    </span>
  )}
</span>



</span>

<span  onClick={ () => setOpenSetup(pre => !pre)} style={{marginLeft:"20px"}}> 

          <Icons.UserCog style={{cursor:"pointer", marginTop:"-7px", color:"hsl(206.89deg 99.07% 58.04%)"}}  className="ml-2 mb-3 h-7 w-7" />

{ openSetup &&
<span style={{zIndex:"99", position:"absolute", top:"50px", right:"20px"}}>
  <ul style={{background:"white", height:"100px", width:"100px", marginTop:"5px", paddingTop:"20px" }}>
    <li onClick={() => router.push('/profile')}   style={{display:"flex", flexDirection:"row", marginBottom:"10px", cursor:"pointer"}}>
                <Icons.UserCog style={{cursor:"pointer", }}  className="ml-2  h-5 w-5" />

      <p style={{marginLeft:"5px"}}>
        profile
        </p> 
       
       </li>

    <li style={{display:"flex", flexDirection:"row",  cursor:"pointer"}}>

                <Icons.LogOut style={{cursor:"pointer", }}  className="ml-2  h-5 w-5" />

     <p style={{marginLeft:"5px"}} onClick={handleLogout}>
      Logout
      </p> 
      
      </li>
  </ul>
</span>

}

</span>

</>

  )
}