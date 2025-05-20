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
import { doc, updateDoc } from "firebase/firestore";
import { dbb } from "@/lib/firebasedb";
import Link from 'next/link';
import UserAvatar from "./userAvatar";
const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
const [openSetup, setOpenSetup] = useState(false);

    const {user, users} = useUserAuth();

 const username  =  user?.email?.replace("@gmail.com", "") ?? null;
const [newUsername, setNewUsername] = useState(username);

  const [repairs, setRepairs] = useState([]);


  const [ Techies, setTechies] = useState(false)

  const [DataPending, setDataPending] = useState([]);




const handleEditToggle = async () => {

 
  if (editMode) {
 if(newUsername === null){
  alert(`${username } ..you cannot save blank refresh or edit name`)
    return;
  }
    try {
      const userDocRef = doc(dbb, "users", user.uid);
      await updateDoc(userDocRef, { username: newUsername });
      console.log("Username updated!");

      // Optional: update UI or fetch fresh data
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  }
  setEditMode(!editMode);
};




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


  return (
    <div className="p-4 max-w-4xl mx-auto " style={{marginTop:"50px"}}>


    




      <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-4">
       
              <UserAvatar user={user} username={username} editMode={editMode} />
 
         
        <div className="flex-1">
            {editMode ? (
              <Input defaultValue={username}
                    value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}

              className="text-xl font-bold" />
            ) : (
              <h2 className="text-xl font-bold">   {users.find(i => i.uid === user.uid)?.username || "Unknown User"}
</h2>
            )}
            <p className="text-gray-500">@{username}</p>
          </div>


          <Button onClick={()  => handleEditToggle()}>{editMode ? "Save" : "Edit Profile"}</Button>


        </div>
      </Card>

      <Tabs defaultValue="followers" className="mt-6">
        <TabsList className="grid grid-cols-2 w-64">
<Button
  onClick={() => setTechies(prev => !prev)}
  value="followers"
  className="bg-white text-black shadow-md hover:shadow-lg active:shadow-inner transition-all duration-200 border border-gray-200 px-6 py-2 rounded-xl"
>
  toggleTechies
</Button>          {/* <TabsTrigger value="following">Following</TabsTrigger> */}
        </TabsList>
<TabsContent value="followers">
  <Card className="mt-4 p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">List of Techies</h2>
   {Techies && 
   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((userd) => (

userd.uid === user.uid ? " " :
      <div onClick={() => router.push(`/Profiles?id=${userd.id}`)}  key={userd?.id}>
          <li className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow flex gap-4 items-center cursor-pointer">
            {/* Avatar / DP */}
            <img
              src={
                 userd?.dp || 
                `https://ui-avatars.com/api/?name=${userd.username}&background=random`
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Icons.User className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-lg">{userd.username}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Icons.Mail className="w-4 h-4 text-green-500" />
                <span>{userd.email}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">UID: {userd.uid}</div>
            </div>
          </li>
        </div>
      ))}
    </ul>
   
   }
   
    
  </Card>
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
    {DataPending.map((item) => (
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
