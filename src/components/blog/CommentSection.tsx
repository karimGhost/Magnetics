"use client";

import React, { useState } from 'react';
import type { Comment } from '@/types';
import CommentItem from './CommentItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import useUserAuth from '@/hooks/useUserAuth';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db2, storage , dbmessage} from '@/lib/firebasedb'; // adjust path to your Firebase setupi
import { ref, set, push } from 'firebase/database';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}


const CommentSection: React.FC<CommentSectionProps> = ({ postId, initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
const {user, users} = useUserAuth();
const userdp =  users?.find(i => i?.uid === user?.uid)?.dp  || null;
const username = users?.find(i => i?.uid === user?.uid)?.username || null;




const handleAddComment = async (e: React.FormEvent) => {
  e.preventDefault();

  // if(!user){
  //   alert("login to view comments")
  //   return;
  // }

  if (newComment.trim() === '') return;

  const commentToAdd: Comment = {
    id: `comment-${postId}-${Date.now()}`,
    user: username || "Anonymous",
    userAvatarUrl: userdp || "https://placehold.co/40x40.png",
    text: newComment,
    timestamp: new Date().toLocaleDateString(),
  };

  try {
    const postRef = doc(db2, "posts", postId); // ✅ Correct way to reference the Firestore post
    await updateDoc(postRef, {
      comments: arrayUnion(commentToAdd), // 🔥 Add to array in Firestore
    });

    // Optional: Update local state so UI updates immediately
    setComments((prev) => [...prev, commentToAdd]);
    setNewComment('');
  } catch (error) {
    console.error("Error adding comment:", error);
  }



     const newNotifRef = push(ref(dbmessage, `notif/${username}`));
await set(newNotifRef, {
  type: "comment",
  message: `${commentToAdd.user} commented on your post.`,
  commentText: commentToAdd.text,
  avatar: commentToAdd.userAvatarUrl,
  postId: postId,
  createdAt: new Date().toISOString(),
});


};


  return (
  
    <div className="mt-4 pt-4 border-t border-border/50">
      <h3 className="text-lg font-semibold mb-3 text-foreground">Comments ({comments.length})</h3>

      {comments.length > 0 && (
        <ScrollArea className="h-[200px] mb-4 pr-3">
          <div className="space-y-2">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </ScrollArea>
      )}
      {comments.length === 0 && (
         <p className="text-sm text-muted-foreground mb-4">No comments yet. Be the first to comment!</p>
      )}
      <form onSubmit={handleAddComment} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
          aria-label="Add a comment"
        />
        <Button type="submit" size="icon" variant="outline" aria-label="Send comment">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
