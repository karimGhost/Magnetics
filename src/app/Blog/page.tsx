"use client";

import React, { useState, useEffect } from 'react';
import type { Post } from '@/types';
import AppHeader from '@/components/shared/AppHeader';
import PostCard from '@/components/blog/PostCard';
import CreatePostDialog from '@/components/blog/CreatePostDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/buttonn';
import { db2 } from '@/lib/firebasedb';
import { onSnapshot, getDocs ,collection } from "firebase/firestore";



const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Alice Wonderland',
    avatarUrl: 'https://placehold.co/40x40.png?text=AW',
    timestamp: 'October 26, 2023',
    title: 'My First Adventure in Tech',
    content: "Just started my journey into the world of Next.js and Tailwind CSS. It's been an exciting ride so far! Learning about server components and client components. The styling is so intuitive with Tailwind. #NewBeginnings #TechJourney",
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    reactions: { likes: 15, loves: 5, insightfuls: 3 },
    comments: [
      { id: 'c1-1', user: 'Bob The Builder', text: 'Welcome to the club! Next.js is great.', timestamp: 'Oct 26', userAvatarUrl: 'https://placehold.co/40x40.png?text=BB' },
      { id: 'c1-2', user: 'Charlie Brown', text: 'Keep it up!', timestamp: 'Oct 27', userAvatarUrl: 'https://placehold.co/40x40.png?text=CB' },
    ],
  },
  {
    id: '2',
    author: 'Bob The Builder',
    avatarUrl: 'https://placehold.co/40x40.png?text=BB',
    timestamp: 'October 28, 2023',
    title: 'Building a Design System',
    content: "Spent the week working on a new design system using ShadCN UI components. It's amazing how quickly you can build professional-looking UIs. The components are accessible and customizable. Highly recommend checking it out for your next project!",
    mediaUrl: 'https://placehold.co/600x338.png', // Placeholder for video
    mediaType: 'video',
    reactions: { likes: 25, loves: 10, insightfuls: 8 },
    comments: [
      { id: 'c2-1', user: 'Alice Wonderland', text: 'Sounds cool! I should check out ShadCN.', timestamp: 'Oct 28', userAvatarUrl: 'https://placehold.co/40x40.png?text=AW' },
    ],
  },
   {
    id: '3',
    author: 'Cathy Coder',
    avatarUrl: 'https://placehold.co/40x40.png?text=CC',
    timestamp: 'November 2, 2023',
    title: 'The Power of Rich Text Editors',
    content: "Exploring options for rich text editors in React. Having good formatting tools can really enhance the content creation experience for users. Thinking about WYSIWYG editors and their integration challenges. What are your favorites?",
    reactions: { likes: 18, loves: 2, insightfuls: 12 },
    comments: [],
  },
];


export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate fetching posts
  //   const timer = setTimeout(() => {
  //     setPosts(initialPosts);
  //     setIsLoading(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleCreatePost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };


   const [loading, setLoading] = useState(true);


useEffect(() => {
  const unsubscribe = onSnapshot(collection(db2, "posts"), snapshot => {
    const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
    setPosts(postsData);
   
    console.log("dpp", postsData);
     setIsLoading(false);
  }, error => {
    console.error("Error listening to posts:", error);
       

    setIsLoading(false);
  });

  return () => unsubscribe(); // clean up listener on unmount
}, []);





  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader onOpenCreatePost={() => setIsCreatePostOpen(true)} />
     
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} className="w-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-[80%] mb-4" />
                  <Skeleton className="aspect-video w-full rounded-lg" />
                </CardContent>
                <CardFooter>
                   <Skeleton className="h-8 w-[200px]" />
                </CardFooter>
              </Card>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-2">No posts yet!</h2>
              <p className="text-muted-foreground">Be the first to share something on Magnetics.</p>
              <Button onClick={() => setIsCreatePostOpen(true)} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">Create Your First Post</Button>
            </div>
          )}
        </div>
      </div>

      <CreatePostDialog 
        isOpen={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen} 
        onCreatePost={handleCreatePost} 
      />
      
      <footer className="text-center py-6 border-t border-border/50 mt-12">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Magnetics shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
