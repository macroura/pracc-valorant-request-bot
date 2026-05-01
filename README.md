# PRACC Auto-Request Pro

This browser extension automates the process of finding and requesting scrims on [PRACC.com](https://pracc.com) for Valorant teams[cite: 2, 5]. It filters available teams based on your specific rank and map requirements and handles the "Make Offer" process automatically[cite: 1, 5].

---

## 📥 Installation (Edge & Chrome)

To use this tool, you must install it as an "unpacked" extension in your browser[cite: 5].

### 1. Download the Extension
*   Go to the [Releases](https://github.com/YOUR_USERNAME/YOUR_REPO/releases) page of this repository.
*   Download the latest `pracc-valorant-request-bot-main.zip` file.
*   Extract the ZIP file to a folder on your computer (e.g., your Desktop)[cite: 5].

### 2. Load into your Browser
*   Open your browser and navigate to the extensions page:
    *   **Edge**: `edge://extensions`[cite: 5]
    *   **Chrome**: `chrome://extensions`[cite: 5]
*   Switch **Developer Mode** (top-right corner) to **ON**[cite: 5].
*   Click the **Load unpacked** button[cite: 5].
*   Select the folder you just extracted and select the folder inside of that (ensure you select the folder containing `manifest.json`)[cite: 2, 5].

---

## 🚀 How to Use

1.  **Navigate**: Go to [pracc.com/search](https://pracc.com/search)[cite: 5].
2.  **Open Panel**: Click the **AUTO REQUEST** tab in the bottom-right corner[cite: 5].
3.  **Set Filters**: Choose your **Minimum Rank** and check the **Maps** your team plays[cite: 3, 5].
4.  **Set Delay**: Keep the delay at **2–3 seconds** to avoid being rate-limited by the site[cite: 5].
5.  **Start**: Click **START AUTO-REQUEST**[cite: 3].

The bot will scan visible team cards and automatically send offers to matching teams[cite: 1, 5].

---

## 📁 Files Included
*   `manifest.json`: Configuration for the browser[cite: 2].
*   `content.js`: Main logic for scanning and clicking[cite: 1, 2].
*   `panel.html` & `panel.css`: Interface design and styling[cite: 3, 4].

---

## ⚠️ Important Notes
*   **Visibility**: The bot only scans teams currently visible on your page. Scroll down to load more teams before running[cite: 5].
*   **Rate Limiting**: Do not set the delay too low; 2 seconds is the recommended minimum for safety[cite: 5].
*   **Stability**: If PRACC updates their website layout, this bot may require an update to its selectors[cite: 5].
