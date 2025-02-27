import {  SortOrder } from "mongoose";
import { userDTO, signinUserDTO, UserQuery } from "../../application/user.dto";
import { UserRepo } from "../../application/user.repository";
import { User } from "../../domain/user.entity";
import userModel from "../database/model/user.model";


export class MongoUserRepo implements UserRepo {
  async createUser(data: userDTO): Promise<User> {
    const user = new userModel({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role,

    });
    return await user.save();
  }

  async findUserbyMail(mail: string): Promise<User | null> {
    return await userModel.findOne({ email: mail });
  }

  async updateUser(data: Partial<User>): Promise<User | null> {
    // console.log('entereeed................')
    let user;
    if (data.id) user = await userModel.findOne({ _id: data.id });
    else user = await userModel.findOne({ email: data.email });
    if (!user) return null;
    user = await userModel.findOneAndUpdate(
      { email: data.email },
      {
        $set: {
          fname: data.fname || user.fname,
          lname: data.lname || user.lname,
          email: data.email || user.email,
          designation: data.designation || user.designation,
          phone: data.phone || user.phone,
          address: data.address || user.address,
          companyName: data.companyName || user.companyName,
          dateOfBirth: data.dateOfBirth || user.dateOfBirth,
          imageUrl: data.imageUrl || user.imageUrl,
          isBlocked:
            typeof data.isBlocked === "boolean"
              ? data.isBlocked
              : user.isBlocked,
          role:data.role || user.role
        },
      },
      { upsert: true, new: true }
    );
    return user;
  }

  async findAllUser(query: UserQuery): Promise<Partial<User>[] | null> {
    const { role, status, searchQuery, sortBy, sortOrder ,page ,limit } = query;
   

    let filter: any = { };

    if (role && role !== "all") {
      filter.role = role;
    }

    if (status && status !== "all") {
      filter.isBlocked = status === "Inactive";
    }

    if (searchQuery) {
      filter.$or = [
        { fname: { $regex: searchQuery, $options: "i" } },
        { lname: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const sortOrderValue: SortOrder = sortOrder === "desc" ? -1 : 1;
    const sortQuery: Record<string, SortOrder> = { [sortBy]: sortOrderValue };
   
    const users = await userModel
      .find(filter)
      .select("-password")
      .sort(sortQuery)
      .lean();

    return users.length > 0 ? users : null;
  }

  async findUserById(id: string): Promise<Partial<User> | null> {
    const user = await userModel.findOne({ _id: id }).select("-password");
    return user ? user : null;
  }
  async findByIdAndDelete(id: string): Promise<boolean> {
    try {
      const user = await userModel.findByIdAndDelete(id);
      return !!user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}
