import express from 'express'
import { Admincontroller } from '../../controllers/Admin.controller'
import { authentication } from '../middlewares/Authentication'

const adminRoute = express.Router()
const adminController = new Admincontroller()

adminRoute.get('/getUsers',authentication,adminController.getUsers)
adminRoute.patch('/getUserDetails',authentication,adminController.getUserDetails)
adminRoute.patch('/upateUserDetails',authentication,adminController.updateUserDetails)
adminRoute.delete('/deleteUser/:id',authentication,adminController.deleteUser)
adminRoute.post('/createUser',authentication,adminController.createUser)

export default adminRoute