import { Router } from 'express';
import { createTourist, getTouristCode, getTourists, loginTourist } from '../controllers/touristController';

const touristRouter = Router();

touristRouter.get('/', getTourists);
touristRouter.post("/register", createTourist);
touristRouter.post("/login", loginTourist);
touristRouter.get("/code", getTouristCode);

export default touristRouter;