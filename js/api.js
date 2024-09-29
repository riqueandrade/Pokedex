import { API_BASE_URL, MAX_POKEMON } from './config.js';

export const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${pokemon}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        throw error;
    }
};

export const fetchPokemonList = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${MAX_POKEMON}`);
        if (!response.ok) throw new Error('Falha ao carregar lista de Pokémon');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar lista de Pokémon:', error);
        throw error;
    }
};

export const fetchPokemonSpecies = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar informações da espécie');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar informações da espécie:', error);
        throw error;
    }
};