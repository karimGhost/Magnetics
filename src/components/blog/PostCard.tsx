
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { Post, Comment as CommentType } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactionButtons from './ReactionButtons';
import CommentSection from './CommentSection';
import { MessageCircle, UserCircle2 } from 'lucide-react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db2 , dbmessage} from '@/lib/firebasedb';
import { ref, set, push } from 'firebase/database';

// Removed Button import as it's no longer directly used in the problematic spot
// import { Button } from '@/components/ui/button'; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useUserAuth from '@/hooks/useUserAuth';


const PostCard: React.FC<{ post: Post }> = ({ post: initialPost }) => {
  const [post, setPost] = useState<Post>(initialPost);

  
const {user, users} = useUserAuth()

   const username  =  users?.find(u => u?.id === user?.uid)?.username;
   const dp  =  users?.find(u => u?.id === user?.uid)?.dp;

     const userid  =  users?.find(u => u?.id === user?.uid)?.username;


 const handleReaction = async (type: 'like' | 'love' | 'insightful') => {

  const postRef = doc(db2, "posts", post.id); // ✅ Use passed postId postId
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) return;

 const postData = postSnap.data();

const reactionType =
  type === 'like' ? 'likes' :
  type === 'love' ? 'loves' :
  'insightfuls';

const reactions = postData.reactions || {
  likes: 0,
  loves: 0,
  insightfuls: 0
};

const reactionBy = postData.reactionBy || {};

const currentReaction = reactionBy[post.author || 
"anonymous"
];

let updatedReactions = { ...reactions };
let updatedReactionBy = { ...reactionBy };

  if (currentReaction === reactionType )  {
    // 👎 Remove reaction
    updatedReactions[reactionType] = Math.max(0, updatedReactions[reactionType] - 1);
    delete updatedReactionBy[post.author  || 
"anonymous"];


  } else {
    // 👍 Add or replace reaction
    if (currentReaction) {
      updatedReactions[currentReaction] = Math.max(0, updatedReactions[currentReaction] - 1);
    }
    updatedReactions[reactionType] += 1;
    updatedReactionBy[post.author  || 
"anonymous"] = reactionType;
  }

  await updateDoc(postRef, {
    reactions: updatedReactions,
    reactionBy: updatedReactionBy
  });

  console.log("Reaction toggled by", post.author  || 
"anonymous");


const reactionKey =
  type === 'like' ? 'likes' :
  type === 'love' ? 'loves' :
  'insightfuls';



if (post.reactionBy[post.author]) {
  // 👎 Already reacted — remove reaction
  delete post.reactionBy[post.author];
  setPost(prevPost => ({
    ...prevPost,
    reactions: {
      ...prevPost.reactions,
      [reactionKey]: Math.max(0, prevPost.reactions[reactionKey] - 1),
    },
    reactionBy: {
      ...prevPost.reactionBy,
      [post.author]: undefined, // Optional, can be omitted if `delete` already used
    }
  }));



 const newNotifRef = push(ref(dbmessage, `notif/${post.author}`));
await set(newNotifRef, {
  type: "reactions",
  message: `${username} unliked  your post.`,
  avatar: dp,
  userId: userid,
  postId: post.id,
  createdAt: new Date().toISOString(),
});

} else {
  // 👍 New reaction
  post.reactionBy[post.author] = reactionKey;
  setPost(prevPost => ({
    ...prevPost,
    reactions: {
      ...prevPost.reactions,
      [reactionKey]: prevPost.reactions[reactionKey] + 1,
    },
    reactionBy: {
      ...prevPost.reactionBy,
      [post.author]: reactionKey,
    }
  }));


   const newNotifRef = push(ref(dbmessage, `notif/${post.author}`));
await set(newNotifRef, {
  type: "reactions",
  message: `${username} liked  your post.`,
  avatar: dp,
  userId: userid,
  postId: post.id,
  createdAt: new Date().toISOString(),
});
}

};


  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.avatarUrl} alt={post.author} data-ai-hint="profile avatar" />
            <AvatarFallback>
              <UserCircle2 className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <CardDescription>
              By {post.author} on {post.timestamp}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.mediaUrl && (
          <div className="my-4 rounded-lg overflow-hidden aspect-video relative">
            {post.mediaType === 'image' ? (
              <Image 
                src={post.mediaUrl} 
                alt={post.title || "Post image"} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="blog content" 
              />
            ) : post.mediaType === 'video' ? (
              <video controls src={post.mediaUrl} className="w-full h-full object-cover" data-ai-hint="blog content video">
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <ReactionButtons
          likes={post.reactions.likes}
          loves={post.reactions.loves}
          insightfuls={post.reactions.insightfuls}
          onLike={() => handleReaction('like')}
          onLove={() => handleReaction('love')}
          onInsightful={() => handleReaction('insightful')}
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger 
              className="py-2 hover:no-underline hover:bg-transparent group"
            >
              <div className="flex items-center text-sm text-muted-foreground group-hover:text-accent">
                <MessageCircle className="h-4 w-4 mr-2" />
                View Comments ({post.comments.length})
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CommentSection postId={post.id}  postowner={post.author} initialComments={post.comments} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
