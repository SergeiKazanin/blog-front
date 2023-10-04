export type Posts = Post[];

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserPost;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserPost {
  _id: string;
  fullName: string;
  email: string;
}
export interface CreatePost {
  title: string;
  text: string;
  tags: string[];
  imageId: string;
}

export interface UrlImg {
  id: string;
}
