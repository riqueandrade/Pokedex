import { elements } from './dom.js';
import { fetchPokemon, fetchPokemonList, fetchPokemonSpecies } from './api.js';
import { updatePokemonInfo, populatePokemonList, setupDarkMode, setupTypeFilter, updateEvolutionChain, lazyLoadImage, setupLanguageSelect, filterPokemonByType } from './ui.js';

let currentPokemonId = 1;
let pokemonList = [];

const loadPokemon = async (pokemon) => {
    try {
        const data = await fetchPokemon(pokemon);
        currentPokemonId = data.id;
        updatePokemonInfo(data);
        lazyLoadImage(data.sprites.other['official-artwork'].front_default || data.sprites.front_default, elements.pokemonImage);
        
        const speciesData = await fetchPokemonSpecies(data.species.url);
        updateEvolutionChain(speciesData);
    } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
        alert('Pokémon não encontrado. Verifique o nome ou número e tente novamente.');
    }
};

const searchPokemon = () => {
    const pokemon = elements.pokemonInput.value.trim().toLowerCase();
    if (pokemon) {
        loadPokemon(pokemon);
    } else {
        alert('Por favor, insira um nome ou número de Pokémon válido.');
    }
};

const loadPokemonList = async () => {
    try {
        const data = await fetchPokemonList();
        pokemonList = await Promise.all(data.results.map(async (pokemon) => {
            const detailedData = await fetchPokemon(pokemon.name);
            return {
                ...pokemon,
                types: detailedData.types
            };
        }));
        populatePokemonList({ results: pokemonList });
    } catch (error) {
        console.error('Erro ao carregar lista de Pokémon:', error);
        alert('Falha ao carregar a lista de Pokémon. Por favor, recarregue a página.');
    }
};

const setupEventListeners = () => {
    elements.searchButton.addEventListener('click', searchPokemon);
    elements.pokemonInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') searchPokemon();
    });
    elements.prevButton.addEventListener('click', () => {
        if (currentPokemonId > 1) loadPokemon(currentPokemonId - 1);
    });
    elements.nextButton.addEventListener('click', () => loadPokemon(currentPokemonId + 1));
    elements.pokemonList.addEventListener('change', function () {
        if (this.value) loadPokemon(this.value);
    });
    if (elements.typeFilter) {
        elements.typeFilter.addEventListener('change', function() {
            const selectedType = this.value;
            const filteredPokemon = filterPokemonByType(pokemonList, selectedType);
            populatePokemonList({ results: filteredPokemon });
        });
    }
};

const init = async () => {
    try {
        setupEventListeners();
        setupDarkMode();
        setupLanguageSelect(() => loadPokemon(currentPokemonId));
        await loadPokemonList();
        if (pokemonList.length > 0) {
            const types = Array.from(new Set(pokemonList.flatMap(pokemon => pokemon.types.map(t => t.type.name))));
            setupTypeFilter(types);
        }
        await loadPokemon(1);
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
        alert('Ocorreu um erro ao inicializar a aplicação. Por favor, recarregue a página.');
    }
};

init();