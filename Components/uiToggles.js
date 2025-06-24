// components/uiToggles.js

// ✅ THE FIX: We moved the element selectors from the top level
// into the initialization function below.

/**
 * Applies the theme based on saved preference or system settings.
 */
function applyTheme() {
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
}

/**
 * Initializes all the UI toggle functionalities.
 */
export function initializeToggles() {
    // ✅ We now get the elements here, ensuring they exist.
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Set the initial theme as soon as the page loads
    applyTheme();

    // Add click listener for the theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        // Save the new preference to localStorage
        const isDarkMode = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}   
