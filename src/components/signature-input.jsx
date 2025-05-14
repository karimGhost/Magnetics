"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SignatureInput = React.forwardRef(
  ({ className, label, id, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        {label} (Type full name to sign)
      </Label>
      <Input
        id={id}
        ref={ref}
        className={cn(
          "font-serif_placeholder_italic border-b-2 border-x-0 border-t-0 rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary_focus",
          className
        )}
        placeholder="Your Signature"
        {...props}
      />
    </div>
  );
});
SignatureInput.displayName = "SignatureInput";

export { SignatureInput };
