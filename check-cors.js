import axios from 'axios';

async function checkCORS() {
  try {
    const res = await axios.head('https://louisianalottery.com/csv/pick-3.csv');
    console.log("Headers:", res.headers);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

checkCORS();
