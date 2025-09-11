import express from 'express';
import dotenv from 'dotenv';
import prisma from './prismaClient/client';
import touristRouter from './routes/touristRoutes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

/** Test database connection **/
async function testDBConnection() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully!');
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
}
testDBConnection();

/** Routes **/
app.use('/api/tourists', touristRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});