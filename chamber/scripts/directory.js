// Theme toggle
const themteToggleBtn = document.querySelector('#theme-toggle');
const theme = localStorage.getItem('theme');

theme && document.body.classList.add(theme);

themteToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

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


//Data
async function fetchMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    return members;
}

function getMembershipIcon(level) {
    switch (level) {
        case 1:
            return 'images/bronze-medal-icon.png';
        case 2:
            return 'images/silver-medal-icon.png';
        case 3:
            return 'images/gold-medal-icon.png';
        default:
            return '';
    }
}

function displayGrid(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';
    container.classList.add('grid');
    container.classList.remove('list');

    members.forEach(member => {
        const memberCard = `
            <div class="member-card">
                <div class="image-container">
                    <img src="${member.image}" alt="${member.name} loading="lazy">
                </div>
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <div class="membership-level-container-grid">
                    <img src="${getMembershipIcon(member.membershipLevel)}" alt="Membership Icon" loading="lazy" class="membership-level">
                </div>
            </div>
        `;
        container.innerHTML += memberCard;
    });
}

function displayList(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';
    container.classList.add('list');
    container.classList.remove('grid');

    members.forEach(member => {
        const memberItem = `
            <div class="member-item">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <div class="membership-level-list">
                    <img src="${getMembershipIcon(member.membershipLevel)}" alt="Membership Icon" loading="lazy" class="membership-level">
                </div>
            </div>
        `;
        container.innerHTML += memberItem;
    });
}

document.getElementById('toggle-grid').addEventListener('click', async () => {
    const members = await fetchMembers();
    displayGrid(members);
});

document.getElementById('toggle-list').addEventListener('click', async () => {
    const members = await fetchMembers();
    displayList(members);
});

document.getElementById('toggle-grid').click();