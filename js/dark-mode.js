document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.theme-toggle__icon-sun');
    const moonIcon = document.querySelector('.theme-toggle__icon-moon');

    // Função para atualizar os ícones
    const updateThemeIcons = (isDarkMode) => {
        if (isDarkMode) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    };

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        const isDarkMode = theme === 'dark';
        body.classList.toggle('dark-mode', isDarkMode);
        updateThemeIcons(isDarkMode);
    };

    // Verifica a preferência do sistema
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
    
    applyTheme(savedTheme);

    // Adiciona o evento de clique no botão
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Ouve mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
});