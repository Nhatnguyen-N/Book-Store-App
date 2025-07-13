import { UserType } from "./user.types";

export interface BookType {
  title: string;
  caption: string;
  image: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  _id: string;
}