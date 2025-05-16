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

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
const [openSetup, setOpenSetup] = useState(false);

    const user = useUserAuth();

  const [repairs, setRepairs] = useState([]);

  const [DataPending, setDataPending] = useState([]);


useEffect(() => {
  if (!user) return; // exit early if not ready

  const repairsRef = ref(db, `/${user}/pendingRepairs`);

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
}, [user]); // 👈 depends on user





useEffect(() => {
  if (!user) return; // exit early if not ready

  const repairsRef = ref(db, `/${user}/repaired`);

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
}, [user]); // 👈 depends on user

  
  const handleEditToggle = () => setEditMode(!editMode);

  return (
    <div className="p-4 max-w-4xl mx-auto">


 <div style={{position:"absolute", top:"0", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
      
    
    <span style={{display:"flex", flexDirection:"row"}}>
    
     <span  onClick={() => router.push('/')}>
      {
      <Icons.HomeIcon
         
          style={{ cursor: 'pointer' }}
          className="ml-3 h-5 w-5"
        />}        </span>
    
      <span>
    <Icons.BellIcon style={{cursor:"pointer"}}  className="ml-3 h-5 w-5" />
            </span>
    
    
    <span     onClick={() => router.push('/cart')}>
    
            <Icons.ShoppingCart style={{cursor:"pointer", color:"hsl(206.89deg 99.07% 58.04%)"}} className="ml-2 h-5 w-5" />
    
    </span>
    
    
    
    </span>
    
    <span  style={{marginLeft:"20px"}}> 
    
              <Icons.UserCog style={{cursor:"pointer", marginTop:"-7px", color:"hsl(206.89deg 99.07% 58.04%)"}}  className="ml-2 mb-3 h-7 w-7" />
    
    { openSetup &&
    <span style={{zIndex:"99", position:"absolute", top:"50px", right:"20px"}}>
      <ul style={{background:"white", height:"100px", width:"100px", marginTop:"5px", paddingTop:"20px" }}>
        <li onClick={ () => setOpenSetup(pre => !pre)}  style={{display:"flex", flexDirection:"row", marginBottom:"10px", cursor:"pointer"}}>
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
    




      <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/profile.jpg" alt="User" />
            <AvatarFallback>{user?.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {editMode ? (
              <Input defaultValue={user} className="text-xl font-bold" />
            ) : (
              <h2 className="text-xl font-bold">{user}</h2>
            )}
            <p className="text-gray-500">@{user}</p>
          </div>
          <Button onClick={handleEditToggle}>{editMode ? "Save" : "Edit Profile"}</Button>
        </div>
      </Card>

      <Tabs defaultValue="followers" className="mt-6">
        <TabsList className="grid grid-cols-2 w-64">
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="followers">
          <Card className="mt-4 p-4">List of followers will appear here.</Card>
        </TabsContent>
        <TabsContent value="following">
          <Card className="mt-4 p-4">List of following will appear here.</Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Items Repaired</h3>
          <ul className="list-disc pl-5 space-y-1">
           
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
    </div>
  ))}
</div>

          



          </ul>
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
          {item.data.itemName || "Unnamed Item"} — {item.clientName}
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

export default ProfilePage;
