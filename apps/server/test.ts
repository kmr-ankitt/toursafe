import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from './client'; 

dotenv.config(); 

const app = express();
app.use(express.json());  


async function testDBConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testDBConnection();


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET not found in .env');
  process.exit(1);
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/register-tourist-department', async (req: Request, res: Response) => {
  const { dept_id, tourist_id, name, region, phn_no, password } = req.body;

  if (!dept_id || !tourist_id || !name || !region || !phn_no || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.tourist_id_mapping.create({
      data: { dept_id, tourist_id, name, region, phn_no, password: hashedPassword }
    });

    res.json({ message: 'Tourist Department registered successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Tourist Department registration failed', details: err.message });
  }
});

app.post('/login-tourist', async (req: Request, res: Response) => {
  const { dept_id, tourist_id, password } = req.body;

  if (!dept_id || !tourist_id || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const mapping = await prisma.tourist_id_mapping.findUnique({
      where: { dept_id_tourist_id: { dept_id, tourist_id } }
    });

    if (!mapping) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, mapping.password!);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ tourist_id, dept_id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.post('/register-police', async (req: Request, res: Response) => {
  const { policeId, name, region, phn_no, password } = req.body;

  if (!policeId || !name || !region || !phn_no || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.police.create({
      data: { police_id: policeId, name, region, phn_no, password: hashedPassword }
    });

    res.json({ message: 'Police registered successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Police registration failed', details: err.message });
  }
});

app.post('/login-police', async (req: Request, res: Response) => {
  const { policeId, password } = req.body;

  if (!policeId || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const police = await prisma.police.findUnique({ where: { police_id: policeId } });
    if (!police) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, police.password!);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ policeId }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.get('/protected', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Access granted', user: req.user });
});

// Create Tourist (for testing)
app.post('/create-tourist', async (req: Request, res: Response) => {
  const { name, phn_no, email, private_key, public_key } = req.body;

  if (!name || !phn_no || !email || !private_key || !public_key) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const tourist = await prisma.tourist.create({
      data: {
        name,
        phn_no,
        email,
        private_key,
        public_key
      }
    });

    res.json({ message: 'Tourist created successfully', tourist });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Tourist creation failed', details: err.message });
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
