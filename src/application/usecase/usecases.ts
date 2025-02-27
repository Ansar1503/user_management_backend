import { UserRepo } from "../user.repository";
import {  signinUserDTO, userDTO, UserQuery } from "../user.dto";
import { User } from "../../domain/user.entity";

export class UserUseCases {
  constructor(private userRepository: UserRepo) {}
  async signIn(data: signinUserDTO): Promise<User | null> {
    return await this.userRepository.findUserbyMail(data.email);
  }
  async signUp(data: userDTO): Promise<User> {
    return await this.userRepository.createUser(data);
  }
  async findUserbyMail(mail: string): Promise<User | null> {
    return await this.userRepository.findUserbyMail(mail);
  }
  async findUserById(id: string): Promise<Partial<User> | null> {
    return await this.userRepository.findUserById(id);
  }
  async updateProfile(data: Partial<User>): Promise<User | null> {
    return await this.userRepository.updateUser(data);
  }
  async findAllUser(query: UserQuery): Promise<Partial<User>[] | null> {
    return await this.userRepository.findAllUser(query)
  }
  async deleteUser(id:string):Promise<boolean>{
    return await this.userRepository.findByIdAndDelete(id)
  }
  async createUser(data:userDTO):Promise<Partial<User>>{
    return await this.userRepository.createUser(data)
  }
}
