import axios from 'axios';

async function fetchCSV(url) {
  try {
    const res = await axios.get(url);
    const lines = res.data.split('\n').map(l => l.trim()).filter(l => l);
    console.log("=== " + url + " ===");
    console.log("Total lines:", lines.length);
    console.log("First 2 lines:", lines.slice(0, 2));
    console.log("Last 2 lines:", lines.slice(-2));
  } catch (err) {
    console.log("FAIL:", url, err.message);
  }
}

async function run() {
  const urls = [
    'https://louisianalottery.com/csv/pick-4.csv',
    'https://louisianalottery.com/csv/pick-5.csv',
    'https://louisianalottery.com/csv/easy-5.csv'
  ];
  for (const url of urls) {
    await fetchCSV(url);
  }
}

run();
