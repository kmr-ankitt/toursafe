import { Request, Response } from "express";
import prisma from "../prismaClient/client";
import { encrypt, decrypt, generatedPublicKey } from "../auth/encrypt-decrypt";

export async function getTourists(req: Request, res: Response) {
  try {
    const tourists = await prisma.tourist.findMany();
    res.status(200).json(tourists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tourists", error });
  }
}

export async function createTourist(req: Request, res: Response) {
  try {
    console.log("Get Password", req.body);

    const {
      code,
      name,
      phn_no,
      email,
      dob,
      gender,
      aadhar_no,
      password,
    } = req.body;

    // generate the public key
    const public_key_generated = await generatedPublicKey(req.body);

    // encrypt the password
    const hashedPassword = await encrypt(password);

    // create the tourist
    const newTourist = await prisma.tourist.create({
      data: {
        public_key: public_key_generated,
        code,
        name,
        phn_no,
        email,
        dob,
        gender,
        aadhar_no,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Tourist created successfully",
      status: 201,
      data: newTourist,
      public_key_generated: public_key_generated,
    });
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

  export async function getTouristCode(req: Request, res: Response) {
    const { public_key } = req.params;

    try {
      const tourist = await prisma.tourist.findFirst({
        where: { public_key },
        select: { code: true }
      });

      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }

      res.status(200).json({ code: tourist.code });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tourist code', error });
    }
  }

