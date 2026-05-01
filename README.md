# PRACC Auto-Request Pro

This browser extension automates the process of finding and requesting scrims on [PRACC.com](https://pracc.com) for Valorant teams. It filters available teams based on your specific rank and map requirements and handles the "Make Offer" process automatically.

---

## 📥 Installation (Edge & Chrome)

To use this tool, you must install it as an "unpacked" extension in your browser.

### 1. Download the Extension
*   Go to the **Releases** page of this repository.
*   Download the latest `pracc-valorant-request-bot-main.zip` file.
*   Extract the ZIP file to a folder on your computer (e.g., your Desktop).

### 2. Load into your Browser
*   Open your browser and navigate to the extensions page:
    *   **Edge**: `edge://extensions`
    *   **Chrome**: `chrome://extensions`
*   Switch **Developer Mode** (usually in the top-right corner) to **ON**.
*   Click the **Load unpacked** button.
*   Open the folder you just extracted and select the folder inside (ensure you select the folder that directly contains the `manifest.json` file).

---

## 🚀 How to Use

1.  **Navigate**: Go to [pracc.com/search](https://pracc.com/search).
2.  **Open Panel**: Click the **AUTO REQUEST** tab in the bottom-right corner of the page.
3.  **Set Filters**: Choose your **Minimum Rank** and check the **Maps** your team plays.
4.  **Set Delay**: Keep the delay at **2–3 seconds** to avoid being rate-limited by the site.
5.  **Start**: Click **START AUTO-REQUEST**.

The bot will scan visible team cards and automatically send offers to matching teams.

---

## 📁 Files Included
*   `manifest.json`: Configuration for the browser.
*   `content.js`: Main logic for scanning and clicking.
*   `panel.html` & `panel.css`: Interface design and styling.

---

## ⚠️ Important Notes
*   **Visibility**: The bot only scans teams currently visible on your page. Scroll down to load more teams before running.
*   **Rate Limiting**: Do not set the delay too low; 2 seconds is the recommended minimum for safety.
*   **Stability**: If PRACC updates their website layout, this bot may require an update to its selectors.
