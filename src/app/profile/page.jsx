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
const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
const [openSetup, setOpenSetup] = useState(false);

    const user = useUserAuth();

 const username  =  user?.user?.email?.replace("@gmail.com", "") ?? null;
  const [repairs, setRepairs] = useState([]);

  const [DataPending, setDataPending] = useState([]);


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

  
  const handleEditToggle = () => setEditMode(!editMode);

  return (
    <div className="p-4 max-w-4xl mx-auto " style={{marginTop:"50px"}}>


    




      <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/profile.jpg" alt="User" />
            <AvatarFallback>{username?.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {editMode ? (
              <Input defaultValue={username} className="text-xl font-bold" />
            ) : (
              <h2 className="text-xl font-bold">{username}</h2>
            )}
            <p className="text-gray-500">@{username}</p>
          </div>
          <Button onClick={handleEditToggle}>{editMode ? "Save" : "Edit Profile"}</Button>
        </div>
      </Card>

      <Tabs defaultValue="followers" className="mt-6">
        <TabsList className="grid grid-cols-2 w-64">
          <TabsTrigger value="followers">Techies</TabsTrigger>
          {/* <TabsTrigger value="following">Following</TabsTrigger> */}
        </TabsList>
        <TabsContent value="followers">
          <Card className="mt-4 p-4">List techies.</Card>

        </TabsContent>
        {/* <TabsContent value="following">
          <Card className="mt-4 p-4">List of following will appear here.</Card>
        </TabsContent> */}
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
