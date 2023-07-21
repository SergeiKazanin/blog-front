export type Posts = Post[];

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserPost;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserPost {
  _id: string;
  fullName: string;
  email: string;
}

export interface UserLogin {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  email: string;
  id: string;
  isActivated: boolean;
}

export interface CreatePost {
  title: string;
  text: string;
  tags: string[];
  imageUrl: string;
}
