# PRACC Auto-Request Pro

This browser extension automates the process of finding and requesting scrims on [PRACC.com](https://pracc.com) for Valorant teams. It filters available teams based on your specific rank and map requirements and handles the "Make Offer" process automatically.

---

## 📥 Download and Installation

To use this tool, you must install it as an "unpacked" extension in your browser.

### 1. Download the Files
*   Click the green **Code** button at the top of this GitHub page.
*   Select **Download ZIP**.
*   Locate the downloaded `.zip` file on your computer and **Extract** it to a folder you can easily access (e.g., your Desktop).

### 2. Install in Edge or Chrome
*   Open your browser and navigate to the extensions page:
    *   **Edge**: Copy and paste `edge://extensions` into your address bar.
    *   **Chrome**: Copy and paste `chrome://extensions` into your address bar.
*   Find the **Developer Mode** toggle (usually in the top-right corner or left sidebar) and switch it **ON**.
*   Click the **Load unpacked** button that appears.
*   In the file picker, select the **folder** you extracted, and select the final folder inside containing all of the files

---

## 🚀 How to Use

1.  **Open the Site**: Go to [pracc.com/search](https://pracc.com/search).
2.  **Open the Panel**: Click the **AUTO REQUEST** tab in the bottom-right corner of the page to expand the settings.
3.  **Set Minimum Rank**: Choose the lowest average rank you want to play against (e.g., **Average Ascendant**).
4.  **Select Maps**: Check the boxes for the maps your team plays. The bot will only offer scrims to teams requesting at least one matching map.
5.  **Set Delay**: Set a delay (2–3 seconds is recommended) to keep the bot from clicking too fast and getting blocked.
6.  **Start Scan**: Click **START AUTO-REQUEST**.

The extension will scan all visible team cards and automatically click "Make Offer" for any that meet your criteria.

---

## 📁 Repository Structure

*   `manifest_2.json`: The extension configuration file.
*   `content_2.js`: The core logic for scanning pages and handling modals.
*   `panel_2.html`: The user interface for the settings panel.
*   `panel_2.css`: The visual styling for the interface.
*   `icon_2.png`: The extension's icon.

---

## ⚠️ Important Notes

*   **Visibility**: The bot only acts on teams **currently visible** on your screen. Scroll down to load more team cards before starting the scan.
*   **Stability**: If the site updates its layout, the bot may require updates to its button selectors to continue functioning.
*   **Safety**: Keep the delay at **2–3 seconds** to avoid being restricted by PRACC.
