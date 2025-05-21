"use client";

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Post } from '@/types';
import { v2 as cloudinary } from 'cloudinary';
import { updateDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import Image from 'next/image';
import { UploadCloud, FileImage, Video } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db2, storage } from '@/lib/firebasedb'; // adjust path to your Firebase setup
import { Avatar } from '@radix-ui/react-avatar';
import useUserAuth from '@/hooks/useUserAuth';
const postFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }).max(5000),
  media: z.any().optional(), // For file input
  
});

type PostFormValues = z.infer<typeof postFormSchema>;

interface CreatePostDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreatePost: (newPost: Post) => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ isOpen, onOpenChange, onCreatePost }) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      media: null,
    },
  });


  const {user, users} = useUserAuth();

  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('media', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (file.type.startsWith('image/')) {
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType(null);
        setPreview(null);
      }
    } else {
      form.setValue('media', null);
      setPreview(null);
      setMediaType(null);
    }
  };

 const uploadMediaFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Magnetics"); // your unsigned preset
  formData.append("folder", "posts"); // optional — organizes in Cloudinary Media Library

  const res = await fetch("https://api.cloudinary.com/v1_1/duenzfwhz/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url; // This is the hosted image/video URL
};


 useEffect(() => {
console.log("usesr", user)
  }, [user])

const userdp = user?.client? "" : users?.find(i => i.uid === user.uid)?.dp ;
const username = user?.client ? "" :  users?.find(i => i.uid === user.uid)?.username;

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {


    try {
    // Upload media (image or video)
    let uploadedMediaUrl: string | undefined;
        let uploadedAvatarUrl: string | undefined;
if (data.media && typeof data.media !== 'string') {
  uploadedMediaUrl = await uploadMediaFile(data.media);
}

if (userdp && typeof userdp !== 'string') {
  uploadedAvatarUrl = await uploadMediaFile(userdp as File);
}

 const newPost: Post = {
  id: `post-${Date.now()}`,
  author: username,
  avatarUrl: uploadedAvatarUrl || userdp,         // ✅ Use uploaded avatar if available
  timestamp: new Date().toLocaleDateString(),
  title: data.title,
  content: data.content,
  userid: user.uid,
  mediaUrl: uploadedMediaUrl || preview || undefined, // ✅ Use uploaded media if available
  mediaType: mediaType || undefined,
  reactions: { likes: 0, loves: 0, insightfuls: 0 },
  comments: [],
  reactionBy: {...username || "anonymous"} // <- key = user ID, value = reaction type

};


const docRef = await addDoc(collection(db2, 'posts'), newPost); // ✅ capture the returned reference

await updateDoc(docRef, {
  id: docRef.id, // ✅ store the actual Firestore document ID in the document
});

    onCreatePost(newPost);
    form.reset();
    setPreview(null);
    setMediaType(null);
    onOpenChange(false);
  }  catch (error) {
    console.error('Error creating post:', error);
  } ;

  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) { // Reset form on close
        form.reset();
        setPreview(null);
        setMediaType(null);
      }
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, images, or videos with the community.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>
                    This is the text area.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => ( // `field` is not directly used for input type="file" state, but required by FormField
                <FormItem>
                  <FormLabel>Upload Image/Video (Optional)</FormLabel>
                  <FormControl>
                     <Input 
                        type="file" 
                        accept="image/*,video/*" 
                        onChange={handleMediaChange}
                        className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {preview && (
              <div className="mt-4 p-4 border border-dashed rounded-md">
                <Label className="block text-sm font-medium text-muted-foreground mb-2">Media Preview</Label>
                {mediaType === 'image' && (
                  <Image src={preview} alt="Media preview" width={500} height={300} className="rounded-md object-contain max-h-[300px] w-auto mx-auto" data-ai-hint="upload preview"/>
                )}
                {mediaType === 'video' && (
                  <video src={preview} controls className="rounded-md max-h-[300px] w-auto mx-auto" data-ai-hint="upload preview video" />
                )}
                 {!mediaType && (
                  <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-md">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Unsupported file type for preview.</p>
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                 onOpenChange(false);
                 form.reset();
                 setPreview(null);
                 setMediaType(null);
                }}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Publish Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
