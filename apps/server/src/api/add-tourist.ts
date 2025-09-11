import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, phn_no, email, dob, gender, public_key } = req.body;
      const newTourist = await prisma.tourist.create({
        data: {
          name,
          phn_no,
          email,
          dob: dob ? new Date(dob) : undefined,
          gender,
          public_key,
        },
      });
      res.status(201).json(newTourist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add tourist' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
