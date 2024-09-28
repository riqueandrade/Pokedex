const pokemonInput = document.getElementById('pokemonInput');
const searchButton = document.getElementById('searchButton');
const pokemonInfo = document.getElementById('pokemonInfo');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonType = document.getElementById('pokemonType');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonAbilities = document.getElementById('pokemonAbilities');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pokemonList = document.getElementById('pokemonList');

let currentPokemonId = 1;

searchButton.addEventListener('click', searchPokemon);
pokemonInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

prevButton.addEventListener('click', () => loadPokemon(currentPokemonId - 1));
nextButton.addEventListener('click', () => loadPokemon(currentPokemonId + 1));

pokemonList.addEventListener('change', function() {
    loadPokemon(this.value);
});

function searchPokemon() {
    const pokemon = pokemonInput.value.toLowerCase();
    loadPokemon(pokemon);
}

function loadPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            currentPokemonId = data.id;
            updatePokemonInfo(data);
            pokemonInfo.classList.remove('d-none');
        })
        .catch(error => {
            alert('Pokémon não encontrado. Verifique o nome ou número e tente novamente.');
            console.error('Erro:', error);
        });
}

function updatePokemonInfo(data) {
    pokemonImage.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonNumber.textContent = `Número: ${data.id}`;
    pokemonType.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
    pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
    pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
    pokemonAbilities.textContent = `Habilidades: ${data.abilities.map(ability => ability.ability.name).join(', ')}`;
}

function loadPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            data.results.forEach((pokemon, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = `${index + 1}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
                pokemonList.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar lista de Pokémon:', error));
}

loadPokemonList();
loadPokemon(1);