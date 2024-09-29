import { elements } from './dom.js';
import { translateAbility, translateType, typeColors, translateStat, setLanguage } from './translations.js';

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const updatePokemonInfo = (data) => {
    elements.pokemonImage.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    elements.pokemonName.textContent = capitalize(data.name);
    elements.pokemonNumber.textContent = `Número: ${data.id}`;
    
    // Atualizar tipos com cores e traduções
    elements.pokemonType.innerHTML = data.types.map(type => {
        const typeName = translateType(type.type.name);
        const color = typeColors[type.type.name];
        return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
    }).join(' ');
    
    elements.pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
    elements.pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
    elements.pokemonAbilities.textContent = `Habilidades: ${data.abilities.map(ability => 
        translateAbility(ability.ability.name)
    ).join(', ')}`;

    // Atualizar estatísticas com traduções
    const statsHtml = data.stats.map(stat => {
        const statName = translateStat(stat.stat.name);
        const statValue = stat.base_stat;
        const statPercentage = (statValue / 255) * 100;
        const barColor = getStatColor(statValue);
        return `<div class="stat-bar">
            <span class="stat-name">${statName}</span>
            <div class="progress-container">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${statPercentage}%; background-color: ${barColor};" aria-valuenow="${statValue}" aria-valuemin="0" aria-valuemax="255"></div>
                </div>
                <span class="stat-value">${statValue}</span>
            </div>
        </div>`;
    }).join('');
    elements.pokemonStats.innerHTML = statsHtml;

    // Atualizar movimentos sem traduções
    const movesHtml = data.moves.slice(0, 10).map(move => {
        const moveName = capitalize(move.move.name.replace('-', ' '));
        return `<span class="badge bg-secondary me-1 mb-1">${moveName}</span>`;
    }).join('');
    elements.pokemonMoves.innerHTML = movesHtml;

    elements.pokemonInfo.classList.remove('d-none');
};

const getStatColor = (value) => {
    if (value < 50) return '#ff7f7f';
    if (value < 100) return '#ffbf7f';
    if (value < 150) return '#ffff7f';
    if (value < 200) return '#bfff7f';
    return '#7fff7f';
};

export const populatePokemonList = (data) => {
    if (!data || !data.results || !Array.isArray(data.results)) {
        console.error('Invalid data format for populatePokemonList');
        return;
    }

    elements.pokemonList.innerHTML = '<option selected>Selecione um Pokémon</option>';

    data.results.forEach((pokemon, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${capitalize(pokemon.name)}`;
        elements.pokemonList.appendChild(option);
    });
};

export const setupDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Verificar preferência salva
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
    }
};

// Função para lazy loading de imagens
export const lazyLoadImage = (url, element) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        element.src = url;
    };
};

export const setupLanguageSelect = (loadPokemon) => {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (event) => {
        setLanguage(event.target.value);
        // Recarregar as informações do Pokémon atual com o novo idioma
        loadPokemon();
    });
};