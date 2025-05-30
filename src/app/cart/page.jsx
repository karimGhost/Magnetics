"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { Icons } from "@/components/icons"; 
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebasedb";
import useUserAuth from "@/hooks/useUserAuth";
import { Button } from "@/components/ui/button";
import { InvoiceCard } from "@/components/InvoicePreview";
export default function RepairCartPage() {
  const {user, users} = useUserAuth();

 const username  =   users?.find((i) => i?.uid === user?.uid)?.username ?? null;


 

  const technicianName = username ; // Replace with dynamic username later
  const [repairs, setRepairs] = useState([]);
  const [DataPending, setDataPending] = useState([]);
const [viewP,setviewP] = useState()


  const[Pending,setPending] = useState(true);
const[Complete, setComplete] = useState(false);

const [openSetup, setOpenSetup] = useState(false);

useEffect(() => {
  if (!technicianName) return; // exit early if not ready

  const repairsRef = ref(db, `/${technicianName}/pendingRepairs`);

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

    setRepairs(loadedRepairs);
  });


 


  return () => unsubscribe();
}, [technicianName]); // 👈 depends on technicianName





useEffect(() => {
  if (!technicianName) return; // exit early if not ready

  const repairsRef = ref(db, `/${technicianName}/repaired`);

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

    setDataPending(loadedRepairs);
  });


 


  return () => unsubscribe();
}, [technicianName]); // 👈 depends on technicianName



  const handleComplete = async (item) => {
    const fromPath = `/${technicianName}/pendingRepairs/${item.clientName}/${item.id}`;
    const toPath = `/${technicianName}/repaired/${item.clientName}/${item.id}`;

    try {
      await set(ref(db, toPath), item.data);
      await remove(ref(db, fromPath));
    } catch (error) {
      console.error("Error updating repair status:", error);
      alert("Something went wrong.");
    }
  };


useEffect(() => {
console.log("viewp", viewP)
},[viewP])

  return (

<>
    <div className="max-w-4xl mx-auto p-6 cartTop" >






<div className="pendingSm btTop" style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
    <Button onClick={() => {setPending(true), setComplete(false)}} style={{marginRight:"9px"}} className="text-2xl font-bold mb-4 p-1">Pending Repairs {repairs.length }</Button>

      <Button onClick={() => {setPending(false), setComplete(true)}} className="text-2xl font-bold mb-4 p-1" style={{background:"black", color:"white"}}>completed Repairs {DataPending.length }</Button>



</div>

 
{Pending &&


  <>
  
    {repairs.length === 0 ? (
        <p className="text-gray-500">No pending repairs.</p>
      ) : (
        <div className="grid gap-4">


  { viewP  &&
   

        repairs.filter((i) => i.collectionDate === viewP.collectionDate )  &&
             <div >


             <InvoiceCard data={viewP.data}/>
             <Button onClick={() => setviewP("") } >exit</Button>
 </div>
}
          {repairs.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">
                {item.data.itemName || "Unnamed Item"} — {item.clientName}
              </h2>
              <p className="text-sm text-gray-600">
                Details: {item.data.itemDetails || "N/A"}
              </p>
              <p className="text-sm">Price: ksh{item.data.price ?? "N/A"}</p>
              <p className="text-sm">Advance: ksh{item.data.advancepay ?? "N/A"}</p>
              <p className="text-sm">Collection Date: {item.data.collectionDate || "N/A"}</p>

              <button
                onClick={() => handleComplete(item)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Completed Fix
              </button>

                 <button
                onClick={() => setviewP(item)}
                style={{float:"right"}}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                view
              </button> 
            </div>
          ))}
        </div>
      )}
  
  
  
  </>
}




{Complete &&


  <>
  
    {Complete.length === 0 ? (
        <p className="text-gray-500">No Completed repairs.</p>
      ) : (
        <div className="grid gap-4">


  { viewP  &&
   

        DataPending.filter((i) => i.collectionDate === viewP.collectionDate )  &&
             <div >


             <InvoiceCard data={viewP.data}/>
             <Button onClick={() => setviewP("") } >exit</Button>
 </div>
}
          {DataPending.map((item) => (


  

            <div
            
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >

              <h2 className="text-lg font-semibold">
                {item.data.itemName || "Unnamed Item"} — {item.clientName}
              </h2>
              <p className="text-sm text-gray-600">
                Details: {item.data.itemDetails || "N/A"}
              </p>
              <p className="text-sm">Price: ksh{item.data.price ?? "N/A"}</p>
              <p className="text-sm">Advance: ksh{item.data.advancepay ?? "N/A"}</p>
              <p className="text-sm">Collection Date: {item.data.collectionDate || "N/A"}</p>

               <button
                onClick={() => setviewP(item)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                view
              </button> 
            </div>

          
        
         
          ))}
        </div>
      )}
  
  
  
  </>
}





    
    </div>
    </>
  );
}
