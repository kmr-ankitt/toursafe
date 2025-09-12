import { Request, Response } from "express";
import prisma from "../prismaClient/client";
import { encrypt, decrypt } from "../auth/encrypt-decrypt";

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

export async function loginTourist(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find tourist by email
    const tourist = await prisma.tourist.findUnique({
      where: { email },
    });

    if (!tourist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password using decrypt function
    const isPasswordValid = await decrypt(password, tourist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove password from response
    const { password: _, ...touristData } = tourist;

    res.status(200).json({
      message: "Login successful",
      tourist: touristData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
}
