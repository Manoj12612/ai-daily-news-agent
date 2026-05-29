require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

// Ollama - no API key needed
async function askOllama(prompt) {
  const response = await axios.post("http://localhost:11434/api/chat", {
    model: "llama3.2",
    messages: [{ role: "user", content: prompt }],
    stream: false,
  });
  return response.data.message.content;
}

// Fetch News
async function fetchNews(topic) {
  const url = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&pageSize=5&apiKey=${process.env.NEWS_KEY}`;
  const response = await axios.get(url);
  const articles = response.data.articles;

  let newsText = "";
  for (const article of articles) {
    newsText += `- ${article.title}: ${article.description}\n`;
  }
  return newsText;
}

// Summarize with Ollama
async function summarizeNews(rawNews, topic) {
  const prompt = `Summarize these ${topic} news into a clean daily briefing:\n\n${rawNews}`;
  return await askOllama(prompt);
}

// Save Report
function saveReport(summary, topic) {
  const date = new Date().toISOString().split("T")[0];
  const filename = `news_${topic}_${date}.txt`;
  fs.writeFileSync(filename, summary);
  console.log(`\n✅ Saved: ${filename}`);
  console.log("\n📰 Summary:\n", summary);
}
// ✅ NEW: Send to Telegram
async function sendToTelegram(message) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await axios.post(url, {
    chat_id: chatId,
    text: message,
  });

  console.log(`📱 Sent to Telegram`);
}
// Run Agent
// ✅ NEW: Run for multiple topics
async function runAgent() {
  const topics = ["technology", "AI","sports", "finance", "health"]; // add or remove any

  for (const topic of topics) {
    console.log(`\n🔍 Fetching ${topic} news...`);
    const raw = await fetchNews(topic);
    console.log(`🤖 Summarizing ${topic}...`);
    const summary = await summarizeNews(raw, topic);
    saveReport(summary, topic);

    const message=`📰 *${topic.toUpperCase()} NEWS*\n\n${summary}`;
    await sendToTelegram(message);
  }

  console.log("\n🎉 All topics done!");
}

runAgent("technology");