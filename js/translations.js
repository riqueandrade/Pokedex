const translations = {
    en: {
        abilities: {
            'blaze': 'Blaze',
            'chlorophyll': 'Chlorophyll',
            'compound-eyes': 'Compound Eyes',
            'guts': 'Guts',
            'hustle': 'Hustle',
            'intimidate': 'Intimidate',
            'keen-eye': 'Keen Eye',
            'overgrow': 'Overgrow',
            'poison-point': 'Poison Point',
            'rain-dish': 'Rain Dish',
            'rivalry': 'Rivalry',
            'run-away': 'Run Away',
            'sand-veil': 'Sand Veil',
            'shed-skin': 'Shed Skin',
            'sheer-force': 'Sheer Force',
            'shield-dust': 'Shield Dust',
            'sniper': 'Sniper',
            'solar-power': 'Solar Power',
            'static': 'Static',
            'swarm': 'Swarm',
            'tangled-feet': 'Tangled Feet',
            'tinted-lens': 'Tinted Lens',
            'torrent': 'Torrent'
        },
        types: {
            'bug': 'Bug',
            'dark': 'Dark',
            'dragon': 'Dragon',
            'electric': 'Electric',
            'fairy': 'Fairy',
            'fighting': 'Fighting',
            'fire': 'Fire',
            'flying': 'Flying',
            'ghost': 'Ghost',
            'grass': 'Grass',
            'ground': 'Ground',
            'ice': 'Ice',
            'normal': 'Normal',
            'poison': 'Poison',
            'psychic': 'Psychic',
            'rock': 'Rock',
            'steel': 'Steel',
            'water': 'Water'
        },
        stats: {
            'attack': 'Attack',
            'defense': 'Defense',
            'hp': 'HP',
            'special-attack': 'Sp. Atk',
            'special-defense': 'Sp. Def',
            'speed': 'Speed'
        }
    },
    es: {
        abilities: {
            'blaze': 'Mar Llamas',
            'chlorophyll': 'Clorofila',
            'compound-eyes': 'Ojo Compuesto',
            'guts': 'Agallas',
            'hustle': 'Entusiasmo',
            'intimidate': 'Intimidación',
            'keen-eye': 'Vista Lince',
            'overgrow': 'Espesura',
            'poison-point': 'Punto Tóxico',
            'rain-dish': 'Cura Lluvia',
            'rivalry': 'Rivalidad',
            'run-away': 'Fuga',
            'sand-veil': 'Velo Arena',
            'shed-skin': 'Mudar',
            'sheer-force': 'Potencia Bruta',
            'shield-dust': 'Polvo Escudo',
            'sniper': 'Francotirador',
            'solar-power': 'Poder Solar',
            'static': 'Electricidad Estática',
            'swarm': 'Enjambre',
            'tangled-feet': 'Tumbos',
            'tinted-lens': 'Cromolente',
            'torrent': 'Torrente'
        },
        types: {
            'bug': 'Bicho',
            'dark': 'Siniestro',
            'dragon': 'Dragón',
            'electric': 'Eléctrico',
            'fairy': 'Hada',
            'fighting': 'Lucha',
            'fire': 'Fuego',
            'flying': 'Volador',
            'ghost': 'Fantasma',
            'grass': 'Planta',
            'ground': 'Tierra',
            'ice': 'Hielo',
            'normal': 'Normal',
            'poison': 'Veneno',
            'psychic': 'Psíquico',
            'rock': 'Roca',
            'steel': 'Acero',
            'water': 'Agua'
        },
        stats: {
            'attack': 'Ataque',
            'defense': 'Defensa',
            'hp': 'PS',
            'special-attack': 'At. Esp.',
            'special-defense': 'Def. Esp.',
            'speed': 'Velocidad'
        }
    },
    pt: {
        abilities: {
            'blaze': 'Chama',
            'chlorophyll': 'Clorofila',
            'compound-eyes': 'Olhos Compostos',
            'guts': 'Coragem',
            'hustle': 'Agitação',
            'intimidate': 'Intimidação',
            'keen-eye': 'Olhar Aguçado',
            'overgrow': 'Supercrescimento',
            'poison-point': 'Ponto de Veneno',
            'rain-dish': 'Hidratação',
            'rivalry': 'Rivalidade',
            'run-away': 'Fuga',
            'sand-veil': 'Véu de Areia',
            'shed-skin': 'Troca de Pele',
            'sheer-force': 'Força Bruta',
            'shield-dust': 'Pó Escudo',
            'sniper': 'Atirador de Elite',
            'solar-power': 'Poder Solar',
            'static': 'Estática',
            'swarm': 'Enxame',
            'tangled-feet': 'Pés Emaranhados',
            'tinted-lens': 'Lentes Coloridas',
            'torrent': 'Torrente'
        },
        types: {
            'bug': 'Inseto',
            'dark': 'Sombrio',
            'dragon': 'Dragão',
            'electric': 'Elétrico',
            'fairy': 'Fada',
            'fighting': 'Lutador',
            'fire': 'Fogo',
            'flying': 'Voador',
            'ghost': 'Fantasma',
            'grass': 'Grama',
            'ground': 'Terra',
            'ice': 'Gelo',
            'normal': 'Normal',
            'poison': 'Veneno',
            'psychic': 'Psíquico',
            'rock': 'Pedra',
            'steel': 'Aço',
            'water': 'Água'
        },
        stats: {
            'attack': 'Ataque',
            'defense': 'Defesa',
            'hp': 'HP',
            'special-attack': 'Atq. Esp.',
            'special-defense': 'Def. Esp.',
            'speed': 'Velocidade'
        }
    }
};

let currentLanguage = 'en';

export const setLanguage = (lang) => {
    currentLanguage = lang;
};

export const translateAbility = (ability) => translations[currentLanguage].abilities[ability] || ability;
export const translateType = (type) => translations[currentLanguage].types[type] || type;
export const translateStat = (stat) => translations[currentLanguage].stats[stat] || stat;

export const typeColors = {
    'bug': '#A8B820',
    'dark': '#705848',
    'dragon': '#7038F8',
    'electric': '#F8D030',
    'fairy': '#EE99AC',
    'fighting': '#C03028',
    'fire': '#F08030',
    'flying': '#A890F0',
    'ghost': '#705898',
    'grass': '#78C850',
    'ground': '#E0C068',
    'ice': '#98D8D8',
    'normal': '#A8A878',
    'poison': '#A040A0',
    'psychic': '#F85888',
    'rock': '#B8A038',
    'steel': '#B8B8D0',
    'water': '#6890F0'
};