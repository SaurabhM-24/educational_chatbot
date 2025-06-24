// components/promptSuggestions.js

// --- DOM ELEMENTS ---
const suggestionsPane = document.getElementById('suggestions-pane');
const userInput = document.getElementById('user-input');

/**
 * Sets up event listeners for the suggestions pane.
 */
export function initializeSuggestions() {
    // We use event delegation here. We listen for clicks on the parent
    // container, which is more efficient than adding a listener to every button.
    suggestionsPane.addEventListener('click', (e) => {
        // Find the button that was clicked, if any
        const suggestionButton = e.target.closest('button');

        // If a button was clicked...
        if (suggestionButton) {
            const suggestionText = suggestionButton.textContent;
            
            // Set the user input field's value to the suggestion text
            userInput.value = suggestionText;
            
            // Optional: Auto-resize the textarea in case the text is long
            userInput.style.height = 'auto';
            userInput.style.height = (userInput.scrollHeight) + 'px';

            // Focus the input field so the user can type or send immediately
            userInput.focus();
        }
    });
}
