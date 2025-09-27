import { Router } from 'express';
import { createTourist, getTourists, loginTourist } from '../controllers/touristController';

const touristRouter = Router();

touristRouter.get('/', getTourists);
touristRouter.post("/register", createTourist);
touristRouter.post("/login", loginTourist);

export default touristRouter;