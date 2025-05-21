"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import useUserAuth from "@/hooks/useUserAuth";
import { db , dbb} from "@/lib/firebasedb";
import { ref, onValue, remove, set } from "firebase/database";
import { Icons } from "@/components/icons"; 
import { useRouter } from 'next/navigation';
import { Navbtn } from "@/components/Navbtn";
import { doc, updateDoc } from "firebase/firestore";
import Link from 'next/link';
import UserAvatar from "./userAvatar";

const ProfileRenderr = () => {
 

  return (
    <div className="p-4 max-w-4xl mx-auto " style={{marginTop:"50px"}}>


    

    </div>
  );
};

export default ProfileRenderr;
