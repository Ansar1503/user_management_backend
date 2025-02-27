import { User } from "../domain/user.entity";
import { userDTO, UserQuery } from "./user.dto";

export interface UserRepo {
  createUser(data: userDTO): Promise<User>;
  findUserbyMail(mail: string): Promise<User | null>;
  updateUser(data: Partial<User>): Promise<User | null>;
  findAllUser(query: UserQuery): Promise<Partial<User>[] | null>;
  findUserById(id: string): Promise<Partial<User> | null>;
  findByIdAndDelete(id:string):Promise<boolean>;
}
