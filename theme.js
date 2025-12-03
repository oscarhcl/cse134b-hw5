(function() {
    'use strict';

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'theme-toggle';
    themeToggle.type = 'button';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');

    document.body.appendChild(themeToggle);

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeToggle.textContent = '☀️ Light Mode';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
})();
