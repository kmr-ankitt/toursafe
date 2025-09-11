import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', getUsers);

export default userRouter;