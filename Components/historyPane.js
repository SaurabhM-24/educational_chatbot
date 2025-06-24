// components/historyPane.js

// --- DATA ---
const historyData = [
    {
        id: 'folder-1',
        type: 'folder',
        name: 'Photosynthesis Explained',
        isOpen: true,
        chats: [
            { id: 'chat-1a', title: 'Introduction' },
            { id: 'chat-1b', title: 'Light-Dependent Reactions' },
            { id: 'chat-1c', title: 'Calvin Cycle' },
        ]
    },
    {
        id: 'folder-2',
        type: 'folder',
        name: 'History of Rome',
        isOpen: false,
        chats: [
            { id: 'chat-2a', title: 'The Roman Republic' },
            { id: 'chat-2b', title: 'The Roman Empire' },
        ]
    },
    {
        id: 'chat-3',
        type: 'chat',
        title: 'Quick Question about Gravity'
    }
];

// --- DOM ELEMENTS ---
const historyListContainer = document.getElementById('history-list-container');
// NEW: Get references to the buttons in the header
const newFolderBtn = document.getElementById('new-folder-btn');
const newChatBtn = document.getElementById('new-chat-btn');

let activeChatId = 'chat-1b';

// --- RENDER FUNCTION (No changes here) ---
function renderHistoryPane() {
    historyListContainer.innerHTML = '';
    historyData.forEach(item => {
        if (item.type === 'folder') {
            const folderElement = document.createElement('div');
            folderElement.className = 'mb-2';
            folderElement.innerHTML = `
                <button data-folder-id="${item.id}" class="w-full text-left font-semibold p-2 rounded-md flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span>📁 ${item.name}</span>
                    <box-icon name='chevron-down' class="${item.isOpen ? '' : '-rotate-90'} transition-transform"></box-icon>
                </button>
                <div class="pl-4 mt-1 space-y-1 ${item.isOpen ? 'block' : 'hidden'}">
                    ${item.chats.map(chat => `
                        <a href="#" data-chat-id="${chat.id}" class="block p-2 rounded-md ${chat.id === activeChatId ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}">
                            ${chat.title}
                        </a>
                    `).join('')}
                </div>
            `;
            historyListContainer.appendChild(folderElement);
        } else if (item.type === 'chat') {
            const chatElement = document.createElement('a');
            chatElement.href = '#';
            chatElement.dataset.chatId = item.id;
            chatElement.className = `block p-2 rounded-md ${item.id === activeChatId ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`;
            chatElement.textContent = item.title;
            historyListContainer.appendChild(chatElement);
        }
    });
}

// --- MAIN INITIALIZATION FUNCTION ---
export function initializeHistoryPane() {
    // Initial render
    renderHistoryPane();

    // Event listener for collapsing folders
    historyListContainer.addEventListener('click', (e) => {
        const folderButton = e.target.closest('button[data-folder-id]');
        if (folderButton) {
            const folderId = folderButton.dataset.folderId;
            const folder = historyData.find(f => f.id === folderId);
            if (folder) {
                folder.isOpen = !folder.isOpen;
                renderHistoryPane();
            }
        }
    });

    // NEW: Event listener for the "New Folder" button
    newFolderBtn.addEventListener('click', () => {
        const folderName = prompt("Enter a name for the new folder:");
        if (folderName && folderName.trim() !== '') {
            const newFolder = {
                id: `folder-${Date.now()}`, // Simple unique ID
                type: 'folder',
                name: folderName.trim(),
                isOpen: true,
                chats: [] // Starts with no chats
            };
            historyData.unshift(newFolder); // Add to the beginning of the array
            renderHistoryPane(); // Update the UI
        }
    });

    // NEW: Event listener for the "New Chat" button
    newChatBtn.addEventListener('click', () => {
        const newChat = {
            id: `chat-${Date.now()}`, // Simple unique ID
            type: 'chat',
            title: 'New Chat'
        };
        historyData.unshift(newChat); // Add to the beginning of the array
        activeChatId = newChat.id; // Make the new chat active
        renderHistoryPane(); // Update the UI
    });
}
