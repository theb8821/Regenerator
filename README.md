# Louisiana Lottery Generator (Smart Extrapolation Edition)

A beautifully designed, full-stack React application built to generate highly secure and algorithmically extrapolated lottery numbers. 

## Features
* **Crypto-Secure Generation:** Uses the Web Crypto API and rejection sampling to generate numbers with mathematically proven zero modulo bias.
* **Smart Extrapolation (Live Data):** A custom Node.js Express backend directly downloads and parses the latest static CSV results from the official Louisiana Lottery servers. The app uses this history to algorithmically construct "Smart" guesses based on historical trends (Mirror rundowns, Delta patterns, Hot/Cold bounds).
* **Smart Caching:** The backend caches scraped data for 24 hours in memory, massively reducing server load and guaranteeing instant API responses for users.
* **Premium UI:** A high-fidelity, glowing dark-mode interface built with Vanilla CSS Grid.

## How to Run Locally

This is a Full-Stack application.

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Backend Server (Port 3001):**
   ```bash
   node server.js
   ```

3. **Start the Frontend UI (Port 5173):**
   *(In a new terminal window)*
   ```bash
   npm run dev
   ```

## Deployment
For production deployment, the backend is already configured to serve the frontend!
1. Build the frontend: `npm run build`
2. Start the server: `node server.js`
The server will expose the API and serve the built React files simultaneously on port 3001.
