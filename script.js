// script.js

import { initializeHistoryPane } from './components/historyPane.js';
import { initializeChatArea } from './Components/chatArea.js';
import { initializeSuggestions } from './Components/promptSuggestions.js';
import { initializeToggles } from './Components/uiToggles.js'; // NEW

document.addEventListener('DOMContentLoaded', () => {
    initializeHistoryPane();
    initializeChatArea();
    initializeSuggestions();
    initializeToggles(); // NEW
});
