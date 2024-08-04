import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LoginUserValidation, UserValidation } from './auth.zod';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/register',validateRequest(UserValidation),AuthController.createUser)
router.post('/login',validateRequest(LoginUserValidation),AuthController.loginUser)
router.get('/users',auth(),AuthController.getAllUser)
router.post('/create-admin',AuthController.createAdmin)





export const AuthRoutes  = router