import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Telegram message proxying to avoid CORS
  app.post("/api/telegram", async (req, res) => {
    const { message } = req.body;
    const BOT_TOKEN = '8836940446:AAG0RGsj0nB20Pq20NoXw3E5x2xuTNBC2kA';
    const CHAT_ID = '8800732143';

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data });
      }

      return res.json({ success: true, data });
    } catch (error: any) {
      console.error("Telegram error:", error);
      return res.status(500).json({ error: error.message || "Failed to send telegram message" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
