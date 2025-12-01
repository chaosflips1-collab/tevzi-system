const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Tevzi API çalışıyor 🎉");
});

app.get("/personel", async (req, res) => {
  try {
    const data = await prisma.personel.findMany();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
