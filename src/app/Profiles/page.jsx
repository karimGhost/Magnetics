
'use client';

import { Suspense } from 'react';
import ProfileRender from './ProfileRender'; // 👈 Move logic here
import { Icons } from '@/components/icons';
export default function Profiles() {
  return (
    <div className="p-6">
      <Suspense fallback={<p>Loading profile...</p>}>

      
         <header className="mb-8 text-center" style={{position:"fixed" ,left:"0", right:"0", top:"0", zIndex:"99" , background:"white"}}>
      
      <div style={{position:"absolute", top:"0", right:"0", display:"flex", flexDirection:"row", padding:"20px"}}>
        
      
      </div>
      
      
      
      
              <h1  className="magneticH1 text-4xl font-bold text-primary flex items-center justify-center">
                <Icons.Wrench className="magneticicon mr-3 h-10 w-10 wrench" />
                Magnetics Repair 
              </h1>
       <p className="text-muted-foreground createPost">
         
               .
              </p>      
            {/* <input /> */}
      
            </header>
        <ProfileRender />
      </Suspense>
    </div>
  );
}
