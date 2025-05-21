"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useUserAuth from "@/hooks/useUserAuth";
import { db } from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { Icons } from "@/components/icons"; 
import { useRouter } from 'next/navigation';
import { Navbtn } from "@/components/Navbtn";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
 const ProfileRender = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const [id, setIdd] = useState(null);
  
    const searchParams = useSearchParams();

      useEffect(() => {
    const value = searchParams.get('id');
    setIdd(value);
  }, [searchParams]);



const [openSetup, setOpenSetup] = useState(false);
    const { users} = useUserAuth();
  const user = users.find(u => u.id === id);

 const username  =  user?.email?.replace("@gmail.com", "") ?? null;


  // use id to find the user

 


  const [repairs, setRepairs] = useState([]);


  const [ Techies, setTechies] = useState(false)

  const [DataPending, setDataPending] = useState([]);

useEffect(() => {
console.log("usernames", username)
}, [user])

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

    setDataPending(loadedRepairs);
  });


 


  return () => unsubscribe();
}, [username]); // 👈 depends on username





useEffect(() => {
  if (!username) return; // exit early if not ready

  const repairsRef = ref(db, `/${username}/repaired`);

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
}, [username]); // 👈 depends on username




  if (!users) return <p>Loading profile...</p>;

  
  const handleEditToggle = () => setEditMode(!editMode);

  return (
    <div className="p-4 max-w-4xl mx-auto " style={{marginTop:"50px"}}>


    



     

          


       <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-4">
 

          <div className="flex-1 discontent " >

<div className="smalldev">

    <div className="flex smalldev" >
<div className="flex row">


                <Avatar className="w-20 h-20">
            <AvatarImage src={users.find(u => u.id === id)?.dp} alt="User" />
            <AvatarFallback>{users.find(u => u.id === id)?.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>  

  <div style={{marginTop:"15px", marginLeft:"10px"}}>
             <h2 className="text-xl font-bold">
                {users.find(i => i.uid === id)?.username || "Unknown User"}
              </h2>
                          <p className="text-gray-500">@{username}</p>

            </div> 

</div>



            </div>
           
         
          <div className="flex column smalldev" style={{flexDirection:"row ", justifyContent:"space-evenly", marginTop:"40px"}}>
           
             
            
      
            {/* BIO */}
            <div className="mt-3" >

              <label className="font-semibold text-sm">Bio:</label>
             
                <p className="text-gray-700 pBioState">{ users.find(u => u.id === id)?.bio || "No bio available."}</p>
              
            </div>
      
            {/* SKILLS */}
            <div className="mt-2 ">
              <label className="font-semibold text-sm">Skills:</label>
            
                <p className="text-gray-700 pBioState">{users.find(u => u.id === id)?.skills || "No skills listed."}</p>
              
            </div>
          </div>

          </div>
</div>
          
        
      
          {/* Buttons */}
          <div className="flex flex-col items-end gap-2 ">
           
      
            <button
              style={{
                width: "90px",
                height: "40px",
                fontSize: "15px",
                padding: "10px"
              }}
              className={`px-4 py-2  rounded-full text-white btAvailableDP btAvailable ${
                users.find(i => i.uid === id)?.availability === "Available" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {users.find(i => i.uid === id)?.availability}
      
            </button>
          </div>
        </div>
      </Card>
      

      <Tabs defaultValue="followers" className="mt-6">
     
        {/* <TabsContent value="following">
          <Card className="mt-4 p-4">List of following will appear here.</Card>
        </TabsContent> */}
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
       
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Items Repaired</h3>
  <div className="mt-6">
  <h3 className="text-xl font-bold mb-4"> repaired</h3>
  <div className="max-h-[500px] overflow-y-auto rounded-lg border p-4 bg-white shadow-inner space-y-4">
    {DataPending.map((item) => (
      <div
        key={item.id}
        className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
      >
        <h2 className="text-base font-semibold text-gray-800 mb-1">
      item :   {item.data.itemName || "Unnamed Item"} — client : <i style={{color:"aqua"}}>  {item.data.clientName} </i>
        </h2>
        <p className="text-sm text-gray-600">
          <strong>Details:</strong> {item.data.itemDetails || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Price:</strong> Ksh{item.data.price ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Advance:</strong> Ksh{item.data.advancepay ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Collection Date:</strong> {item.data.collectionDate || "N/A"}
        </p>
      </div>
    ))}
  </div>
</div>

         
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Items Pending Repair</h3>
  <div className="mt-6">
  <h3 className="text-xl font-bold mb-4">Pending Repairs</h3>
  <div className="max-h-[500px] overflow-y-auto rounded-lg border p-4 bg-white shadow-inner space-y-4">
    {repairs.map((item) => (
      <div
        key={item.id}
        className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
      >
        <h2 className="text-base font-semibold text-gray-800 mb-1">
      item :   {item.data.itemName || "Unnamed Item"} — client : <i style={{color:"aqua"}}>  {item.data.clientName} </i>
        </h2>
        <p className="text-sm text-gray-600">
          <strong>Details:</strong> {item.data.itemDetails || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Price:</strong> Ksh{item.data.price ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Advance:</strong> Ksh{item.data.advancepay ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Collection Date:</strong> {item.data.collectionDate || "N/A"}
        </p>
      </div>
    ))}
  </div>
</div>

         
        </Card>
      </div>
    </div>
  );
};

export default ProfileRender;
