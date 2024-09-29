import { elements } from './dom.js';
import { translateAbility, translateType, typeColors, translateStat } from './translations.js';

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const updatePokemonInfo = (data) => {
    elements.pokemonImage.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    elements.pokemonName.textContent = capitalize(data.name);
    elements.pokemonNumber.textContent = `Número: ${data.id}`;
    
    // Atualizar tipos com cores
    elements.pokemonType.innerHTML = data.types.map(type => {
        const typeName = translateType(type.type.name);
        const color = typeColors[type.type.name];
        return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
    }).join(' ');
    
    elements.pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
    elements.pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
    elements.pokemonAbilities.textContent = `Habilidades: ${data.abilities.map(ability => 
        translateAbility(ability.ability.name) || capitalize(ability.ability.name.replace('-', ' '))
    ).join(', ')}`;

    // Adicionar estatísticas base
    const statsHtml = data.stats.map(stat => {
        const statName = translateStat(stat.stat.name);
        const statValue = stat.base_stat;
        return `<div class="stat-bar">
            <span class="stat-name">${statName}</span>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${statValue}%" aria-valuenow="${statValue}" aria-valuemin="0" aria-valuemax="255">${statValue}</div>
            </div>
        </div>`;
    }).join('');
    elements.pokemonStats.innerHTML = `<h6>Estatísticas Base:</h6>${statsHtml}`;

    elements.pokemonInfo.classList.remove('d-none');
};

export const populatePokemonList = (data) => {
    data.results.forEach((pokemon, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${capitalize(pokemon.name)}`;
        elements.pokemonList.appendChild(option);
    });
};