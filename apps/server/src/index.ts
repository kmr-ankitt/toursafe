import express from 'express';
import dotenv from 'dotenv';
import prisma from './client'; 

dotenv.config(); 

const app = express();
app.use(express.json());


async function testDBConnection() {
  try {
    await prisma.$connect(); 
    console.log(' Database connected successfully!');
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
}


testDBConnection();




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
