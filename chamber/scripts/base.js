// Theme toggle
const themteToggleBtn = document.querySelector('#theme-toggle');
const theme = localStorage.getItem('theme');

theme && document.body.classList.add(theme);

themteToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.querySelector('main').classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

//Hambuger menu
const hamburguer = document.querySelector('#hamburguer');
const nav = document.querySelector('nav');

hamburguer.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburguer.classList.toggle('open');
});

document.getElementById('last-modification').textContent = `Last modification: ${document.lastModified}`;