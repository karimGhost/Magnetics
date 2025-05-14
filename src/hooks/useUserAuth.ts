// hooks/useUserAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebasedb";

export default function useUserAuth() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const username = currentUser.email?.replace("@gmail.com", "") ?? null;
        setUser(username);
        console.log("Logged in user:", username);
      } else {
        setUser(null);
        console.log("No user logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
