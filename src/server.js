import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Tevzi sistemi API'sine hoş geldiniz!" });
});

app.get('/personnel', async (req, res) => {
  try {
    const personnel = await prisma.personnel.findMany({
      include: { assignments: true },
    });
    res.json(personnel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
