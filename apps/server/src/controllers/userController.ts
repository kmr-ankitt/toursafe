import { Request, Response } from 'express';
import prisma from '../prismaClient/client';

export async function getUsers(req: Request, res: Response) {
  try {
    // dummy
    console.log("route called")
    res.json({ message: "Hello Users" }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
}
