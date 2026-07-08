import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Serve the static React build files
app.use(express.static(path.join(__dirname, 'dist')));

// Backend Cache: Store data in memory so we only scrape once per day
let scrapedDataCache = null;
let lastScrapeTime = null;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Helper to fetch and parse a specific CSV
async function fetchGameData(url, numberCount) {
  try {
    const res = await axios.get(url);
    const lines = res.data.split('\n').map(l => l.trim()).filter(l => l);
    const draws = [];
    
    // Most recent draw is at index 1 (after the header). Let's grab the last 10 draws.
    for (let i = 1; i <= 10 && i < lines.length; i++) {
      // Split by comma. Some dates might have quotes, but the numbers will still strictly map to indices 1 -> numberCount
      const parts = lines[i].split(',');
      const numbers = [];
      for (let j = 1; j <= numberCount; j++) {
        const num = parseInt(parts[j].replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num)) {
          numbers.push(num);
        }
      }
      if (numbers.length === numberCount) {
        draws.push(numbers);
      }
    }
    return draws;
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
    return [];
  }
}

app.get('/api/history', async (req, res) => {
  const now = Date.now();
  
  if (scrapedDataCache && lastScrapeTime && (now - lastScrapeTime < CACHE_DURATION_MS)) {
    console.log("Serving CSV history from server cache.");
    return res.json(scrapedDataCache);
  }

  console.log("Cache expired or empty. Downloading live CSVs from Louisiana Lottery...");
  
  try {
    // Fetch all official CSV files simultaneously
    const [pick3, pick4, pick5, lotto, powerball, megaMillions] = await Promise.all([
      fetchGameData('https://louisianalottery.com/csv/pick-3.csv', 3),
      fetchGameData('https://louisianalottery.com/csv/pick-4.csv', 4),
      fetchGameData('https://louisianalottery.com/csv/pick-5.csv', 5),
      fetchGameData('https://louisianalottery.com/csv/lotto.csv', 6),
      fetchGameData('https://louisianalottery.com/csv/powerball.csv', 6),
      fetchGameData('https://louisianalottery.com/csv/mega-millions.csv', 6)
    ]);

    scrapedDataCache = {
      timestamp: now,
      pick3,
      pick4,
      pick5,
      lotto,
      powerball,
      megaMillions
    };
    lastScrapeTime = now;

    res.json(scrapedDataCache);
  } catch (error) {
    console.error("Error processing CSVs:", error.message);
    res.status(500).json({ error: "Failed to process CSV data." });
  }
});

// Serve the React frontend for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`CSV Extrapolation API Server running on port ${PORT}`);
});
