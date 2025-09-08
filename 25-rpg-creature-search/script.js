const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureDisplay = document.getElementById('creature-display');
const loading = document.getElementById('loading');

const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const creatureSprite = document.getElementById('creature-sprite');

const API_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creature';

async function searchCreature() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert('Please enter a creature name or ID');
        return;
    }

    loading.style.display = 'block';
    creatureDisplay.classList.remove('show');

    try {
        const response = await fetch(`${API_URL}/${searchTerm}`);

        if (!response.ok) {
            throw new Error('Creature not found');
        }

        const creatureData = await response.json();
        displayCreature(creatureData);

    } catch (error) {
        alert('Creature not found');
        loading.style.display = 'none';
    }
}

function displayCreature(data) {
    loading.style.display = 'none';

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;

    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    types.innerHTML = '';
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('div');
        typeElement.textContent = typeInfo.name.toUpperCase();
        typeElement.className = 'type-badge';
        types.appendChild(typeElement);
    });

    const statsMap = {};
    data.stats.forEach(stat => {
        statsMap[stat.name] = stat.base_stat;
    });

    hp.textContent = statsMap['hp'] || '';
    attack.textContent = statsMap['attack'] || '';
    defense.textContent = statsMap['defense'] || '';
    specialAttack.textContent = statsMap['special-attack'] || '';
    specialDefense.textContent = statsMap['special-defense'] || '';
    speed.textContent = statsMap['speed'] || '';

    const imageSection = document.querySelector('.creature-image');
    if (imageSection) {
        imageSection.style.display = 'none';
    }

    creatureDisplay.classList.add('show');
}

searchButton.addEventListener('click', searchCreature);

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCreature();
    }
});

window.addEventListener('load', function () {
    searchInput.focus();
});