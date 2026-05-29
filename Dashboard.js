const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Read all news files
function getNewsFiles() {
  const files = fs.readdirSync(".").filter(f => f.startsWith("news_") && f.endsWith(".txt"));
  const news = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const parts = file.replace(".txt", "").split("_");
    const topic = parts[1];
    const date = parts[2];
    news.push({ topic, date, content, file });
  }

  // Sort by date newest first
  return news.sort((a, b) => b.date.localeCompare(a.date));
}

// Dashboard route
app.get("/", (req, res) => {
  const news = getNewsFiles();

  const cards = news.map(n => `
    <div class="card">
      <div class="card-header">
        <span class="topic">${n.topic.toUpperCase()}</span>
        <span class="date">${n.date}</span>
      </div>
      <div class="content">${n.content.replace(/\n/g, "<br>")}</div>
    </div>
  `).join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>News Agent Dashboard</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          background: #0f0f0f;
          color: #e0e0e0;
          min-height: 100vh;
        }

        header {
          background: #1a1a1a;
          padding: 20px 40px;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        header h1 {
          font-size: 24px;
          color: #ffffff;
        }

        header span {
          font-size: 13px;
          color: #888;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 20px;
          padding: 30px 40px;
        }

        .card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: #444;
        }

        .card-header {
          background: #222;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2a2a2a;
        }

        .topic {
          font-weight: 700;
          font-size: 13px;
          color: #4da6ff;
          letter-spacing: 1px;
        }

        .date {
          font-size: 12px;
          color: #666;
        }

        .content {
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #ccc;
          max-height: 300px;
          overflow-y: auto;
        }

        .content::-webkit-scrollbar {
          width: 4px;
        }

        .content::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        .empty {
          text-align: center;
          padding: 80px;
          color: #555;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>📰 News Agent</h1>
        <span>Auto-refreshes every 60 seconds</span>
      </header>

      <div class="grid">
        ${cards.length > 0 ? cards : '<div class="empty">No news yet. Run node index.js first.</div>'}
      </div>

      <script>
        setTimeout(() => location.reload(), 60000);
      </script>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🌐 Dashboard running at http://localhost:${PORT}`);
});