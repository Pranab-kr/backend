import express from "express";

const app = express();
const PORT = 8000;

const DIARY = {};
const EMAIL = new Set();

app.use(express.json());

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (EMAIL.has(email)) {
    return res.status(400).json({ error: "Email already taken" });
  }

  const token = `${Date.now()}`;

  DIARY[token] = { name, email, password };
  EMAIL.add(email);

  return res.status(201).json({ Status: "success", token });
});

app.post("/me", (req, res) => {
  const { token } = req.body;
  console.log(DIARY);
  if (!token) return res.status(400).json({ error: "Missing Token" });

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invalied Token" });
  }
  const entry = DIARY[token];

  return res.json({ data: entry });
});

app.post("/private-data", (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Missing Token" });

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invalied Token" });
  }
  const entry = DIARY[token];

  return res.json({ privateData: "Access Granated"});
});

app.listen(PORT, () => console.log(`Seerver running on ${PORT}`));
