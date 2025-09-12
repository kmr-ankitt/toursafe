import { Router } from 'express';
import { createTourist, getTourists } from '../controllers/touristController';

const touristRouter = Router();

touristRouter.get('/', getTourists);
touristRouter.post('/register-tourist', createTourist); 

export default touristRouter;