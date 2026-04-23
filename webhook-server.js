import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("🔥 Webhook recibido:", req.body);

  const event = req.headers["x-github-event"];
  console.log("📦 Evento GitHub:", event);

  res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("Webhook OK");
});

app.listen(4000, () => {
  console.log("🚀 Webhook escuchando en puerto 4000");
});
