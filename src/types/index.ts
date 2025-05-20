export interface Comment {
  id: string;
  user: string;
  userAvatarUrl?: string;
  text: string;
  timestamp: string;
}

export interface Post {
  map(arg0: (post: any) => any): Post;
  id: string;
  author: string;
  avatarUrl?: string;
  timestamp: string;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  userid:string;
  reactions: {
    likes: number;
    loves: number;
    insightfuls: number;

  }; 
     reactionBy: {}

  comments: Comment[];
}
