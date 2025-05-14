"use client";

import React, { useState, useEffect } from "react";
import { User, Lock, X, Bell } from "lucide-react"; // Lucide icons
import { auth } from "@/lib/firebasedb"; // import auth from your firebase setup
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function LoginPopup({user}) {
  const [showPopup, setShowPopup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  // UseEffect to control the popup visibility based on user state
 ;

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      console.log("Logged in user:", loggedInUser.email);
      // Optionally, you can do additional user-related tasks here (e.g., saving data to the database)
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="relative z-10">
      {/* Popup */}
      { (
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
              <h2 className="text-xl font-bold mt-2">Welcome Techie</h2>
              <p className="text-sm text-gray-500">Please login to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
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

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
