import { elements } from './dom.js';
import { fetchPokemon, fetchPokemonList } from './api.js';
import { updatePokemonInfo, populatePokemonList } from './ui.js';

let currentPokemonId = 1;

const loadPokemon = async (pokemon) => {
    try {
        const data = await fetchPokemon(pokemon);
        currentPokemonId = data.id;
        updatePokemonInfo(data);
    } catch (error) {
        alert('Pokémon não encontrado. Verifique o nome ou número e tente novamente.');
    }
};

const searchPokemon = () => {
    const pokemon = elements.pokemonInput.value.toLowerCase();
    loadPokemon(pokemon);
};

const loadPokemonList = async () => {
    try {
        const data = await fetchPokemonList();
        populatePokemonList(data);
    } catch (error) {
        alert('Falha ao carregar a lista de Pokémon. Por favor, recarregue a página.');
    }
};

const setupEventListeners = () => {
    elements.searchButton.addEventListener('click', searchPokemon);
    elements.pokemonInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') searchPokemon();
    });
    elements.prevButton.addEventListener('click', () => loadPokemon(currentPokemonId - 1));
    elements.nextButton.addEventListener('click', () => loadPokemon(currentPokemonId + 1));
    elements.pokemonList.addEventListener('change', function () {
        loadPokemon(this.value);
    });
};

const init = async () => {
    setupEventListeners();
    await loadPokemonList();
    await loadPokemon(1);
};

init();