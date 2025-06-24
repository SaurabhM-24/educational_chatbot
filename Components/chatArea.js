// components/chatArea.js

// --- DOM ELEMENTS ---
const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// --- HELPER FUNCTIONS ---

/**
 * Scrolls the chat area to the very bottom.
 */
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

/**
 * Adds a user's message bubble to the chat area.
 * @param {string} message - The message content from the user.
 */
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-end mb-4';
    messageElement.innerHTML = `
        <div class="bg-blue-500 text-white p-3 rounded-lg shadow-sm max-w-xl">
            <p>${message}</p>
        </div>
    `;
    chatArea.appendChild(messageElement);
    scrollToBottom();
}

/**
 * Adds a bot's message bubble to the chat area.
 * Can also show a "typing" indicator.
 * @param {string} message - The message content from the bot.
 * @param {boolean} [isTyping=false] - If true, shows a typing indicator instead of a message.
 */
function addBotMessage(message, isTyping = false) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex items-start gap-3 mb-4 bot-message'; // Added .bot-message for easy selection
    if (isTyping) {
        messageElement.innerHTML = `
            <div class="bg-blue-500 text-white p-1 rounded-full"><box-icon name='bot' color='white'></box-icon></div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <div class="typing-indicator">
                    <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </div>
            </div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="bg-blue-500 text-white p-1 rounded-full"><box-icon name='bot' color='white'></box-icon></div>
            <div class="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm max-w-xl">
                <p>${message}</p>
            </div>
        `;
    }
    chatArea.appendChild(messageElement);
    scrollToBottom();
    return messageElement; // Return the element so we can remove it later if needed
}

/**
 * Handles the logic of sending a message.
 */
function handleSendMessage() {
    const message = userInput.value.trim();
    if (message === '') return; // Don't send empty messages

    addUserMessage(message);
    userInput.value = ''; // Clear the input field
    userInput.style.height = 'auto'; // Reset height after sending

    // Simulate bot response
    const typingIndicator = addBotMessage('', true); // Show typing indicator
    
    setTimeout(() => {
        // Remove the typing indicator
        typingIndicator.remove();
        // Add the actual bot message
        addBotMessage("This is a simulated response to: '" + message + "'");
    }, 1500); // Simulate a 1.5-second delay for the API call
}

// --- MAIN INITIALIZATION FUNCTION ---
export function initializeChatArea() {
    sendButton.addEventListener('click', handleSendMessage);

    userInput.addEventListener('keydown', (e) => {
        // Send message on Enter, but allow new lines with Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            handleSendMessage();
        }
    });

    // Auto-resize the textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = (userInput.scrollHeight) + 'px';
    });
}
