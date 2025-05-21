"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Icons } from '../icons';
import useUserAuth from '@/hooks/useUserAuth';
import { useEffect } from 'react';
interface AppHeaderProps {
  onOpenCreatePost: () => void;
}


const AppHeader: React.FC<AppHeaderProps> = ({ onOpenCreatePost }) => {

  const {user} = useUserAuth();

 
  return (

  

      <header className="mb-8 text-center" style={{position:"fixed" ,left:"0", right:"0", top:"0", zIndex:"99" , background:"white"}}>
       <h1  className="magneticH1 text-4xl font-bold text-primary flex items-center justify-center">
          <Icons.Wrench className="magneticicon mr-3 h-10 w-10 wrench" />
          Magnetics Repair 
        </h1> 
        <p className='text-center text-muted createPost' style={{color:"grey"}}>Blog</p>
     { user?.client ? "" : <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <Button onClick={onOpenCreatePost} variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Post
        </Button>
      </div>}
    </header>
  );
};

export default AppHeader;
