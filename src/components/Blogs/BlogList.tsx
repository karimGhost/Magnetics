'use client';

import { useEffect, useState } from 'react';
import type { Post } from '@/types';
import PostCard from '@/components/blog/PostCard';
import { db2 } from '@/lib/firebasedb';
import { onSnapshot, collection } from "firebase/firestore";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
export default function BlogList({ limit }: { limit?: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db2, "posts"), snapshot => {
      let postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      if (limit) {
        postsData = postsData.slice(0, limit);
      }
      setPosts(postsData);
      setIsLoading(false);
    }, error => {
      console.error("Error listening to posts:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [limit]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className="w-full shadow-lg blogcard" >
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
        ))}
      </>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-center text-muted-foreground">No posts found.</p>
      )}
    </>
  );
}
