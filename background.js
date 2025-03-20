import { GEMINI_API_KEY } from './config.js'; // Import API Key from config.js

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'; // Example Gemini Pro endpoint

async function getCurrentTabContent() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (!tab) return null;

  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        return document.body.innerText;
      }
    });

    if (result && result[0] && result[0].result) {
      return result[0].result;
    } else {
      console.error("Could not extract text content from the page.");
      return null;
    }

  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
}


async function generateSummary(textContent) {
  if (!textContent) {
    return "Could not fetch page content to summarize.";
  }

  const requestBody = {
    "contents": [{
      "parts": [{
        "text": `Summarize the following text by identifying the main topic and providing a detailed description of that topic. Format the summary as:

Main Topic: [Main Topic Title]
Detailed Description: [Detailed Description of the main topic]

Text to summarize:
${textContent}`
      }]
    }]
  };

  console.log("Gemini API Request Body:", JSON.stringify(requestBody, null, 2)); // Log request body

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, { // Use GEMINI_API_KEY from global scope
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error("Gemini API HTTP Error:", response.status, response.statusText);
      throw new Error(`Gemini API error! status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Gemini API Raw Response:", JSON.stringify(data, null, 2)); // Log raw response

    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini API response structure unexpected:", data);
      return "Failed to extract summary from Gemini API response.";
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error generating summary. Please check console for details.";
  }
}


chrome.action.onClicked.addListener(async (tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
  chrome.runtime.sendMessage({ action: "startSummary" }); // Immediately show loading in popup

  const textContent = await getCurrentTabContent();
  const summary = await generateSummary(textContent);

  chrome.runtime.sendMessage({ action: "displaySummary", summary: summary });
});