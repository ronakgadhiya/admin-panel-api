import { Router } from 'express';
import * as UserController from '../Controllers/UserController';
const router: Router = Router()


//fetch all users
router.get('/fetchalluser',UserController.FetchAllUser);

//fetch user By Id
router.get('/fetchuserbyid/:userId',UserController.FetchUserById)

export const UserRoute = router