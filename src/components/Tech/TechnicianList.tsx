'use client';
import React, {useState} from 'react';
import useUserAuth from '@/hooks/useUserAuth';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

export default function TechnicianList() {
  const { users } = useUserAuth();
  const router = useRouter();

  const handleMessage = (techId: string) => {
    alert(`Leave a message for tech ID: ${techId}`);
  };

  const [trackId, setTrackId] = useState('');

const handleTrack = () => {
  if (!trackId) return;
  router.push(`/track?id=${trackId}`);
};

  return (

    <>
  {/* Tracking Input */}
  <div className="mb-6" style={{width:"50%", margin:"auto"}}>
    <label className="block mb-2 text-sm font-medium text-gray-700 " >
      Track my item by ID
    </label>
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter ID"
        value={trackId}
        onChange={(e) => setTrackId(e.target.value)}
        className="border rounded px-3 py-2 w-full max-w-xs"
      />
      <button
        onClick={handleTrack}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Track
      </button>
    </div>
  </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(tech => (
        <div key={tech.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition relative">
          <div className=''>
            <div>
              <span className='flex'>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={tech.dp} alt={tech?.username?.slice(0, 1).toUpperCase()} />
                  <AvatarFallback>{tech?.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <button
                  onClick={() => router.push(`/Profiles?id=${tech.id}`)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    marginTop: "-20px",
                    marginLeft: "10px",
                    background: "none",
                    fontStyle: "italic",
                    color: "green",
                    fontSize: "15px"
                  }}
                >
                  view Profile
                </button>
              </span>
            </div>
            <h2 className="text-lg font-semibold mt-3 ml-2">{tech.username}</h2>
          </div>

          <p className="text-sm text-gray-600 mb-1">Skills: {tech.skills || ""}</p>
          <p className="text-sm text-gray-500 mb-2">Bio: {tech.bio || ""}</p>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <span>{tech.availability ? 'Available' : 'Unavailable'}</span>
              <input
                type="checkbox"
                checked={tech.availability}
                onChange={() => console.log('Toggle availability logic here')}
              />
            </label>
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => handleMessage(tech.id)}
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>

    </>
  );
}
