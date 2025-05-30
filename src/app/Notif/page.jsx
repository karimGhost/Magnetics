'use client';

import React, { useEffect, useState } from 'react';
import { ref, onValue, remove, onChildAdded } from 'firebase/database';
import { dbmessage } from '@/lib/firebasedb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import useUserAuth from '@/hooks/useUserAuth';
import { useDeprecatedAnimatedState } from 'framer-motion';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
const {user, users} = useUserAuth();
const userId =  user?.uid;
const username = users?.find((i) => i.uid === user.uid)?.username

  useEffect(() => {
    const notifRef = ref(dbmessage, `notif/${username}`);
 console.log("notif",   username   );

    const unsubscribe = onChildAdded(notifRef, (snapshot) => {
      const newNotif = snapshot.val();
     
 console.log("notif",   newNotif   );

      setNotifications((prev) => [
        { key: snapshot.key || "", ...newNotif },
        ...prev,
      ]);


    });


    return () => unsubscribe(); // clean up listener
  }, [username]);


  const handleDismiss = async (notifId) => {
    await remove(ref(db, `notif/${username}/${notifId}`));
  };
  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Your Notifications</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {notifications.map((notif) => {
          const isContactForm = notif.phone;
          return (
            <Card key={notif.key}>
              <CardHeader>
<CardTitle>
  {notif.topic
    ? ` Give Feedback about ${notif.topic}`
    : notif.type
    ? `Notification: ${notif.type}`
    : "Notification"}
</CardTitle>              </CardHeader>
              <CardContent>



                    
                  
                     { notif.name &&

 <div style={{display:"flex"}}> 
                       <i >
                      name: .
                      </i>   
  <p className="mb-2">{notif.name }</p>
        </div>          
                  
                     }
  
                {notif.phone && (
                  <div style={{display:"flex"}}> 
                    
                    <i >
                      phone:
                      </i>               <p className="text-gray-600 italic">"{notif.phone}"</p>

                  </div>
                )}

                <p className="mb-2">{notif.description || notif.message}</p>
                {notif.commentText && (
                  <p className="text-gray-600 italic">"{notif.commentText}"</p>
                )}


                {notif.createdAt && (
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  </p>
                )}


                <div className="flex gap-2 mt-4">
                  {!isContactForm && notif.postId && (
                    <Button onClick={() => router.push(`/posts/${notif.postId}`)}>
                      View
                    </Button>
                  )}
                  <Button variant="destructive" onClick={() => handleDismiss(notif.key)}>
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}