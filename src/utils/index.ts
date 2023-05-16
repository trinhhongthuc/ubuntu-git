export interface IUpdateUser {
  password: string;
  username: string;
}

export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}

export type CreatePostDetailParams = {
  title: string;
  description: string;
};

export type IUserLogin = {
  userName: string;
  password: string;
};
