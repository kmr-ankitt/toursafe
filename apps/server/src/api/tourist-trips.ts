import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        tourist: true,
        location: true,
      },
    });

    const data = trips.map((trip: any) => ({
      touristName: trip.tourist?.name || 'N/A',
      tripStatus: trip.status || 'N/A',
      location: trip.location ? `${trip.location.latitude}, ${trip.location.longitude}` : 'N/A',
      startDate: trip.start_date ? new Date(trip.start_date).toISOString().split('T')[0] : 'N/A',
      endDate: trip.end_date ? new Date(trip.end_date).toISOString().split('T')[0] : 'N/A',
    }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
