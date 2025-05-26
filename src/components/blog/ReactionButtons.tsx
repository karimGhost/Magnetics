"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, Heart, Lightbulb } from "lucide-react";
interface ReactionButtonsProps {
  likes: number;
  loves: number;
  insightfuls: number;
  onLike: () => void;
  onLove: () => void;
  onInsightful: () => void;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ likes, loves, insightfuls, onLike, onLove, onInsightful }) => {

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={onLike} className="flex items-center group hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors duration-150">
        <ThumbsUp className="h-4 w-4 mr-1 group-hover:fill-accent/20" /> 
        <span>{likes}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={onLove} className="flex items-center group hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-500 transition-colors duration-150">
        <Heart className="h-4 w-4 mr-1 group-hover:fill-pink-500/20" /> 
        <span>{loves}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={onInsightful} className="flex items-center group hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-150">
        <Lightbulb className="h-4 w-4 mr-1 group-hover:fill-yellow-500/20" /> 
        <span>{insightfuls}</span>
      </Button>
    </div>
  );
};

export default ReactionButtons;
