// Theme toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

//Hambuger menu
const hamburguer = document.querySelector('#hamburguer');
const nav = document.querySelector('nav');

hamburguer.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburguer.classList.toggle('open');
});

document.getElementById('last-modification').textContent = `Last modification: ${document.lastModified}`;