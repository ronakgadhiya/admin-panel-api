import { Router } from 'express';
import * as UserController from '../Controllers/UserController';
const router: Router = Router()

//create User
router.post('/register', UserController.CreateUser);

//Login User
router.post('/login', UserController.UserLogin);


export const AuthRoute = router