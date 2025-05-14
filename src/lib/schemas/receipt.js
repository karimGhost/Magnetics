import { z } from 'zod';

export const receiptFormSchema = z.object({
  clientName: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  technicianName: z.string().min(2, { message: "Technician name must be at least 2 characters." }),
  technicianSignature: z.string().min(1, { message: "Technician signature is required." }),
  clientSignature: z.string().min(1, { message: "Client signature is required." }),
  itemName: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  itemDetails: z.string().min(10, { message: "Item details must be at least 10 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  collectionDate: z.date({ required_error: "Collection date is required." }),
  repairDuration: z.string().min(1, { message: "Repair duration is required." }),
  clientPhoneNumber: z.string().min(10, { message: "Client phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]+$/, { message: "Invalid phone number format."}),
  technicianPhoneNumber: z.string().min(10, { message: "Technician phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]+$/, { message: "Invalid phone number format."}),
});
