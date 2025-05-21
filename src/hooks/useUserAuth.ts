// hooks/useUserAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth ,db, dbb} from "@/lib/firebasedb";
import { collection, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";
// import { db } from "@/lib/firebasedb";




export default function useUserAuth() {
const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<any[]>([]);

   useEffect(() => {
    const storedClient = localStorage.getItem("clientUser");
    if (storedClient) {
      try {
        const parsed = JSON.parse(storedClient);
        setUser(parsed); // or whatever field you need

       
      } catch (e) {
        console.error("Failed to parse clientUser from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
 console.log("user", user)
  }, [  user])
  
  // Get currently logged-in user        const username = currentUser.email?.replace("@gmail.com", "") ?? null;

useEffect(() => {
    const storedClient = localStorage.getItem("clientUser");

  if(storedClient){
    return;
  }
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
         console.log("users", currentUser)
      setUser(currentUser); // ✅ Save the full user object
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);






 

  // Get all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(dbb, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        console.log("usersis", userList)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);  

  return  {user, users};
}






  