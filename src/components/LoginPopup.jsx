"use client";

import React, { useState, useEffect } from "react";
import { User, Lock, X, Bell } from "lucide-react"; // Lucide icons
import { auth } from "@/lib/firebasedb"; // import auth from your firebase setup
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function LoginPopup({user}) {
  const [showPopup, setShowPopup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();


    const [isClient, setIsClient] = useState(true);
  const [clientName, setClientName] = useState();

  // UseEffect to control the popup visibility based on user state
 useEffect(() => {
  const storedClient = localStorage.getItem("clientUser");
  if (storedClient) {
    try {
      const parsed = JSON.parse(storedClient);
      setClientName(parsed); // or whatever field you need
    } catch (e) {
      console.error("Failed to parse clientUser from localStorage", e);
    }
  }
}, []);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
 if (isClient) {
    const clientId = crypto.randomUUID(); // Generate a unique ID
    const timestamp = new Date().toISOString();

    const clientData = {
      id: clientId,
      client:true,
       uid: clientId,
      username: clientName,
      loginTime: timestamp
    };

    localStorage.setItem("clientUser", JSON.stringify(clientData));
    console.log("Client login stored in localStorage:", clientData);

    // Optional: close the popup or redirect
    setShowPopup(false);
    router.refresh(); // For App Router


  } else {
    console.log("Tech Login:", email, password);

    // Handle actual tech login logic here...
  }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential?.user;
      console.log("Logged in user:", loggedInUser.email);
          router.refresh(); // For App Router

      // Optionally, you can do additional user-related tasks here (e.g., saving data to the database)
    } catch (error) {
      console.error("Login error:", error);
      //alert("Invalid email or password!");
      alert("invalid credential")
          router.refresh(); // For App Router

    }
  };


  

  return (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <div className="mb-4 text-center">
          <Bell size={32} className="mx-auto text-blue-600" />
          <h2 className="text-xl font-bold mt-2">
            {isClient ? "Welcome Client" : "Welcome Techie"}
          </h2>
          <p className="text-sm text-gray-500">Please login to continue</p>
        </div>

        {/* Toggle Login Type */}
        <div className="flex justify-center gap-4 mb-4">
       
          <button
            onClick={() => setIsClient(true)}
            className={`px-4 py-1 rounded-full text-sm ${
              isClient ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Client Login
          </button>

             <button
            onClick={() => setIsClient(false)}
            className={`px-4 py-1 rounded-full text-sm ${
              !isClient ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Tech Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {isClient ? (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Your Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
