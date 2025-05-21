'use client';
import { Icons } from '@/components/icons';
import TechnicianList from '@/components/Tech/TechnicianList';
export default function TechniciansPage() {
  return (
    <div className="p-6">
      <header className="mb-8 text-center" style={{position:"fixed" ,left:"0", right:"0", top:"0", zIndex:"99" , background:"white"}}>
        <h1 className="text-4xl font-bold text-primary flex items-center justify-center py-4">
          <Icons.Wrench className="mr-3 h-10 w-10" />
          Magnetics Repair Shop
        </h1>
        <p className="text-muted-foreground">Manage repair receipts and client communication.</p>
      </header>

      <div className="mt-28">
        <h1 className="text-2xl font-bold mb-4">Technicians</h1>
        <TechnicianList />
      </div>
    </div>
  );
}
