"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import useUserAuth from "@/hooks/useUserAuth";
import { db , dbb} from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { Icons } from "@/components/icons"; 
import { useRouter } from 'next/navigation';
import { Navbtn } from "@/components/Navbtn";
import { doc, updateDoc } from "firebase/firestore";
import Link from 'next/link';
import UserAvatar from "./userAvatar";
const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
const [openSetup, setOpenSetup] = useState(false);

const [bio, setBio] = useState("");
const [skills, setSkills] = useState("");
const [newUsername, setNewUsername] = useState(username); // optional

    const {user, users} = useUserAuth();

 const username  =  user?.email?.replace("@gmail.com", "") ?? null;

  const [repairs, setRepairs] = useState([]);


  const [ Techies, setTechies] = useState(false)

  const [DataPending, setDataPending] = useState([]);


const [availability, setAvailability] = useState("Available");

const toggleAvailability = async () => {
  const newStatus = availability === "Available" ? "Busy" : "Available";
  setAvailability(newStatus);

  try {
    const userDocRef = doc(dbb, "users", user.uid);
    await updateDoc(userDocRef, {
      availability: newStatus,
    });
    console.log("Availability updated to", newStatus);
  } catch (error) {
    console.error("Error updating availability:", error);
  }
};


// const handleEditToggle = async () => { R

 
//   if (editMode) {
//  if(newUsername === null){
//   alert(`${username } ..you cannot save blank refresh or edit name`)
//     return;
//   }
//     try {
//       const userDocRef = doc(dbb, "users", user.uid);
//       await updateDoc(userDocRef, { username: newUsername });
//       console.log("Username updated!");

//       // Optional: update UI or fetch fresh data
//     } catch (error) {
//       console.error("Failed to update username:", error);
//     }
//   }
//   setEditMode(!editMode);
// };






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
  const fetchUserInfo = async () => {
    const docRef = doc(dbb, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setBio(data.bio || "");
      setSkills(data.skills || "");
        }
  };

  fetchUserInfo();
}, []);


const handleEditToggle = async () => {
  if (editMode) {
    const userDocRef = doc(dbb, "users", user.uid);
    await updateDoc(userDocRef, {
      bio,
      skills,
      username: newUsername,
    });
  }

  setEditMode(prev => !prev);
};



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
 

          <div className="flex-1">

            <div className="flex smalldev" >
       
              <UserAvatar user={user} username={username} editMode={editMode} />
 
         
  <div style={{marginTop:"15px", marginLeft:"10px"}}>
           
            {editMode ? (
        <Input
                    value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
          className="text-xl font-bold"
        />
            ) : (
        <h2 className="text-xl font-bold">
          {users.find(i => i.uid === user.uid)?.username || "Unknown User"}
</h2>
            )}
            <p className="text-gray-500">@{username}</p>

            </div>    
            </div>
           
         
          <div className="flex column smalldev" style={{flexDirection:"row ", justifyContent:"space-evenly", marginTop:"40px"}}>
           
             
           
      
            {/* BIO */}
            <div className="mt-3" >

              <label className="font-semibold text-sm">Bio:</label>
              {editMode ? (
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
        ) : (
          <p className="text-gray-700">{bio || "No bio available."}</p>
        )}
              
            </div>
      
            {/* SKILLS */}
            <div className="mt-2 ">
              <label className="font-semibold text-sm">Skills:</label>
            
  {editMode ? (
          <Input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., React, Node.js"
          />
        ) : (
          <p className="text-gray-700">{skills || "No skills listed."}</p>
        )}              
            </div>
          </div>

          </div>

      
          {/* Buttons */}
          <div className="flex flex-col items-end gap-2">
      <Button onClick={handleEditToggle}>
        {editMode ? "Save" : "Edit Profile"}
      </Button>
         
<button
  onClick={toggleAvailability}
  style={{    
width: "90px",
    height: "40px",
    fontSize: "15px",
    padding: "10px"
}}
        className={`px-4 py-2 rounded-full text-white btAvailable ${
          users.find(i => i.uid === user.uid)?.availability === "Available" ? "bg-green-500" : "bg-yellow-500"
  }`}
>
        {users.find(i => i.uid === user.uid)?.availability}

</button>
</div>
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
               <span><p style={{fontSize:"10px", color: userd.availability === "Busy" ? "red" :"green" }}>  {userd.availability}</p>  </span>
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

export default ProfilePage;
