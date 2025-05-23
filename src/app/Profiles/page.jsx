
'use client';

import { Suspense } from 'react';
import ProfileRender from './ProfileRender'; // 👈 Move logic here
import { Icons } from '@/components/icons';
export default function Profiles() {
  return (
    <div className="p-6">
      <Suspense fallback={<p>Loading profile...</p>}>

      
      
        <ProfileRender />
      </Suspense>
    </div>
  );
}
