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

  

    <>
      { user?.client ? "" : <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 sm:mt-5 mttp" style={{position:"fixed", top:"90px", zIndex:"200"}}>
          <Button onClick={onOpenCreatePost} variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Post
        </Button>
      </div>}
    </>
  );
};

export default AppHeader;
