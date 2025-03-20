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
    summaryListDiv.innerHTML = "";

    console.log("Raw Summary from API:", summary); // Debugging log: Raw summary

    // Parsing for Markdown bold labels and more flexible whitespace
    const parts = summary.split(/\*\*Main Topic:\*\*\s*([\s\S]+?)\*\*Detailed Description:\*\*\s*([\s\S]+)/);
    // Regular expression explanation (Markdown and whitespace robust):
    ///\*\*Main Topic:\*\*\s*([\s\S]+?)\*\*Detailed Description:\*\*\s*([\s\S]+)/
    // \*\*Main Topic:\*\*     Matches "**Main Topic:**" literally (Markdown bold).
    // \s*                   Matches zero or more whitespace characters.
    // ([\s\S]+?)            Captures the topic title (any character, one or more times, non-greedy). (Group 1)
    // \*\*Detailed Description:\*\* Matches "**Detailed Description:**" literally (Markdown bold).
    // \s*                   Matches zero or more whitespace characters.
    // ([\s\S]+)             Captures the description (any character, one or more times, greedy). (Group 2)


    console.log("Parsed parts array:", parts); // Debugging log: Parsed parts array
    console.log("Parts array length:", parts.length); // Debugging log: Parts array length


    if (parts.length >= 3) { // Check if split produced at least 3 parts (whole match, topic, description)
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
        // Parsing failed, display raw summary - display raw summary even if parsing fails, as content is present
        summaryListDiv.textContent = "Warning: Summary format might not be perfectly parsed. Raw summary:\n" + summary; // More informative warning
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