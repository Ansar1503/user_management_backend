import { UserRole } from "../domain/user.entity";

export interface userDTO {
  id?: string;
  fname: string;
  lname: string;
  email: string;
  phone: number;
  password: string;
  role?: UserRole;
  dateOfBirth?: Date;
  address?: string;
  imageUrl?: string;
  designation?: string;
  companyName?: string;
}

export type signinUserDTO = Pick<userDTO, "email" | "password">;

export interface UserQuery {
  role: string;
  status: string;
  sortBy: string;
  sortOrder: string;
  searchQuery: string;
  page:number;
  limit:number;
}
