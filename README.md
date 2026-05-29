# 📰 News Agent

An AI-powered news aggregator that fetches, summarizes, and delivers daily news to your Telegram — running fully local and free using Ollama.

---

## Features

- Fetches latest news by topic using NewsAPI
- Summarizes news using a local AI model (Ollama)
- Sends summaries to your Telegram
- Saves reports as `.txt` files
- Web dashboard to view all reports in browser
- Auto-runs daily via Windows Task Scheduler

---

## Tech Stack

- **Node.js** — runtime
- **Ollama** — local AI (free, no API key needed)
- **NewsAPI** — news source
- **Telegram Bot API** — delivery to phone
- **Express** — web dashboard

---

## Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- [Ollama](https://ollama.com) installed and running
- [NewsAPI](https://newsapi.org) free account
- [Telegram Bot](https://t.me/BotFather) created via BotFather

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/Manoj12612/ai-daily-news-agent.git
cd news-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Pull Ollama model

```bash
ollama pull llama3.2
```

### 4. Create `.env` file

```
NEWS_KEY=your_newsapi_key
TELEGRAM_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

> Never commit your `.env` file. It's already in `.gitignore`.

### 5. Get your Telegram Chat ID

- Start your bot on Telegram (send any message)
- Open this URL in browser:
```
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```
- Find `"chat": { "id": 123456789 }` — that's your Chat ID

---

## Usage

### Run the agent manually

```bash
node index.js
```

### Start the web dashboard

```bash
node dashboard.js
```

Open `http://localhost:3000` in your browser.

---

## Customize Topics

Edit this line in `index.js`:

```javascript
const topics = ["technology", "sports", "finance", "health"];
```

Add or remove any topics you want.

---

## Auto Run Daily (Windows)

1. Edit `run.bat` with your correct paths
2. Open **Task Scheduler**
3. Create Basic Task → Daily → select `run.bat`

The `run.bat` will:
- Start Ollama automatically
- Wait for it to load
- Run the news agent
- Start the dashboard

---

## Project Structure

```
news-agent/
├── index.js          # Main agent
├── dashboard.js      # Web dashboard
├── run.bat           # Auto-run script (Windows)
├── .env              # API keys (never commit)
├── .gitignore
└── package.json
```

---

## .gitignore

Make sure your `.gitignore` includes:

```
.env
node_modules/
news_*.txt
```

---

## Roadmap

- [ ] Telegram commands (`/tech`, `/sports` on demand)
- [ ] Email delivery
- [ ] Filter news by keywords
- [ ] Store history in database
- [ ] Deploy to cloud

---

## License

MIT
