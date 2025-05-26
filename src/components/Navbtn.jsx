"use client";
// components/InvoiceCard.tsx
import React, {useEffect, useState, useRef} from "react";
import useUserAuth from "@/hooks/useUserAuth";
import { db,dbmessage, auth } from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { useRouter } from 'next/navigation';
import { Icons } from "@/components/icons";
import { onChildAdded } from "firebase/database";
import { signOut } from "firebase/auth";
import LoginPopup from "./LoginPopup";

import Image from 'next/image';
export const Navbtn = ({notLogedin, clientName, login, setLogin}) => {

  const [cartopen, setcartopen] = useState(false);
const [loadedRepairs, setloadedRepairs] = useState(null);
  const {user, users}= useUserAuth();
 const username  =   users?.find((i) => i.uid === user?.uid)?.username ?? null;
 const [openSetup, setOpenSetup] = useState(false);
  const router = useRouter();
const handleLoginn =() =>{
 setLogin(true)
}
  

const [active,  setActive] = useState(false)
const [activeUSer, setActiveuser] = useState(false)

 useEffect(() => {
if(user?.email){
  setActive(true)
}else if(localStorage.getItem("clientUser")){
  
    

setActiveuser(true);
}


 }, [user])
  const menuRef = useRef(null);


 useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSetup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

const [dataPending, setDataPending] = useState(0);


const handleLogout = async () => {
    const storedClient = localStorage.getItem("clientUser");
if(storedClient){
  localStorage.removeItem("clientUser");
      router.refresh(); // For App Router
router.push('/')



  return;
}

  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (!confirmLogout) return;

  try {
    await signOut(auth);
    console.log("User logged out");
    // Optional: Redirect or update UI
        router.refresh(); // For App Router
        location.reload();



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
  

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifRef = ref(dbmessage, `notif/${username}`);

    const unsubscribe = onChildAdded(notifRef, (snapshot) => {
      const newNotif = snapshot.val();
      setNotifications((prev) => [
        { key: snapshot.key || "", ...newNotif },
        ...prev,
      ]);


    });


    return () => unsubscribe(); // clean up listener
  }, [username]);




  if(login){
    return  <LoginPopup  setLogin={setLogin}/>
  }

  if( !user?.email   ){


  return (


 
  <>
  {/* Header */}
  <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3">
        <div className="flex items-center justify-center space-x-3">
           <Image
          alt="Magnetics" 
              width={300} 
              height={300} 
              style={{    marginTop:"-45px",
    marginBottom: "-60px"
}}
         src={"/Image/Logo.png"}/>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage repair receipts and client communication.
        </p>
      </div>
    </div>
  </header>

  {/* Icon Nav Bar Below Header */}
  <div className="fixed top-[90px] right-4 flex items-center gap-4 z-40 bg-white px-3 py-2 rounded-xl shadow-sm sm:top-[100px]" style={{zIndex:"99"}}>
    {/* Home */}
    <Icons.HomeIcon
      onClick={() => router.push('/')}
      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />

    {/* Blog */}
    <Icons.Rss
      onClick={() => router.push('/Blog')}
      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />

    {/* Notifications */}
    <Icons.BellIcon
      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />

  
   
{
  <>
  
  
    {/* User Settings Dropdown */}
        <div className="relative" ref={menuRef}>
      <Icons.UserCog
        onClick={() => setOpenSetup((prev) => !prev)}
        className="h-6 w-6 sm:h-7 sm:w-7 text-primary hover:text-green-500 cursor-pointer transition"
      />




      {openSetup && (



        <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md z-50 py-2">
       
          <div
            onClick={ !user?.email && activeUSer ? handleLogout :  handleLoginn   }
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >

        {!user?.email && activeUSer ? <Icons.LogOut className="h-4 w-4 mr-2" />  :    <Icons.LogIn className="h-4 w-4 mr-2"/>       }
          {!user?.email && activeUSer  ?   "Logout"  :  "Login"     }

          </div>



        </div>


      )}
    </div>
  
  
  </>

    }
  </div>
</>

  
)

}
  
  


  return (

  <>
  {/* Header */}
  <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
      <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3">
        <div className="flex items-center justify-center space-x-1">
         <Image
          alt="Magnetics" 
              width={300} 
              height={300} 
              style={{    marginTop:"-45px",
    marginBottom: "-60px"
}}
         src={"/Image/Logo.png"}/>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage repair receipts and client communication.
        </p>
      </div>
    </div>
  </header>

  {/* Icon Nav Bar Below Header */}
  <div className="fixed top-[75px] right-4 flex items-center gap-4 z-40 bg-white px-3 py-2 rounded-xl shadow-sm sm:top-[90px]" style={{zIndex:"99"}}>
    {/* Home */}
    <Icons.HomeIcon
      onClick={() => router.push('/')}
      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />

    {/* Blog */}
    <Icons.Rss
      onClick={() => router.push('/Blog')}
      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />

    {/* Notifications */}
        <div onClick={() => router.push('/Notif')} className="relative cursor-pointer">

    <Icons.BellIcon

      className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary cursor-pointer transition"
    />
 {notifications?.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 min-w-[16px] h-[16px] flex items-center justify-center">
          {notifications?.length > 9 ? '9+' : notifications?.length}
        </span>
      )}
      </div>



    {/* Cart */}
    <div onClick={() => router.push('/cart')} className="relative cursor-pointer">
      <Icons.Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-primary transition" />
      {loadedRepairs?.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 min-w-[16px] h-[16px] flex items-center justify-center">
          {loadedRepairs?.length > 9 ? '9+' : loadedRepairs?.length}
        </span>
      )}
    </div>

    {/* User Settings Dropdown */}
    <div className="relative" ref={menuRef}>
      <Icons.UserCog
        onClick={() => setOpenSetup((prev) => !prev)}
        className="h-6 w-6 sm:h-7 sm:w-7 text-primary hover:text-green-500 cursor-pointer transition"
      />

      {openSetup && (
        <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md z-50 py-2">
          <div
            onClick={() => router.push('/profile')}
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <Icons.User className="h-4 w-4 mr-2" />
            Profile
          </div>
        
       <div
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <Icons.LogOut className="h-4 w-4 mr-2" />
            Logout
          </div>

      
        </div>


      )}
    </div>
  </div>
</>


  )
}