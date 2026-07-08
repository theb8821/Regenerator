// Helper to get a cryptographically secure random integer between min and max (inclusive)
// Uses rejection sampling to ensure zero modulo bias
function getCryptoRandomInt(min, max) {
  const range = max - min + 1;
  const max_valid = Math.floor(4294967296 / range) * range;
  const array = new Uint32Array(1);
  let random_num;
  
  do {
    window.crypto.getRandomValues(array);
    random_num = array[0];
  } while (random_num >= max_valid);
  
  return min + (random_num % range);
}

// Generate multiple unique numbers in a range
function generateUniqueNumbers(count, min, max) {
  const nums = new Set();
  while (nums.size < count) {
    nums.add(getCryptoRandomInt(min, max));
  }
  // Sort numerically ascending
  return Array.from(nums).sort((a, b) => a - b);
}

// Generators for specific games
export const generatePick = (count) => {
  const nums = Array.from({ length: count }, () => getCryptoRandomInt(0, 9));
  return nums.join(' - ');
};

export const generateLotto = () => {
  // Louisiana Lotto: 6 distinct numbers from 1 to 42
  const nums = generateUniqueNumbers(6, 1, 42);
  return nums.map(n => n.toString().padStart(2, '0')).join(' - ');
};

export const generatePowerball = () => {
  // Powerball: 5 distinct from 1-69 and 1 PB from 1-26
  const mainNums = generateUniqueNumbers(5, 1, 69);
  const pb = getCryptoRandomInt(1, 26);
  return `${mainNums.map(n => n.toString().padStart(2, '0')).join(' - ')}\nPB: ${pb.toString().padStart(2, '0')}`;
};

export const generateMegaMillions = () => {
  // Mega Millions: 5 distinct from 1-70 and 1 MB from 1-25
  const mainNums = generateUniqueNumbers(5, 1, 70);
  const mb = getCryptoRandomInt(1, 25);
  return `${mainNums.map(n => n.toString().padStart(2, '0')).join(' - ')}\nMB: ${mb.toString().padStart(2, '0')}`;
};
