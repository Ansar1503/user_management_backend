import { Response } from "express";
import { sendResponse } from "../../shared/response";
import { HTTP_STATUS_CODES } from "../../shared/statuscodes";
import { MongoUserRepo } from "../../infrastructure/repository/mongo.repository";
import { UserUseCases } from "../../application/usecase/usecases";

const userRepository = new MongoUserRepo();
const usecaseUser = new UserUseCases(userRepository);

export class Admincontroller {
  async getUsers(req: any, res: Response) {
    try {
      const users = await usecaseUser.findAllUser(req.query);

      if (!users || users.length === 0) {
        return sendResponse(
          res,
          HTTP_STATUS_CODES.NOT_FOUND,
          null,
          "No users found"
        );
      }

      return sendResponse(
        res,
        HTTP_STATUS_CODES.ok,
        users,
        "Users found successfully"
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      return sendResponse(
        res,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        null,
        "Error fetching users"
      );
    }
  }

  async getUserDetails(req: any, res: Response) {
    // console.log('req.bod',req.body)
    const user = await usecaseUser.findUserById(req.body.id);
    if (!user) {
      sendResponse(res, HTTP_STATUS_CODES.NOT_FOUND, null, "no user found");
      return;
    }
    sendResponse(res, HTTP_STATUS_CODES.ok, user, "user found");
  }
  async updateUserDetails(req: any, res: Response) {
    // console.log("user", req.body);
    const updateduser = await usecaseUser.updateProfile(req.body);
    if (!updateduser) {
      sendResponse(res, HTTP_STATUS_CODES.NOT_FOUND, null, "no user found");
      return;
    }
    sendResponse(
      res,
      HTTP_STATUS_CODES.ok,
      updateduser,
      "user details updated successfull"
    );
  }
  
  async deleteUser(req:any,res:Response){
    const dlete = await usecaseUser.deleteUser(req.params.id)
    
    
    if(dlete){
     const users = await usecaseUser.findAllUser({role:'',searchQuery:'',sortBy:'fname',sortOrder:"asc",status:'',limit:1,page:10})
      sendResponse(res,HTTP_STATUS_CODES.ok,users,'user deleted')
      return  
    }
    sendResponse(res,HTTP_STATUS_CODES.BAD_REQUEST,null,"user delet unsuccessfull")
  }

  async createUser(req:any,res:Response){
    const user = await usecaseUser.findUserbyMail(req.body.email)
    if(user){
      return sendResponse(res,HTTP_STATUS_CODES.BAD_REQUEST,user,'email already exist')
    }
    const newUser = await usecaseUser.createUser(req.body)
    // console.log(newUser)

    return sendResponse(res,HTTP_STATUS_CODES.ok,newUser,'user created successfully')
  }
}
