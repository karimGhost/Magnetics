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
    <div className="p-4 max-w-4xl mx-auto " style={{marginTop:"120px"}}>


    



     

          <Card className="p-6 shadow-md rounded-2xl w-full max-w-4xl mx-auto">
  <div className="flex flex-col gap-6">
    {/* Top section: Avatar, Name, Status */}
    <div className="flex items-center gap-4 flex-wrap">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={users.find((u) => u.id === id)?.dp}
          alt="User"
        />
        <AvatarFallback>
          {users.find((u) => u.id === id)?.username?.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">
            {users.find((i) => i.uid === id)?.username || "Unknown User"}
          </h2>
          <span
            className={`text-sm font-medium ${
              users.find((i) => i.uid === id)?.availability === "Available"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            is {users.find((i) => i.uid === id)?.availability}
          </span>
        </div>
        <p className="text-gray-500">@{username}</p>
      </div>
    </div>

    {/* Bio & Skills section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bio */}
      <div>
        <label className="font-semibold text-sm block mb-1">Bio:</label>
        <p className="text-gray-700">
          {users.find((u) => u.id === id)?.bio || "No bio available."}
        </p>
      </div>

      {/* Skills */}
      <div>
        <label className="font-semibold text-sm block mb-1">Skills:</label>
        <p className="text-gray-700">
          {users.find((u) => u.id === id)?.skills || "No skills listed."}
        </p>
      </div>
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
