import type { NextApiRequest, NextApiResponse } from "next";

let trips: any[] = []; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(trips);
  } else if (req.method === "POST") {
    const tourist = req.body;
    trips.push(tourist);
    res.status(201).json({ message: "Tourist added", tourist });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
