'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function GetQuotePopup({open, setOpen}) {
  // const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form logic here (e.g., send to server or Firestore)
    alert('Quote request submitted!');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Your Free Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we’ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Email Address" required />
          <Textarea placeholder="Describe your..." required rows={4} />

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
