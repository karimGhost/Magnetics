// components/InvoiceCard.tsx
import React from "react";

export const InvoiceCard = ({ data }) => {



  return (
  <div
  id="invoice"
  className="bg-white text-black w-full max-w-[700px] mx-auto p-8 rounded-xl shadow-lg border border-gray-200 font-sans"
>
  <header className="mb-6">
    <h1 className="text-3xl font-bold text-center text-primary mb-1">Magnetics Repair shop</h1>
    <p className="text-center text-sm text-muted-foreground">
      Generated on: {new Date().toLocaleString()}
    </p>
  </header>

  <section className="mb-6 space-y-2 text-sm">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="font-semibold text-gray-700">Client Info</h2>
        <p><strong>Name:</strong> {data.clientName}</p>
        <p><strong>Phone:</strong> {data.clientPhoneNumber}</p>
      </div>
      <div>
        <h2 className="font-semibold text-gray-700">Technician Info</h2>
        <p><strong>Name:</strong> {data.technicianName}</p>
        <p><strong>Phone:</strong> {data.technicianPhoneNumber}</p>
      </div>
    </div>
  </section>

  <section className="mb-6 space-y-2 text-sm">
    <h2 className="font-semibold text-gray-700">Item Details</h2>
    <p><strong>Item:</strong> {data.itemName}</p>
    <p><strong>Description:</strong> {data.itemDetails}</p>
    <p><strong>Repair Duration:</strong> {data.repairDuration}</p>
    <p><strong>Collection Date:</strong> {data.collectionDate ? new Date(data.collectionDate).toLocaleDateString() : 'N/A'}</p>
  </section>

  <section className="mb-6 text-sm">
    <h2 className="font-semibold text-gray-700">Payment</h2>
    <div className="grid grid-cols-2 gap-4">
      <p><strong>Total Cost:</strong> Ksh {data.price}</p>
      <p><strong>Advance Paid:</strong> Ksh {data.advancepay}</p>
      <p><strong>Balance:</strong> Ksh {parseFloat(data.price || 0) - parseFloat(data.advancepay || 0)}</p>
    </div>
  </section>

  <section className="mb-6 text-sm">
    <h2 className="font-semibold text-gray-700">Client Consent</h2>
    <p className="text-gray-600 leading-relaxed">
      I <strong style={{color:"blue", fontStyle:"italic"}}>{data.clientSignature}</strong> hereby leave my item with <strong>Magnetics Repair Shop</strong> for repair. I understand that I must collect the item on or after the agreed collection date. I acknowledge the terms and authorize the repair process.
    </p>
  </section>

  <section className="mt-6 pt-4 border-t text-xs text-gray-500">
    <p>
      This is a system-generated invoice. For any inquiries, contact Technician {data.technicianName}.
    </p>
  </section>
</div>

  );
};
