export interface UserToken {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  email: string;
  id: string;
  isActivated: boolean;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegister {
  email: string;
  password: string;
  fullName: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
