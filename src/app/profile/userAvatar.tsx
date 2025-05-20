"use client";
import { useRef, useState , useEffect} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateDoc, doc , getDoc} from "firebase/firestore";
import { dbb } from "@/lib/firebasedb"; // adjust path as needed
import React from 'react';
import useUserAuth from '@/hooks/useUserAuth';
const UserAvatar = ({ username, editMode }: {  username: string; editMode: boolean }) => {
  const [localUser, setLocalUser] = useState();
    const fileInputRef = useRef<HTMLInputElement>();
const {user, users} =useUserAuth();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'profilePic');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/duenzfwhz/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        const newDpUrl = data.secure_url;

        // ✅ Update local state
        setLocalUser( newDpUrl );

        // ✅ Update Firestore (optional)
        await updateDoc(doc(dbb, 'users', user?.uid), { dp: newDpUrl });

        console.log("Profile picture updated successfully");
      } else {
        console.error("Cloudinary upload failed", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };



// useEffect(() => {
//   const fetchUser = async () => {
//     if (!user?.uid) return;
//     const userRef = doc(dbb, "users", user?.uid);
//     const userSnap = await getDoc(userRef);
//     if (userSnap.exists()) {
//         const users = userSnap.data()
//       setLocalUser(users.dp);

//       console.log("userrrrr", users)
//     }
//   };
//   fetchUser();
// }, [user?.uid])



  return (
    <div className="relative w-fit">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <div
        onClick={() => editMode && fileInputRef.current?.click()}
        className={`relative ${editMode ? "cursor-pointer" : ""}`}
      >


        {editMode ?
  <Avatar className="w-20 h-20">
          <AvatarImage src={localUser} alt="User" />
          <AvatarFallback>{"Click"}</AvatarFallback>
        </Avatar>
:

 <Avatar className="w-20 h-20">
            <AvatarImage src={users.find(i => i.uid === user.uid)?.dp} alt="User" />
    <AvatarFallback>{username?.slice(0, 1).toUpperCase()}</AvatarFallback>
  </Avatar>

        }
      



        {editMode && (
        <div className="absolute inset-0 flex items-center justify-center">
  ✏️
</div>

        )}
      </div>
    </div>
  );
};

export default UserAvatar;
