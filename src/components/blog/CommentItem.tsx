"use client";

import type React from 'react';
import Image from 'next/image';
import type { Comment } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex space-x-3 py-3 border-b border-border/50 last:border-b-0">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.userAvatarUrl} alt={comment.user} data-ai-hint="profile avatar" />
        <AvatarFallback>
          <UserCircle2 className="h-5 w-5 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{comment.user}</p>
          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
        </div>
        <p className="text-sm text-foreground/80 mt-1">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
