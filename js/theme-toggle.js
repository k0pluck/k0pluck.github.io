/**
 * Theme Toggle Functionality
 * Handles light/dark mode switching with localStorage persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    setTheme(initialTheme);
    
    // Toggle theme on button click
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add subtle animation feedback
        themeToggle.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            themeToggle.classList.remove('animate__animated', 'animate__pulse');
        }, 500);
    });
    
    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    /**
     * Apply theme to document and update UI
     * @param {string} theme - 'light' or 'dark'
     */
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'light' 
                ? 'fas fa-moon' 
                : 'fas fa-sun';
        }
        
        // Dispatch custom event for other components to react
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    }
});