import { Router } from 'express'
import * as UserController from '../Controllers/UserController'
const router: Router = Router()

//create User
router.post('/register',UserController.CreateUser)

export const AuthRoute = router