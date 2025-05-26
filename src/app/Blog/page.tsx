'use client';

import AppHeader from '@/components/shared/AppHeader';
import BlogList from '@/components/Blogs/BlogList';
import CreatePostDialog from '@/components/blog/CreatePostDialog';
import { Button } from '@/components/ui/buttonn';
import { useState } from 'react';
import useUserAuth from '@/hooks/useUserAuth';
import { Navbtn } from '@/components/Navbtn';
export default function BlogPage({login, setLogin}) {
  const {user} = useUserAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);



  return (
    <div className="min-h-screen flex flex-col mt-5" style={{marginTop:"90px"}}>
   


     
      <AppHeader onOpenCreatePost={() => setIsCreatePostOpen(true)} />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8 blogBg">
          <BlogList/>
        </div>
      </div>
<div >

 <CreatePostDialog 
        isOpen={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen} 
         onCreatePost={() => {}} 
      />

</div>
 

      <footer className="text-center py-6 border-t border-border/50 mt-12">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Magnetics shop. All rights reserved.</p>
      </footer>
    </div>
  );
}
