const loadingDiv = document.getElementById('loading');
const summaryListDiv = document.getElementById('summary-list');
const errorMessageDiv = document.getElementById('error-message');
const summaryContainer = document.getElementById('summary-container');

function displayLoading() {
    loadingDiv.style.display = 'block';
    summaryContainer.style.display = 'none';
    errorMessageDiv.style.display = 'none';
    summaryListDiv.innerHTML = "";
}

function displaySummary(summary) {
    loadingDiv.style.display = 'none';
    summaryContainer.style.display = 'block';
    errorMessageDiv.style.display = 'none';
    summaryListDiv.innerHTML = ""; // Clear existing content

    console.log("Raw Summary from API:", summary); // Debugging log: Raw summary

    // Refined parsing for single topic and description - more flexible whitespace handling
    const parts = summary.split(/Main Topic:\s*([\s\S]+?)\nDetailed Description:\s*([\s\S]+)/);

    if (parts.length >= 3) {
        let mainTopicTitle = parts[1];
        let detailedDescription = parts[2];

        if (mainTopicTitle && detailedDescription) {
            mainTopicTitle = mainTopicTitle.trim();
            detailedDescription = detailedDescription.trim();

            const topicItem = document.createElement('div');
            topicItem.classList.add('topic-item');

            const titleElement = document.createElement('h3');
            titleElement.classList.add('topic-title');
            // Make "Main Topic: " part bold, and topic title normal (example keyword styling)
            titleElement.innerHTML = `<b>Main Topic:</b> <span class="keyword">${mainTopicTitle}</span>`; // Using innerHTML and keyword class

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('topic-description');
            descriptionElement.textContent = detailedDescription;

            topicItem.appendChild(titleElement);
            topicItem.appendChild(descriptionElement);
            summaryListDiv.appendChild(topicItem);
        
        } else {
            console.warn("Warning: Topic title or description is missing after parsing.");
            summaryListDiv.textContent = "Warning: Incomplete summary from API. Raw summary:\n" + summary; // Show warning in UI
        }

    } else {
        // Parsing failed, display raw summary or error
        summaryListDiv.textContent = "Error parsing summary. Raw summary:\n" + summary;
    }
}


function displayError(message) {
    loadingDiv.style.display = 'none';
    summaryContainer.style.display = 'none';
    errorMessageDiv.style.display = 'block';
    errorMessageDiv.textContent = message;
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "startSummary") {
            displayLoading();
        } else if (request.action === "displaySummary") {
            if (request.summary.startsWith("Error") || request.summary.startsWith("Failed")) {
                displayError(request.summary);
            } else {
                displaySummary(request.summary);
            }
        }
    }
);

displayLoading();