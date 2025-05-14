"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";

export default function RepairCartPage({setDataPending}) {
  const technicianName = "JohnDoe"; // Replace with dynamic user later
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const repairsRef = ref(db, `/${technicianName}/pendingRepairs`);

    const unsubscribe = onValue(repairsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedRepairs = [];

      if (data) {
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
      setDataPending(loadedRepairs);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (item) => {
    const fromPath = `/${technicianName}/pendingRepairs/${item.clientName}/${item.id}`;
    const toPath = `/${technicianName}/repaired/${item.clientName}/${item.id}`;

    try {
      await set(ref(db, toPath), item.data);
      await remove(ref(db, fromPath));
    } catch (error) {
      console.error("Error updating repair status:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Repairs</h1>

      {repairs.length === 0 ? (
        <p className="text-gray-500">No pending repairs.</p>
      ) : (
        <div className="grid gap-4">
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
              <p className="text-sm">Price: ₹{item.data.price ?? "N/A"}</p>
              <p className="text-sm">Advance: ₹{item.data.Advancepay ?? "N/A"}</p>
              <p className="text-sm">Collection Date: {item.data.collectionDate || "N/A"}</p>

              <button
                onClick={() => handleComplete(item)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Completed Fix
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
