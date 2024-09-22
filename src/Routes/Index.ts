import express from 'express'
import * as JWT from '../Helper/Core/JWT'
import { AuthRoute } from './AuthRoute'
import { UserRoute } from './UserRoute'


const router = express.Router()


//auth apiend point
router.use('/auth', AuthRoute)

//user apiend point
router.use('/user', JWT.verifyToken, UserRoute)



export default router