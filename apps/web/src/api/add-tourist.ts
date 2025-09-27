import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "public", "tourist.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const tourists = JSON.parse(data);
  res.status(200).json(tourists);
}
