import { Request, Response } from "express";
import prisma from "../prismaClient/client";
import { encrypt } from "../auth/encrypt-decrypt";

export async function getTourists(req: Request, res: Response) {
  try {
    const tourists = await prisma.tourist.findMany();
    res.status(200).json(tourists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

export async function createTourist(req: Request, res: Response) {
  // use bcrypt

  console.log("Get Password", req.body);

  try {
    const {
      public_key,
      code,
      name,
      phn_no,
      email,
      dob,
      gender,
      aadhar_no,
      password,
    } = req.body;

    const hashedPassword = await encrypt(password); // encrypt the password

    const newTourist = await prisma.tourist.create({
      data: {
        public_key,
        code,
        name,
        phn_no,
        email,
        dob: dob ? new Date(dob) : undefined,
        gender,
        aadhar_no,
        password: hashedPassword, // store the hashed password
      },
    });

    res.status(201).json(newTourist);
  } catch (error) {
    res.status(500).json({ message: "Error creating tourist", error });
  }
}
