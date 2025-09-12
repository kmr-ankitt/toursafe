import { Router } from "express";
import {
  createTourist,
  getTourists,
  loginTourist,
} from "../controllers/touristController";

const touristRouter = Router();

touristRouter.get("/", getTourists);
touristRouter.post("/register-tourist", createTourist);
touristRouter.post("/login-tourist", loginTourist);

export default touristRouter;
