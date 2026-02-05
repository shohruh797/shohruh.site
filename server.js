import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const app = express();
const PORT = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// API: projects
app.get("/api/projects", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "public", "data.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    res.json({
      ok: true,
      projects: data.projects,
      skills: data.skills
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "JSON o‘qilmadi" });
  }
});

// API: contact
app.post("/api/contact", async (req, res) => {
  const { name, message } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ ok: false, error: "Ism noto‘g‘ri" });
  }
  if (!message || message.length < 8) {
    return res.status(400).json({ ok: false, error: "Xabar qisqa" });
  }

  const log = {
    name,
    message,
    time: new Date().toISOString()
  };

  await fs.appendFile(
    "messages.jsonl",
    JSON.stringify(log) + "\n"
  );

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Backend ishlayapti: http://localhost:${PORT}`);
});
