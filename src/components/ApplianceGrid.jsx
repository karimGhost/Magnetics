'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";




export default function ApplianceGrid({selected, setSelected}) {

  return (

 
    <div className="p-6 mt-6  "  >
      <h2 className="text-3xl font-bold text-center mb-6  ">Appliances We Repair</h2>


      <Dialog style={{marginTop:"200px"}} open={!!selected} onOpenChange={() => setSelected(null)}>
     <DialogContent style={{     zIndex: "200",
    position: "fixed"}}  className="sm:max-w-3xl w-full h-[90vh] overflow-y-scroll p-4">
  <DialogHeader>
    <DialogTitle>{selected?.name}</DialogTitle>
    <DialogDescription>
      <Image
        src={selected?.image || ""}
        alt={selected?.name}
        width={600}
        height={400}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <p className="text-gray-700 whitespace-pre-wrap">{selected?.descrip}</p>
    </DialogDescription>
  </DialogHeader>
</DialogContent>

      </Dialog>
    </div>
  );
}
