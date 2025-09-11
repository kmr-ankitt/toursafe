import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
    
      const { name, phn_no, email, dob, gender, public_key } = req.body;
      
      const backendRes = await fetch('http://localhost:3001/api/add-tourist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phn_no, email, dob, gender, public_key })
      });
      const result = await backendRes.json();
      res.status(backendRes.status).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add tourist' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
