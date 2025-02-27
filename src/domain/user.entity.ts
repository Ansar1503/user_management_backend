import { Document } from "mongoose";
export type UserRole = "user" | "admin";

export interface User extends Document {
  id?: string;
  fname: string;
  lname: string;
  email: string;
  phone: number;
  password: string;
  isBlocked: boolean;
  role: UserRole;
  dateOfBirth?: Date;
  address?: string;
  imageUrl?:  string ,
  designation?:  string ,
  companyName?: string ,
  createdAt?: Date;
  updatedAt?: Date;
} 
