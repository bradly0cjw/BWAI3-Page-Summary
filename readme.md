# Gemini Summary Chrome Extension

## Description

The Gemini Summary Chrome Extension is a browser extension that provides concise summaries of web pages using the Google Gemini API (or a similar language model). When you click the extension icon in the Chrome toolbar, it opens a right-side panel displaying a summary of the currently active webpage. The summary is presented as a main topic with a detailed description, making it easy to quickly grasp the key information from any website.

This extension is built using Manifest V3 for Chrome Extensions and is designed to be user-friendly with a modern Material Design 3 inspired UI, including dark mode support.

## Features

*   **Web Page Summarization:**  Generates summaries of web page content using the Gemini API.
*   **Right-Side Panel Display:**  Presents summaries in a convenient side panel within the Chrome browser.
*   **Single Topic Summary:** Provides a summary focused on the main topic with a detailed description.
*   **Regenerate Summary:** Clicking the extension icon again regenerates a new summary for the current page.
*   **Material Design 3 Inspired UI:**  Modern and clean user interface.
*   **Dark Mode Support:** Automatically adapts to the user's system theme (light or dark mode).
*   **Keyword Styling:**  Highlights the "Main Topic" label for improved readability.

## Installation

To install and test this extension locally:

1.  **Download or clone the repository:**  Download the ZIP file of this repository or clone it using Git:
    ```bash
    git clone [repository-url]
    ```
2.  **Open Chrome Browser:** Open the Google Chrome browser.
3.  **Navigate to `chrome://extensions/`:**  Type this address in the Chrome address bar and press Enter.
4.  **Enable Developer Mode:**  Toggle the "Developer mode" switch to "ON" in the top right corner of the Extensions page.
5.  **Load unpacked:** Click the "Load unpacked" button in the top left corner.
6.  **Select extension directory:** In the file dialog, navigate to and select the directory of your `gemini-summary-extension` project folder.
7.  **Extension Installed:** The "Gemini Summary" extension should now be installed and visible in your Chrome toolbar.

## Usage

1.  **Browse to a webpage:** Open any website you want to summarize in your Chrome browser.
2.  **Click the Extension Icon:** Click the "Gemini Summary" extension icon in the Chrome toolbar.
3.  **Side Panel Opens:** A right-side panel will appear, displaying "Loading summary..." initially.
4.  **Summary Displayed:** After a moment, the side panel will display the summary of the webpage, presented as "Main Topic" and "Detailed Description".
5.  **Regenerate Summary (Optional):** To get a new summary, simply click the extension icon again.

## API Key Setup

**Important: You need to provide your own Google Gemini API key for this extension to work.**

1.  **Obtain a Gemini API Key:**
    *   Go to the [Google AI Studio](https://makersuite.google.com/) or [Google Cloud Console](https://console.cloud.google.com/) to obtain a Gemini API key.
    *   Make sure you have enabled the necessary Gemini API access.
2.  **Rename `config-example.js` to `config.js`:**
    *   In the root directory of your `gemini-summary-extension` project, create a new file named `config.js`.
    *   Open `config.js` and add the following line, replacing `'YOUR_GEMINI_API_KEY'` with your actual Gemini API key (keep the quotes):
        ```javascript
        // config.js
        const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
        ```
        **Replace `'YOUR_GEMINI_API_KEY'` with your *actual* Gemini API key.**


**Security Warning:**

**Never commit your actual API key in `config.js` (or any other file) to a public GitHub repository!** API keys are sensitive credentials.  If exposed, they can be misused.
